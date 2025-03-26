import { readFileSync } from "node:fs";
import { accessibilityModifiers, inheritance } from "./tokens";
import { TokenizedLine, tokenizeLine } from "./tokenizedLine";

export const stripFileFromPath = (filePath: string): TokenizedLine[] => {
    const rawFile: string = readFileSync(filePath, 'utf8');

    return stripFile(rawFile);
};

const stripFile = (rawFile: string): TokenizedLine[] => {
    const separatedFile: string[] = rawFile.split('\n');

    return stripFileLines(separatedFile);
};

const stripFileLines = (lines: string[]): TokenizedLine[] => {
    const trimmedLines: string[] = lines
        .filter(line => line !== "")
        .map(line => line.trim());
    const uncommentedLines: string[] = removeComments(trimmedLines);
    const reconnectedLines: string[] = connectLines(uncommentedLines, [/{/, /}/, /;/]);
    const tokenizedLines: TokenizedLine[] = reconnectedLines.map((line, index) => tokenizeLine(line, index));

    const strippedFile: TokenizedLine[] = removeNonClassContent(tokenizedLines);

    return strippedFile;
};

const removeComments = (lines: string[]): string[] => {
    const removeComments: string[] = lines
        .reduce((uncommenter: { unCommentedLines: string[], inComment: boolean },
            line: string): { unCommentedLines: string[], inComment: boolean } =>
        {
            const uncommentedLine: { uncommentedLine: string, inComment: boolean } =
                uncommentLine(line, uncommenter.inComment);

            if (uncommentedLine.uncommentedLine === "")
            {
                return { unCommentedLines: uncommenter.unCommentedLines, inComment: uncommentedLine.inComment };
            }

            return {
                unCommentedLines: uncommenter.unCommentedLines.concat([uncommentedLine.uncommentedLine]),
                inComment: uncommentedLine.inComment
            }
        }, { unCommentedLines: [], inComment: false })
        .unCommentedLines;

    return removeComments;
}

const uncommentLine = (line: string, inComment: boolean): { uncommentedLine: string, inComment: boolean } => {
    if (inComment)
    {
        const uncommentLocation = line.indexOf("*/");

        if (uncommentLocation === -1)
        {
            return { uncommentedLine: "", inComment: true };
        }

        return uncommentLine(line.slice(uncommentLocation + 2), false);
    }

    const sectionCommentLocation: number = line.indexOf("/*");

    if (sectionCommentLocation !== -1)
    {
        const uncommentedLine = uncommentLine(line.slice(sectionCommentLocation), true)
        return {
            uncommentedLine: line.slice(0, sectionCommentLocation) + uncommentedLine.uncommentedLine,
            inComment: uncommentedLine.inComment
        }
    }

    const doubleLineLocation: number = line.indexOf("//");

    if (doubleLineLocation !== -1)
    {
        return { uncommentedLine: line.slice(0, doubleLineLocation), inComment: false };
    }

    return { uncommentedLine: line, inComment: false };
}

const removeNonClassContent = (lines: TokenizedLine[]): TokenizedLine[] => {
    const strippedLines: TokenizedLine[] = lines
        .reduce((fileContent: { strippedLines: TokenizedLine[], nestedDepth: number },
            line: TokenizedLine): { strippedLines: TokenizedLine[], nestedDepth: number } => {
                const strippedLines = fileContent.nestedDepth === 0
                    ? fileContent.strippedLines.concat([line])
                    : fileContent.strippedLines;

                const depth: number = line.tokens.some(token => token === "class")
                    ? fileContent.nestedDepth
                    : line.tokens.reduce((depth, token): number => {
                        const openBrackets: string[] | null = token.match(/{/g);
                        const openBracketsCount = openBrackets === null ? 0 : openBrackets.length;

                        const closedBrackets: string[] | null = token.match(/}/g);
                        const closedBracketsCount = closedBrackets === null ? 0 : closedBrackets.length;

                        return depth + openBracketsCount - closedBracketsCount
                    }, 0) + fileContent.nestedDepth;

                return { strippedLines: strippedLines, nestedDepth: Math.max(depth, 0) };
            },
        { strippedLines: [], nestedDepth: 0 })
        .strippedLines;

    return strippedLines;
};

export const connectLines = (lines: string[], endings: RegExp[]): string[] => {
    const connectedLines: string[] = lines.reduce((connectedLines, line) => {
        const lastIndex = connectedLines.length - 1;
        if (connectedLines.length == 0 || endings.some(ending => ending.test(connectedLines[lastIndex])))
        {
            connectedLines.push(line);
        }
        else
        {
            connectedLines[lastIndex] = connectedLines[lastIndex] + " " + line;
        }

        return connectedLines;
    }, [] as string[])

    return connectedLines;
};

/*
 * intake file
 * convert to text
 * regex
 * return result
 */
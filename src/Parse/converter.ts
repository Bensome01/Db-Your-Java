import { readFileSync } from "node:fs";

export const stripFileLines = (lines: string[], whiteList: RegExp[]): string[] => {
    return lines.filter(line => whiteList.some(regex => regex.test(line)));
};

export const stripFile = (rawFile: string, whiteList: RegExp[]): string[] => {
    const separatedFile: string[] = rawFile.split('\n');

    return stripFileLines(separatedFile, whiteList);
};

export const stripFileFromPath = (filePath: string, whiteList: RegExp[]): string[] => {
    const rawFile: string = readFileSync(filePath, 'utf8');

    return stripFile(rawFile, whiteList);
};

export const connectLines = (lines: string[], endings: RegExp[]): string[] => {
    const connectedLines = lines.reduce((connectedLines, line) => {
        const lastIndex = connectedLines.length - 1;
        if (connectedLines.length == 0 || endings.some(test => test.test(connectedLines[lastIndex])))
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectLines = exports.stripFileFromPath = void 0;
const node_fs_1 = require("node:fs");
const tokenizedLine_1 = require("./tokenizedLine");
const stripFileFromPath = (filePath) => {
    const rawFile = (0, node_fs_1.readFileSync)(filePath, 'utf8');
    return stripFile(rawFile);
};
exports.stripFileFromPath = stripFileFromPath;
const stripFile = (rawFile) => {
    const separatedFile = rawFile.split('\n');
    return stripFileLines(separatedFile);
};
const stripFileLines = (lines) => {
    const trimmedLines = lines.filter(line => line !== "");
    const uncommentedLines = removeComments(trimmedLines);
    const reconnectedLines = (0, exports.connectLines)(uncommentedLines, [/{/, /}/, /;/]);
    const tokenizedLines = reconnectedLines.map((line, index) => (0, tokenizedLine_1.tokenizeLine)(line, index));
    const strippedFile = removeNonClassContent(tokenizedLines);
    return strippedFile;
};
const removeComments = (lines) => {
    const removeComments = lines
        .reduce((uncommenter, line) => {
        const uncommentedLine = uncommentLine(line, uncommenter.inComment);
        if (uncommentedLine.uncommentedLine === "") {
            return { unCommentedLines: uncommenter.unCommentedLines, inComment: uncommentedLine.inComment };
        }
        return {
            unCommentedLines: uncommenter.unCommentedLines.concat([uncommentedLine.uncommentedLine]),
            inComment: uncommentedLine.inComment
        };
    }, { unCommentedLines: [], inComment: false })
        .unCommentedLines;
    return removeComments;
};
const uncommentLine = (line, inComment) => {
    if (inComment) {
        const uncommentLocation = line.indexOf("*/");
        if (uncommentLocation === -1) {
            return { uncommentedLine: "", inComment: true };
        }
        return uncommentLine(line.slice(uncommentLocation + 2), false);
    }
    const sectionCommentLocation = line.indexOf("/*");
    if (sectionCommentLocation !== -1) {
        const uncommentedLine = uncommentLine(line.slice(sectionCommentLocation), true);
        return {
            uncommentedLine: line.slice(0, sectionCommentLocation) + uncommentedLine.uncommentedLine,
            inComment: uncommentedLine.inComment
        };
    }
    const doubleLineLocation = line.indexOf("//");
    if (doubleLineLocation !== -1) {
        return { uncommentedLine: line.slice(0, doubleLineLocation), inComment: false };
    }
    return { uncommentedLine: line, inComment: false };
};
const removeNonClassContent = (lines) => {
    const strippedLines = lines
        .reduce((fileContent, line) => {
        const strippedLines = fileContent.nestedDepth === 0
            ? fileContent.strippedLines.concat([line])
            : fileContent.strippedLines;
        const depth = line.tokens.some(token => token === "class")
            ? 0
            : line.tokens.reduce((depth, token) => {
                const openBrackets = token.match(/{/);
                const openBracketsCount = openBrackets === null ? 0 : openBrackets.length;
                const closedBrackets = token.match(/}/);
                const closedBracketsCount = closedBrackets === null ? 0 : closedBrackets.length;
                return depth + openBracketsCount - closedBracketsCount;
            }, 0);
        return { strippedLines: strippedLines, nestedDepth: fileContent.nestedDepth + depth };
    }, { strippedLines: [], nestedDepth: 0 })
        .strippedLines;
    return strippedLines;
};
const connectLines = (lines, endings) => {
    const connectedLines = lines.reduce((connectedLines, line) => {
        const lastIndex = connectedLines.length - 1;
        if (connectedLines.length == 0 || endings.some(test => test.test(connectedLines[lastIndex]))) {
            connectedLines.push(line);
        }
        else {
            connectedLines[lastIndex] = connectedLines[lastIndex] + " " + line;
        }
        return connectedLines;
    }, []);
    return connectedLines;
};
exports.connectLines = connectLines;
/*
 * intake file
 * convert to text
 * regex
 * return result
 */ 

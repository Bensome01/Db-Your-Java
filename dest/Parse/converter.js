"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectLines = exports.stripFileFromPath = exports.stripFile = exports.stripFileLines = void 0;
const node_fs_1 = require("node:fs");
const utils_1 = require("./utils");
const stripFileLines = (lines, whiteList) => {
    return lines.filter(line => whiteList.some(regex => regex.test(line)));
};
exports.stripFileLines = stripFileLines;
const stripFile = (rawFile, whiteList) => {
    const separatedFile = rawFile.split('\n');
    return (0, exports.stripFileLines)(separatedFile, whiteList);
};
exports.stripFile = stripFile;
const stripFileFromPath = (filePath, whiteList) => {
    const rawFile = (0, node_fs_1.readFileSync)(filePath, 'utf8');
    return (0, exports.stripFile)(rawFile, whiteList);
};
exports.stripFileFromPath = stripFileFromPath;
const connectLines = (lines, endings) => {
    const connectedLines = lines.reduce((connectedLines, line) => {
        const lastIndex = connectedLines.length - 1;
        if (connectedLines.length == 0 || (0, utils_1.stringHas)(connectedLines[lastIndex], endings)) {
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

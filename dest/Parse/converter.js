"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripFile = StripFile;
const node_fs_1 = require("node:fs");
function StripFile(filePath, whiteList) {
    const rawFile = (0, node_fs_1.readFileSync)(filePath, 'utf8');
    const lines = rawFile
        .split('\n')
        .filter((line) => whiteList.some(regExp => regExp.test(line)));
    return lines;
}
/*
 * intake file
 * convert to text
 * regex
 * return result
 */ 

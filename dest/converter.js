"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertFile = ConvertFile;
const node_fs_1 = require("node:fs");
const whiteList = [
    /.*public .*/,
    /.*private .*/,
    /.*protected .*/,
    /.*extends .*/,
    /.*implements .*/,
    /.*import .*/,
    /.*@Override .*/
];
function ConvertFile(filePath) {
    const rawFile = (0, node_fs_1.readFileSync)(filePath, 'utf8');
    return StripFile(rawFile, whiteList);
}
function StripFile(file, whiteList) {
    console.log(file);
    const lines = file
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

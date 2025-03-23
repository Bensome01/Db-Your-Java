"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converter_1 = require("./Parse/converter");
const filePath_1 = require("./filePath");
const tokens_1 = require("./Parse/tokens");
//Find All Files
const filePath = './src/hidden/';
const allFilePaths = (0, filePath_1.findAllFilePaths)(filePath);
//map the file paths to the stripped contents
const whiteList = tokens_1.accessibilityModifiers.concat([/{/, /import/]);
const processedFiles = allFilePaths
    .map(filePath => (0, converter_1.stripFile)(filePath, whiteList))
    .map(file => (0, converter_1.connectLines)(file, [/{/, /;/]));
//create FileTree of inheritance
// const classLines: string[] = processedFiles.flatMap(file => )
//breadth-first the tree to store the data in the database

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converter_1 = require("./converter");
const filePath_1 = require("./filePath");
//Find All Files
const filePath = './src/hidden/';
const allFilePaths = (0, filePath_1.FindAllFilePaths)(filePath);
//map the file paths to the stripped contents
const processedFiles = allFilePaths.map(filePath => (0, converter_1.ConvertFile)(filePath));
console.log(processedFiles);
//create FileTree of inheritance
//breadth-first the tree to store the data in the database

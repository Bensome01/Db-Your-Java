"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filePath_1 = require("./filePath");
const JavaFile_1 = require("./javaFile/JavaFile");
//Find All Files
const filePath = "./src/hidden/";
const allFilePaths = (0, filePath_1.findAllFilePaths)(filePath);
//map the file paths to the stripped contents
const allFiles = allFilePaths.map((filePath) => (0, JavaFile_1.makeJavaFile)(filePath));
//create FileTree of inheritance
// const classLines: string[] = processedFiles.flatMap(file => )
//breadth-first the tree to store the data in the database

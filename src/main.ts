import { findAllFilePaths } from "./filePath";
import { JavaFile, makeJavaFile } from "./javaFile/JavaFile";

//Find All Files
const filePath = "./src/hidden/";
const allFilePaths = findAllFilePaths(filePath);

//map the file paths to the stripped contents
const allFiles = allFilePaths.map((filePath) => makeJavaFile(filePath));

//create FileTree of inheritance
// const classLines = processedFiles.flatMap(file => )

//breadth-first the tree to store the data in the database

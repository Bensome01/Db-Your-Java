import { findAllFilePaths } from "./filePath";
import { JavaFile, makeJavaFile, } from "./javaFile/JavaFile";

//Find All Files
const filePath: string = './src/hidden/';
const allFilePaths: string[] = findAllFilePaths(filePath);

//map the file paths to the stripped contents
const allFiles: JavaFile[] = allFilePaths.map(filePath => makeJavaFile(filePath));

//create FileTree of inheritance
// const classLines: string[] = processedFiles.flatMap(file => )

//breadth-first the tree to store the data in the database

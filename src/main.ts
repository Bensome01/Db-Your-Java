import { stripFile, connectLines } from "./Parse/converter";
import { findAllFilePaths } from "./filePath";
import { accessibilityModifiers } from "./Parse/tokens";
import { JavaFile, makeJavaFile } from "./javaFile/JavaFile";

//Find All Files
const filePath: string = './src/hidden/';
const allFilePaths: string[] = findAllFilePaths(filePath);

//map the file paths to the stripped contents
const allFiles: JavaFile[] = allFilePaths.map(filePath => makeJavaFile(filePath));

console.log(allFiles);

//create FileTree of inheritance
// const classLines: string[] = processedFiles.flatMap(file => )

//breadth-first the tree to store the data in the database

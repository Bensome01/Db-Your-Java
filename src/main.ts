import { stripFile, connectLines } from "./Parse/converter";
import { findAllFilePaths } from "./filePath";
import { accessibilityModifiers } from "./Parse/tokens";

//Find All Files
const filePath: string = './src/hidden/';
const allFilePaths: string[] = findAllFilePaths(filePath);

//map the file paths to the stripped contents
const whiteList: RegExp[] = accessibilityModifiers.concat([/{/, /import/]);
const processedFiles: string[][] = allFilePaths
    .map(filePath => stripFile(filePath, whiteList))
    .map(file => connectLines(file, [/{/, /;/]));

//create FileTree of inheritance
// const classLines: string[] = processedFiles.flatMap(file => )

//breadth-first the tree to store the data in the database

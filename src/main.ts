import { StripFile } from "./Parse/converter";
import { FindAllFilePaths } from "./filePath";
import { Tokens } from "./Parse/tokens";

//Find All Files
const filePath: string = './src/hidden/';
const allFilePaths: string[] = FindAllFilePaths(filePath);

//map the file paths to the stripped contents
const whiteList: RegExp[] = Tokens.accessibilityModifiers;
const processedFiles = allFilePaths.map(filePath => StripFile(filePath, whiteList));

//create FileTree of inheritance

//breadth-first the tree to store the data in the database

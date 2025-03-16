import fs from "node:fs";
import { readdirSync } from "node:fs";
import { ConvertFile } from "./converter";
import { FileTree } from "./fileTree";
import { FindAllFilePaths } from "./filePath";

//Find All Files
const filePath: string = './src/hidden/';
const allFilePaths: string[] = FindAllFilePaths(filePath);

//map the file paths to the stripped contents
const processedFiles = allFilePaths.map(filePath => ConvertFile(filePath));

//create FileTree of inheritance

//breadth-first the tree to store the data in the database


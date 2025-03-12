import fs from "node:fs";
import { readdirSync } from "node:fs";

//Find All Files
const allFiles: string[] = readdirSync('./src/hidden/', { withFileTypes: true, recursive: true })
    .filter(file => !file.isDirectory())
    .map(file => file.name);

//foreach file convert and store in data base


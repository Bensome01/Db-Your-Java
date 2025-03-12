"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const allFiles = (0, node_fs_1.readdirSync)('./src/hidden/', { withFileTypes: true, recursive: true })
    .filter(file => !file.isDirectory())
    .map(file => file.name);
allFiles.forEach(file => console.log(file));
//Find all files
//foreach file convert and store in data base

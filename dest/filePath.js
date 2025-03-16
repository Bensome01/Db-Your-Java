"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllFilePaths = FindAllFilePaths;
const node_fs_1 = require("node:fs");
function FindAllFilePaths(filePath) {
    const folderContents = (0, node_fs_1.readdirSync)(filePath, { withFileTypes: true });
    const filePaths = folderContents.flatMap(content => {
        if (content.isDirectory()) {
            return FindAllFilePaths(filePath + content.name + "/");
        }
        return filePath + content.name;
    });
    return filePaths;
}

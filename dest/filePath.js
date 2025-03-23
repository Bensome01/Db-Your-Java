"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllFilePaths = void 0;
const node_fs_1 = require("node:fs");
const findAllFilePaths = (filePath) => {
    const folderContents = (0, node_fs_1.readdirSync)(filePath, { withFileTypes: true });
    const filePaths = folderContents.flatMap(content => {
        if (content.isDirectory()) {
            return (0, exports.findAllFilePaths)(filePath + content.name + "/");
        }
        return filePath + content.name;
    });
    return filePaths;
};
exports.findAllFilePaths = findAllFilePaths;

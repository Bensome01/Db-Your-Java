"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullyQualifiedName = exports.makeJavaFile = void 0;
const converter_1 = require("../Parse/converter");
const tokens_1 = require("../Parse/tokens");
const JavaSchema_1 = require("./JavaSchema");
const findFileName = (filePath) => {
    const components = filePath.split('/');
    return components.at(-1).slice(0, -5);
};
const makeJavaFile = (filePath) => {
    const whiteList = tokens_1.accessibilityModifiers
        .concat(tokens_1.inheritance)
        .concat([/import/, /package/, /{/, /}/]);
    const strippedFile = (0, converter_1.stripFileFromPath)(filePath, whiteList);
    const connectedFile = (0, converter_1.connectLines)(strippedFile, [/{/, /;/]);
    return {
        fileName: findFileName(filePath),
        package: connectedFile
            .find(line => /package/.test(line))
            .slice(0, -1)
            .split(' ')
            .at(-1),
        imports: connectedFile.filter(line => /import/.test(line))
            .map(line => line.slice(0, -1)),
        fileClass: (0, JavaSchema_1.makeJavaSchema)(connectedFile)
    };
};
exports.makeJavaFile = makeJavaFile;
const getFullyQualifiedName = (file) => {
    return file.package + "." + file.fileName;
};
exports.getFullyQualifiedName = getFullyQualifiedName;

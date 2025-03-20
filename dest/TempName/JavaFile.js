"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullyQualifiedName = exports.makeJavaFile = void 0;
const converter_1 = require("../Parse/converter");
const tokens_1 = require("../Parse/tokens");
const JavaClass_1 = require("./JavaClass");
const findFileName = (filePath) => {
    const components = filePath.split('/');
    return components.at(-1).slice(-5);
};
const makeJavaFile = (filePath) => {
    const whiteList = tokens_1.accessibilityModifiers
        .concat(tokens_1.annotations)
        .concat(tokens_1.inheritance)
        .concat([/import/, /package/, /{/, /}/]);
    const strippedFile = (0, converter_1.stripFileFromPath)(filePath, whiteList);
    return {
        package: (0, converter_1.stripFileLines)(strippedFile, [/package/]),
        imports: strippedFile.filter(line => /import/.test(line)),
        fileName: findFileName(filePath),
        fileClass: (0, JavaClass_1.makeJavaClass)(strippedFile)
    };
};
exports.makeJavaFile = makeJavaFile;
const getFullyQualifiedName = (file) => {
    return file.package + file.fileName;
};
exports.getFullyQualifiedName = getFullyQualifiedName;
const contentBounds = (start, file) => {
    return file.reduce((end, line) => {
        if (line[0] <= end) {
            return end;
        }
        if (/{/.test(line[1])) {
            return contentBounds(line[0] + 1, file);
        }
        if (/}/.test(line[1])) {
            return line[1];
        }
        return end;
    }, start);
};
const findClassBounds = (file) => {
    const classDeclarationIndex = file.findIndex(line => /class/.test(line));
    const endBracket = contentBounds(classDeclarationIndex, Array.from(file.entries()));
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJavaFields = exports.makeJavaField = void 0;
const tokens_1 = require("../Parse/tokens");
const makeJavaField = (tokens) => {
    const indexOfAnnotationEnd = tokens
        .findIndex(token => tokens_1.annotations
        .some(annotation => token === annotation.source));
    const annotationsEnd = indexOfAnnotationEnd === -1 ? 0 : indexOfAnnotationEnd;
    const fieldAnnotations = tokens.slice(0, annotationsEnd);
    const equalSignLocation = tokens.findIndex(token => token === "=");
    const declarationEnd = equalSignLocation === -1 ? tokens.length : equalSignLocation;
    return {
        annotations: fieldAnnotations,
        keywords: tokens.slice(annotationsEnd, declarationEnd - 2),
        fieldType: tokens.at(declarationEnd - 2),
        fieldName: tokens.at(declarationEnd - 1),
        fieldValue: equalSignLocation === -1 ? "" : tokens.at(equalSignLocation + 1)
    };
};
exports.makeJavaField = makeJavaField;
const findJavaFields = (file) => {
    return file.filter(line => !line.tokens.some(token => /\(/.test(token)));
};
exports.findJavaFields = findJavaFields;

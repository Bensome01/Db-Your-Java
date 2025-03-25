"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJavaFields = exports.makeJavaField = void 0;
const common_1 = require("./common");
const makeJavaField = (tokens) => {
    const { annotations, annotationEnd } = (0, common_1.findAnnotations)(tokens);
    const equalSignLocation = tokens.findIndex(token => token === "=");
    const declarationEnd = equalSignLocation === -1 ? tokens.length : equalSignLocation;
    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, declarationEnd - 2),
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

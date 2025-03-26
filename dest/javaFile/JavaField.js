"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJavaFields = exports.makeJavaField = void 0;
const common_1 = require("./common");
const makeJavaField = (tokens) => {
    const trimmedSemiColon = tokens.with(-1, tokens.at(-1).slice(0, -1));
    const { annotations, annotationEnd } = (0, common_1.findAnnotations)(trimmedSemiColon);
    const equalSignLocation = trimmedSemiColon.findIndex(token => token === "=");
    const declarationEnd = equalSignLocation === -1 ? trimmedSemiColon.length : equalSignLocation;
    return {
        annotations: annotations,
        keywords: trimmedSemiColon.slice(annotationEnd, declarationEnd - 2),
        fieldType: trimmedSemiColon.at(declarationEnd - 2),
        fieldName: trimmedSemiColon.at(declarationEnd - 1),
        fieldValue: equalSignLocation === -1 ? "" : trimmedSemiColon.slice(equalSignLocation + 1).join(" ").slice()
    };
};
exports.makeJavaField = makeJavaField;
const findJavaFields = (file) => {
    return file.filter(line => !line.tokens.some(token => /\(/.test(token)) || line.tokens.some(token => token === "="));
};
exports.findJavaFields = findJavaFields;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printjavaField = exports.findJavaFields = exports.makeJavaField = void 0;
const utils_1 = require("../utils");
const common_1 = require("./common");
const makeJavaField = (tokens) => {
    const trimmedSemiColon = tokens.with(-1, (0, utils_1.index)(tokens, -1).slice(0, -1));
    const { annotations, annotationEnd } = (0, common_1.findAnnotations)(trimmedSemiColon);
    const equalSignLocation = trimmedSemiColon.findIndex((token) => token === "=");
    const declarationEnd = equalSignLocation === -1 ? trimmedSemiColon.length : equalSignLocation;
    return {
        annotations: annotations,
        keywords: trimmedSemiColon.slice(annotationEnd, declarationEnd - 2),
        fieldType: (0, utils_1.index)(trimmedSemiColon, declarationEnd - 2),
        fieldName: (0, utils_1.index)(trimmedSemiColon, declarationEnd - 1),
        fieldValue: equalSignLocation === -1
            ? ""
            : trimmedSemiColon
                .slice(equalSignLocation + 1)
                .join(" ")
                .slice(),
    };
};
exports.makeJavaField = makeJavaField;
const findJavaFields = (file) => {
    return file.filter((line) => !line.tokens.some((token) => /\(/.test(token)) ||
        line.tokens.some((token) => token === "="));
};
exports.findJavaFields = findJavaFields;
const printjavaField = (field) => {
    console.log("annotations: ", field.annotations);
    console.log("keywords: ", field.keywords);
    console.log("field type: ", field.fieldType);
    console.log("field name: ", field.fieldName);
    console.log("field value: ", field.fieldValue);
};
exports.printjavaField = printjavaField;

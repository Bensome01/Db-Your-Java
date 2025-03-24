"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJavaFields = exports.makeJavaField = void 0;
const makeJavaField = (tokens) => {
    const mutableTokens = [];
    tokens.forEach(token => mutableTokens.push(token));
    const fieldName = mutableTokens.pop();
    const fieldType = mutableTokens.pop();
    return { fieldName: fieldName, fieldType: fieldType, keywords: mutableTokens };
};
exports.makeJavaField = makeJavaField;
const findJavaFields = (file) => {
    return file.filter(line => !line.tokens.some(token => /\(/.test(token)));
};
exports.findJavaFields = findJavaFields;

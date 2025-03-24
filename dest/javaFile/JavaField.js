"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJavaFields = exports.makeJavaField = void 0;
const makeJavaField = (tokens) => {
    return {};
};
exports.makeJavaField = makeJavaField;
const findJavaFields = (file) => {
    return file.filter(line => !line.tokens.some(token => /\(/.test(token)));
};
exports.findJavaFields = findJavaFields;

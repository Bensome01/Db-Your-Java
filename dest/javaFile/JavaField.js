"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJavaFields = exports.makeJavaField = void 0;
const makeJavaField = (tokens) => {
    return {};
};
exports.makeJavaField = makeJavaField;
const findJavaFields = (file) => {
    const excludeEqualsSign = file.map(line => {
        const equalIndex = line.tokens.findIndex(token => token === "=");
        if (equalIndex != -1) {
            return { tokens: line.tokens.slice(0, equalIndex), index: line.index };
        }
        return line;
    });
    return excludeEqualsSign.filter(line => !line.tokens.some(token => /\(/.test(token)));
};
exports.findJavaFields = findJavaFields;

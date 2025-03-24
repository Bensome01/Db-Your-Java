"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConstructors = exports.makeJavaConstructor = void 0;
const makeJavaConstructor = (tokens) => {
    const mutableTokens = [];
    tokens.forEach(token => mutableTokens.push(token));
    const parameters = mutableTokens.pop()
        .split(/\(|,|\)/)
        .filter(param => param !== "");
    const constructorName = mutableTokens.pop();
    return { keywords: mutableTokens, parameters: parameters };
};
exports.makeJavaConstructor = makeJavaConstructor;
const findConstructors = (file, className) => {
    return file.filter(line => line.tokens.some(token => token === className));
};
exports.findConstructors = findConstructors;

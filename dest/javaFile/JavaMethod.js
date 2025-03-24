"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separateMethodFromParameter = exports.makeJavaMethod = void 0;
const makeJavaMethod = (tokens) => {
    const mutableTokens = [];
    tokens.forEach(token => mutableTokens.push(token));
    const parameters = mutableTokens.pop()
        .split(/\(|,|\)/)
        .filter(param => param !== "");
    const methodName = mutableTokens.pop();
    const returnType = mutableTokens.pop();
    return {
        keywords: mutableTokens,
        returnType: returnType,
        methodName: methodName,
        parameters: parameters
    };
};
exports.makeJavaMethod = makeJavaMethod;
const separateMethodFromParameter = (line) => {
    const methodNameLocation = line.tokens.findIndex(token => /\(/.test(token));
    if (methodNameLocation === -1) {
        return line;
    }
    const targetToken = line.tokens.at(methodNameLocation);
    const separateLocation = targetToken.indexOf("(");
    const separatedTokens = [targetToken.slice(0, separateLocation), targetToken.slice(separateLocation)];
    return { tokens: line.tokens.toSpliced(methodNameLocation, 0, ...separatedTokens), index: line.index };
};
exports.separateMethodFromParameter = separateMethodFromParameter;

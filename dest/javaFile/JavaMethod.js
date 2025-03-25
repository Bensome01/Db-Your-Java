"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separateMethodFromParameter = exports.makeJavaMethod = void 0;
const common_1 = require("./common");
const makeJavaMethod = (tokens) => {
    const { annotations, annotationEnd } = (0, common_1.findAnnotations)(tokens);
    const parameters = tokens.at(-2)
        .split(/\(|, |\)/)
        .filter(param => param !== "");
    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, -4),
        returnType: tokens.at(-4),
        methodName: tokens.at(-3),
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
    return { tokens: line.tokens.toSpliced(methodNameLocation, 1, ...separatedTokens), index: line.index };
};
exports.separateMethodFromParameter = separateMethodFromParameter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separateMethodFromParameter = exports.findAnnotations = void 0;
const tokens_1 = require("../Parse/tokens");
const findAnnotations = (tokens) => {
    const annotationEnd = tokens
        .findIndex(token => !tokens_1.genericAnnotation
        .some(annotation => annotation.test(token)));
    const annotations = tokens.slice(0, annotationEnd);
    return {
        annotations: annotations,
        annotationEnd: annotationEnd
    };
};
exports.findAnnotations = findAnnotations;
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

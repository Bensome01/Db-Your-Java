"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineParameters = exports.separateMethodFromParameter = exports.findAnnotations = void 0;
const tokens_1 = require("../Parse/tokens");
const utils_1 = require("../utils");
const findAnnotations = (tokens) => {
    const annotationEnd = tokens.findIndex((token) => !tokens_1.genericAnnotation.some((annotation) => annotation.test(token)));
    const annotations = tokens.slice(0, annotationEnd);
    return {
        annotations: annotations,
        annotationEnd: annotationEnd,
    };
};
exports.findAnnotations = findAnnotations;
const separateMethodFromParameter = (line) => {
    const methodNameLocation = line.tokens.findIndex((token) => /\(/.test(token));
    if (methodNameLocation === -1) {
        return line;
    }
    const targetToken = (0, utils_1.index)(line.tokens, methodNameLocation);
    const separateLocation = targetToken.indexOf("(");
    const separatedTokens = [
        targetToken.slice(0, separateLocation),
        targetToken.slice(separateLocation),
    ];
    return {
        tokens: line.tokens.toSpliced(methodNameLocation, 1, ...separatedTokens),
        index: line.index,
    };
};
exports.separateMethodFromParameter = separateMethodFromParameter;
const determineParameters = (parameters) => {
    const removedParenthesis = parameters.slice(1, -1);
    if (removedParenthesis === "") {
        return [];
    }
    const splitParameters = removedParenthesis.split(/, | /);
    const reconnectedTypes = reconnectTypes(splitParameters);
    const reconnectedParameters = reconnectedTypes.reduce((reconnectedParameters, token) => {
        const parameters = reconnectedParameters.parameters;
        if (reconnectedParameters.hasType) {
            return {
                parameters: parameters.with(-1, (0, utils_1.index)(parameters, -1) + " " + token),
                hasType: false,
            };
        }
        return {
            parameters: parameters.concat([token]),
            hasType: true,
        };
    }, { parameters: [], hasType: false }).parameters;
    return reconnectedParameters;
};
exports.determineParameters = determineParameters;
const reconnectTypes = (parameters) => {
    return parameters.reduce((connector, token) => {
        const reconnectedParameters = connector.reconnectedParameters;
        if (connector.inTypeDeclaration) {
            return {
                reconnectedParameters: reconnectedParameters.with(-1, (0, utils_1.index)(reconnectedParameters, -1) + ", " + token),
                inTypeDeclaration: !/>/.test(token),
            };
        }
        return {
            reconnectedParameters: reconnectedParameters.concat([token]),
            inTypeDeclaration: /</.test(token),
        };
    }, { reconnectedParameters: [], inTypeDeclaration: false }).reconnectedParameters;
};

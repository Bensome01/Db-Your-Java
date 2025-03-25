"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAnnotations = void 0;
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConstructors = exports.makeJavaConstructor = void 0;
const tokens_1 = require("../Parse/tokens");
/*
 * @annotations keywords className parameters {
 * guaranteed to have {, parameters, and className
 */
const makeJavaConstructor = (tokens) => {
    console.log(tokens);
    const indexOfAnnotationEnd = tokens
        .findIndex(token => tokens_1.annotations
        .some(annotation => token === annotation.source));
    const annotationsEnd = indexOfAnnotationEnd === -1 ? 0 : indexOfAnnotationEnd;
    const constructorAnnotations = tokens.slice(0, annotationsEnd);
    const parameters = tokens.at(-2)
        .split(/\(|\)|,/)
        .map(param => param.trim())
        .filter(param => param !== "");
    return {
        annotations: constructorAnnotations,
        keywords: tokens.slice(annotationsEnd, -3),
        className: tokens.at(-3),
        parameters: parameters
    };
};
exports.makeJavaConstructor = makeJavaConstructor;
const findConstructors = (file, className) => {
    return file.filter(line => line.tokens.some(token => token === className));
};
exports.findConstructors = findConstructors;

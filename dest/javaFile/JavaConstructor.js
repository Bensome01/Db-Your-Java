"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConstructors = exports.makeJavaConstructor = void 0;
const common_1 = require("./common");
/*
 * @annotations keywords className parameters {
 * guaranteed to have {, parameters, and className
 */
const makeJavaConstructor = (tokens) => {
    const { annotations, annotationEnd } = (0, common_1.findAnnotations)(tokens);
    const parameters = tokens.at(-2)
        .split(/\(|\)|,/)
        .map(param => param.trim())
        .filter(param => param !== "");
    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, -3),
        className: tokens.at(-3),
        parameters: parameters
    };
};
exports.makeJavaConstructor = makeJavaConstructor;
const findConstructors = (file, className) => {
    return file.filter(line => line.tokens.some(token => token === className));
};
exports.findConstructors = findConstructors;

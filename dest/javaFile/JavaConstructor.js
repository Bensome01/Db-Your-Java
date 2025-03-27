"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printJavaConstructor = exports.findConstructors = exports.makeJavaConstructor = void 0;
const common_1 = require("./common");
/*
 * @annotations keywords className parameters {
 * guaranteed to have parameters, and className
 * may have either { or parameters;
 */
const makeJavaConstructor = (tokens) => {
    const { annotations, annotationEnd } = (0, common_1.findAnnotations)(tokens);
    const endCurlyAdjustment = tokens.at(-1) === "{" ? -1 : 0;
    const parameters = (0, common_1.determineParameters)(tokens.at(-1 + endCurlyAdjustment));
    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, -2 + endCurlyAdjustment),
        className: tokens.at(-2 + endCurlyAdjustment),
        parameters: parameters
    };
};
exports.makeJavaConstructor = makeJavaConstructor;
const findConstructors = (file, className) => {
    return file.filter(line => line.tokens.some(token => token === className));
};
exports.findConstructors = findConstructors;
const printJavaConstructor = (constructor) => {
    console.log("annotations: ", constructor.annotations);
    console.log("keywords: ", constructor.keywords);
    console.log("class name: ", constructor.className);
    console.log("parameters: ", constructor.parameters);
};
exports.printJavaConstructor = printJavaConstructor;

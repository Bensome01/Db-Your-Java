"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printJavaMethod = exports.makeJavaMethod = void 0;
const common_1 = require("./common");
const makeJavaMethod = (tokens) => {
    const { annotations, annotationEnd } = (0, common_1.findAnnotations)(tokens);
    const endCurlyAdjustment = tokens.at(-1) === "{" ? -1 : 0;
    const parameters = (0, common_1.determineParameters)(tokens.at(-1 + endCurlyAdjustment));
    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, -3 + endCurlyAdjustment),
        returnType: tokens.at(-3 + endCurlyAdjustment),
        methodName: tokens.at(-2 + endCurlyAdjustment),
        parameters: parameters
    };
};
exports.makeJavaMethod = makeJavaMethod;
const printJavaMethod = (method) => {
    console.log("annotations: ", method.annotations);
    console.log("keywords: ", method.keywords);
    console.log("return type: ", method.returnType);
    console.log("method name: ", method.methodName);
    console.log("parameters: ", method.parameters);
};
exports.printJavaMethod = printJavaMethod;

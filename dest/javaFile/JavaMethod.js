"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printJavaMethod = exports.makeJavaMethod = void 0;
const common_1 = require("./common");
const makeJavaMethod = (tokens) => {
    const { annotations, annotationEnd } = (0, common_1.findAnnotations)(tokens);
    const parameters = (0, common_1.determineParameters)(tokens.at(-2));
    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, -4),
        returnType: tokens.at(-4),
        methodName: tokens.at(-3),
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

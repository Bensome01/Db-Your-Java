"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJavaClass = void 0;
const findClassName = (tokens) => {
    const classKeywordLocation = tokens.findIndex(token => token === "class");
    return tokens[classKeywordLocation + 1];
};
const findClassKeywords = (tokens) => {
    const classKeywordLocation = tokens.findIndex(token => token === "class");
    return tokens.slice(0, classKeywordLocation - 1);
};
const findParentClass = (tokens) => {
    const extendsLocation = tokens.findIndex(token => token === "extends");
    if (extendsLocation == -1) {
        return undefined;
    }
    return tokens[extendsLocation + 1];
};
const findInterfaces = (tokens) => {
    const implementsLocation = tokens.findIndex(token => token === "implements");
    if (implementsLocation === -1) {
        return [];
    }
    const interfaces = tokens.slice(implementsLocation + 1, -1)
        .map(implemented => {
        if (implemented.at(-1) === ",") {
            return implemented.slice(-1);
        }
        return implemented;
    });
    return interfaces;
};
const makeJavaClass = (file) => {
    const classDeclarations = file
        .filter(line => new RegExp(/class/).test(line))
        .map(line => line.split(' '))
        .filter(tokens => tokens.some(token => token === "class"));
    const mainClass = classDeclarations[0];
    const nestedClasses = classDeclarations.slice(1);
    return {
        className: findClassName(mainClass),
        keyWords: findClassKeywords(mainClass),
        parent: findParentClass(mainClass),
        interfaces: findInterfaces(mainClass),
        fields: [], //implement
        constructors: [], //implement
        methods: [], //implement
        nestedClasses: nestedClasses.map(classDeclaration => (0, exports.makeJavaClass)(classDeclaration))
    };
};
exports.makeJavaClass = makeJavaClass;

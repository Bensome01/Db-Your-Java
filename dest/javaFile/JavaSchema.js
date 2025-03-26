"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJavaSchema = void 0;
const common_1 = require("./common");
const JavaConstructor_1 = require("./JavaConstructor");
const JavaField_1 = require("./JavaField");
const JavaMethod_1 = require("./JavaMethod");
const makeJavaSchema = (file) => {
    console.log("Make JavaSchema");
    const mainSchema = file.at(0);
    const schemaName = findSchemaName(mainSchema.tokens);
    const mainSchemaContents = file.slice(1, -1);
    const nestedClassBounds = findNestedClasses(mainSchemaContents);
    const excludeNestedClassContents = excludeContentInBounds(mainSchemaContents, nestedClassBounds);
    const javaFields = (0, JavaField_1.findJavaFields)(excludeNestedClassContents);
    const excludeJavaFields = excludeContentInBounds(excludeNestedClassContents, javaFields.map(line => {
        return { start: line.index, end: line.index };
    }))
        .map(line => (0, common_1.separateMethodFromParameter)(line));
    const javaConstructors = (0, JavaConstructor_1.findConstructors)(excludeJavaFields, schemaName);
    const excludeJavaConstructors = excludeContentInBounds(excludeJavaFields, javaConstructors.map(line => {
        return { start: line.index, end: line.index };
    }));
    const javaMethods = excludeJavaConstructors;
    return {
        schemaName: schemaName,
        keyWords: findSchemaKeywords(mainSchema.tokens),
        parent: findParentClass(mainSchema.tokens),
        interfaces: findInterfaces(mainSchema.tokens),
        fields: javaFields.map(line => (0, JavaField_1.makeJavaField)(line.tokens)),
        constructors: javaConstructors.map(constructor => (0, JavaConstructor_1.makeJavaConstructor)(constructor.tokens)),
        methods: javaMethods.map(method => (0, JavaMethod_1.makeJavaMethod)(method.tokens)),
        nestedClasses: nestedClassBounds
            .map(classBounds => (0, exports.makeJavaSchema)(mainSchemaContents.slice(classBounds.start, classBounds.end + 1)))
    };
};
exports.makeJavaSchema = makeJavaSchema;
const findSchemaName = (tokens) => {
    const SchemaKeywordLocation = tokens.findIndex(token => token === "class" || token === "interface");
    return tokens[SchemaKeywordLocation + 1];
};
const findSchemaKeywords = (tokens) => {
    const SchemaKeywordLocation = tokens.findIndex(token => token === "class" || token === "interface");
    return tokens.slice(0, SchemaKeywordLocation);
};
const findParentClass = (tokens) => {
    const extendsLocation = tokens.findIndex(token => token === "extends");
    if (extendsLocation == -1) {
        return "";
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
const contentBounds = (start, file) => {
    return file
        .reduce((end, line) => {
        if (line.index <= end) {
            return end;
        }
        if (line.tokens.some(token => token === "{")) {
            return contentBounds(line.index, file);
        }
        if (line.tokens.some(token => token === "}")) {
            return line.index;
        }
        return end;
    }, start);
};
const excludeContentInBounds = (file, contentBounds) => {
    const inRangeInclusive = (start, end, num) => {
        return start <= num && num <= end;
    };
    return file
        .filter((line) => !contentBounds
        .some(bounds => inRangeInclusive(bounds.start, bounds.end, line.index)));
};
const findNestedClasses = (file) => {
    const reIndexedFile = file
        .map((line, index) => {
        return { tokens: line.tokens, index: index };
    });
    const nestedClassBounds = reIndexedFile.reduce((boundsFinder, line) => {
        const isClassDeclaration = line.tokens.some(token => token === "class");
        const isClassCloser = line.tokens.every(token => token === "}");
        const classDepth = isClassDeclaration
            ? boundsFinder.classDepth + 1
            : isClassCloser
                ? boundsFinder.classDepth - 1
                : boundsFinder.classDepth;
        const classBounds = isClassDeclaration
            ? boundsFinder.classBounds.concat([{ start: line.index, end: line.index }])
            : isClassCloser && classDepth === 0
                ? boundsFinder.classBounds.with(-1, { start: boundsFinder.classBounds.at(-1).start, end: line.index })
                : boundsFinder.classBounds;
        return {
            classBounds: classBounds,
            classDepth: classDepth
        };
    }, { classBounds: [], classDepth: 0 }).classBounds;
    return nestedClassBounds;
};

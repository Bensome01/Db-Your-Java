"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printJavaSchema = exports.inheritsFrom = exports.makeJavaSchema = void 0;
const utils_1 = require("../utils");
const common_1 = require("./common");
const JavaConstructor_1 = require("./JavaConstructor");
const JavaField_1 = require("./JavaField");
const JavaMethod_1 = require("./JavaMethod");
const makeJavaSchema = (file) => {
    const mainSchema = (0, utils_1.index)(file, 0);
    const schemaName = findSchemaName(mainSchema.tokens);
    const mainSchemaContents = file.slice(1, -1);
    const nestedClassBounds = findNestedClasses(mainSchemaContents);
    const excludeNestedClassContents = excludeContentInBounds(mainSchemaContents, nestedClassBounds);
    const javaFields = (0, JavaField_1.findJavaFields)(excludeNestedClassContents);
    const excludeJavaFields = excludeContentInBounds(excludeNestedClassContents, javaFields.map((line, index) => {
        return { start: index, end: index };
    })).map((line) => (0, common_1.separateMethodFromParameter)(line));
    const javaConstructors = (0, JavaConstructor_1.findConstructors)(excludeJavaFields, schemaName);
    const excludeJavaConstructors = excludeContentInBounds(excludeJavaFields, javaConstructors.map((line, index) => {
        return { start: index, end: index };
    }));
    const javaMethods = excludeJavaConstructors;
    return {
        schema: mainSchema.tokens.find((token) => token === "class" || token === "interface"),
        schemaName: schemaName,
        keyWords: findSchemaKeywords(mainSchema.tokens),
        parent: findParentClass(mainSchema.tokens),
        interfaces: findInterfaces(mainSchema.tokens),
        fields: javaFields.map((line) => (0, JavaField_1.makeJavaField)(line.tokens)),
        constructors: javaConstructors.map((constructor) => (0, JavaConstructor_1.makeJavaConstructor)(constructor.tokens)),
        methods: javaMethods.map((method) => (0, JavaMethod_1.makeJavaMethod)(method.tokens)),
        nestedClasses: nestedClassBounds.map((classBounds) => (0, exports.makeJavaSchema)(mainSchemaContents.slice(classBounds.start, classBounds.end + 1))),
    };
};
exports.makeJavaSchema = makeJavaSchema;
const findSchemaName = (tokens) => {
    const SchemaKeywordLocation = tokens.findIndex((token) => token === "class" || token === "interface");
    return tokens[SchemaKeywordLocation + 1];
};
const findSchemaKeywords = (tokens) => {
    const SchemaKeywordLocation = tokens.findIndex((token) => token === "class" || token === "interface");
    return tokens.slice(0, SchemaKeywordLocation);
};
const findParentClass = (tokens) => {
    const extendsLocation = tokens.findIndex((token) => token === "extends");
    if (extendsLocation == -1) {
        return "";
    }
    return tokens[extendsLocation + 1];
};
const findInterfaces = (tokens) => {
    const implementsLocation = tokens.findIndex((token) => token === "implements");
    if (implementsLocation === -1) {
        return [];
    }
    const interfaces = tokens
        .slice(implementsLocation + 1, -1)
        .map((implemented) => {
        if (implemented.at(-1) === ",") {
            return implemented.slice(-1);
        }
        return implemented;
    });
    return interfaces;
};
const contentBounds = (start, file) => {
    return file.reduce((end, line) => {
        if (line.index <= end) {
            return end;
        }
        if (line.tokens.some((token) => token === "{")) {
            return contentBounds(line.index, file);
        }
        if (line.tokens.some((token) => token === "}")) {
            return line.index;
        }
        return end;
    }, start);
};
const excludeContentInBounds = (file, contentBounds) => {
    const inRangeInclusive = (range, num) => {
        return range.start <= num && num <= range.end;
    };
    return file.filter((line, index) => !contentBounds.some((bounds) => inRangeInclusive(bounds, index)));
};
const findNestedClasses = (file) => {
    const reIndexedFile = file.map((line, index) => {
        return { tokens: line.tokens, index: index };
    });
    const nestedClassBounds = reIndexedFile.reduce((boundsFinder, line) => {
        const isClassDeclaration = line.tokens.some((token) => token === "class");
        const isClassCloser = line.tokens.every((token) => token === "}");
        let classDepth = boundsFinder.classDepth;
        if (isClassDeclaration) {
            classDepth++;
        }
        else if (isClassCloser) {
            classDepth--;
        }
        var classBounds;
        if (isClassDeclaration) {
            classBounds = boundsFinder.classBounds.concat([
                { start: line.index, end: line.index },
            ]);
        }
        else if (isClassCloser && classDepth === 0) {
            classBounds = boundsFinder.classBounds.with(-1, {
                start: boundsFinder.classBounds.at(-1).start,
                end: line.index,
            });
        }
        else {
            classBounds = boundsFinder.classBounds;
        }
        return {
            classBounds: classBounds,
            classDepth: classDepth,
        };
    }, { classBounds: [], classDepth: 0 }).classBounds;
    return nestedClassBounds;
};
const inheritsFrom = (schema, parent) => {
    return (schema.parent === parent ||
        schema.interfaces.some((implement) => implement === parent));
};
exports.inheritsFrom = inheritsFrom;
const printJavaSchema = (schema) => {
    console.log("schema: ", schema.schema);
    console.log("schema name: ", schema.schemaName);
    console.log("keywords: ", schema.keyWords);
    console.log("parent: ", schema.parent);
    console.log("interfaces: ", schema.interfaces);
    console.log("fields");
    schema.fields.forEach((field) => (0, JavaField_1.printjavaField)(field));
    console.log("constructors");
    schema.constructors.forEach((constructor) => (0, JavaConstructor_1.printJavaConstructor)(constructor));
    console.log("methods");
    schema.methods.forEach((method) => (0, JavaMethod_1.printJavaMethod)(method));
    console.log("nested classes");
    schema.nestedClasses.forEach((nestedClass) => {
        console.log("nested class");
        (0, exports.printJavaSchema)(nestedClass);
    });
    console.log("End of schema", schema.schemaName);
};
exports.printJavaSchema = printJavaSchema;
// schemaName: string;
// keyWords: string[];
// parent: string;
// interfaces: string[];
// fields: JavaField[];
// constructors: JavaConstructor[];
// methods: JavaMethod[];
// nestedClasses: JavaSchema[];

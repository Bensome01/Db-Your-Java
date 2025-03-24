import { TokenizedLine, tokenizeLine } from "../Parse/tokenizedLine";
import { findConstructors, JavaConstructor, makeJavaConstructor } from "./JavaConstructor";
import { findJavaFields, JavaField, makeJavaField } from "./JavaField"
import { JavaMethod, makeJavaMethod, separateMethodFromParameter } from "./JavaMethod";

export type JavaSchema =
{
    schemaName: string;
    keyWords: string[];
    parent: string | undefined;
    interfaces: string[];
    fields: JavaField[];
    constructors: JavaConstructor[];
    methods: JavaMethod[];
    nestedClasses: JavaSchema[];
};

export const makeJavaSchema = (file: string[]): JavaSchema => {
    const tokenizedFile: TokenizedLine[] = file
        .map((line, index): TokenizedLine => tokenizeLine(line, index));

    const makeJavaSchema = (file: TokenizedLine[]): JavaSchema => {
        const schemaDeclarations: TokenizedLine[] = file
        .filter(line => line.tokens.some(token => token === "class" || token === "interface"));

        const mainSchema: string[] = schemaDeclarations[0].tokens;

        const schemaName = findSchemaName(mainSchema);

        const nestedClassBounds: {start: number, end: number}[] = schemaDeclarations.slice(1)
            .map((declarations): {start: number, end: number} => {
                return { start: declarations.index , end: contentBounds(declarations.index, file)}
            });

        const excludeNestedClassContents: TokenizedLine[] = excludeContentInBounds(file, nestedClassBounds);
        const javaFields: TokenizedLine[] = findJavaFields(excludeNestedClassContents);

        const excludeJavaFields: TokenizedLine[] = excludeContentInBounds(excludeNestedClassContents,
            javaFields.map(line => {
                return {start: line.index, end: line.index};
            }))
            .map(line => separateMethodFromParameter(line));

        const javaConstructors: TokenizedLine[] = findConstructors(excludeJavaFields, schemaName);

        const excludeJavaConstructors: TokenizedLine[] = excludeContentInBounds(excludeJavaFields, javaConstructors.map(line => {
            return { start: line.index, end: line.index };
        }));

        const javaMethods: TokenizedLine[] = excludeJavaConstructors;

        return {
            schemaName: schemaName,
            keyWords: findSchemaKeywords(mainSchema),
            parent: findParentClass(mainSchema),
            interfaces: findInterfaces(mainSchema),
            fields: javaFields.map(line => makeJavaField(line.tokens)),
            constructors: javaConstructors.map(constructor => makeJavaConstructor(constructor.tokens)),
            methods: javaMethods.map(method => makeJavaMethod(method.tokens)),
            nestedClasses: nestedClassBounds
                .map(classBounds => makeJavaSchema(file.slice(classBounds.start, classBounds.end + 1)))
        };

    };

    return makeJavaSchema(tokenizedFile);
};

const findSchemaName = (tokens: string[]): string => {
    const SchemaKeywordLocation: number = tokens.findIndex(token => token === "class" || token === "interface");
    return tokens[SchemaKeywordLocation + 1];
};

const findSchemaKeywords = (tokens: string[]): string[] => {
    const SchemaKeywordLocation: number = tokens.findIndex(token => token === "class" || token === "interface");
    return tokens.slice(0, SchemaKeywordLocation);
};

const findParentClass = (tokens: string[]): string | undefined => {
    const extendsLocation: number = tokens.findIndex(token => token === "extends");

    if (extendsLocation == -1)
    {
        return undefined;
    }
    return tokens[extendsLocation + 1];
};

const findInterfaces = (tokens: string[]): string[] => {
    const implementsLocation: number = tokens.findIndex(token => token === "implements");

    if(implementsLocation === -1)
    {
        return [];
    }

    const interfaces: string[] = tokens.slice(implementsLocation + 1, -1)
        .map(implemented => {
            if (implemented.at(-1) === ",")
            {
                return implemented.slice(-1);
            }
            return implemented;
        });

    return interfaces;
};

const contentBounds = (start: number, file: TokenizedLine[]): number => {
    return file
        .reduce((end: number, line: TokenizedLine): number => {
        if (line.index <= end)
        {
            return end;
        }

        if (line.tokens.some(token => token === "{"))
        {
            return contentBounds(line.index, file);
        }

        if (line.tokens.some(token => token === "}"))
        {
            return line.index;
        }

        return end;
    }, start)
};

const excludeContentInBounds = (file: TokenizedLine[], contentBounds: {start: number, end: number}[])
    : TokenizedLine[] => {
        const inRangeInclusive = (start: number, end: number, num: number): boolean => {
            return start <= num && num <= end;
        };

        return file
            .filter((line) => !contentBounds
                .some(bounds => inRangeInclusive(bounds.start, bounds.end, line.index)))
    };

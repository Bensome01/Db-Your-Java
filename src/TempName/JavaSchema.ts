import { JavaConstructor } from "./JavaConstructor";
import { JavaField } from "./JavaField"
import { JavaMethod } from "./JavaMethod";

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
}

export const makeJavaSchema = (file: string[]): JavaSchema => {
    const schemaDeclarations: { tokens: string[], index: number }[] = file
        .map((l, i): { line: string, index: number } => {
            return { line: l, index: i };
        })
        .filter(line => /class/.test(line.line) || /interface/)
        .map((line): { tokens: string[], index: number } => {
            return {tokens: line.line.split(' '), index: line.index}
        })
        .filter(line => line.tokens.some(token => token === "class" || token === "interface"));

    const mainSchema: string[] = schemaDeclarations[0].tokens;

    const nestedClassBounds: {start: number, end: number}[] = schemaDeclarations.slice(1)
        .map((declarations): {start: number, end: number} => {
            return { start: declarations.index , end: contentBounds(declarations.index, file)}
        });

    const excludedContents = excludeNestedContent(file, nestedClassBounds);

    return {
        schemaName: findSchemaName(mainSchema),
        keyWords: findSchemaKeywords(mainSchema),
        parent: findParentClass(mainSchema),
        interfaces: findInterfaces(mainSchema),
        fields: [], //implement
        constructors: [], //implement
        methods: [], //implement
        nestedClasses: nestedClassBounds
            .map(classBounds => makeJavaSchema(file.slice(classBounds.start, classBounds.end + 1)))
    };
};

const findSchemaName = (tokens: string[]): string => {
    const SchemaKeywordLocation: number = tokens.findIndex(token => token === "class" || "interface");
    return tokens[SchemaKeywordLocation + 1];
};

const findSchemaKeywords = (tokens: string[]): string[] => {
    const SchemaKeywordLocation: number = tokens.findIndex(token => token === "class" || token === "interface");
    return tokens.slice(0, SchemaKeywordLocation - 1);
}

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

const contentBounds = (start: number, file: string[]): number => {
    return file
        .map((line, index): [string, number] => [line, index])
        .reduce((end: number, line: [string, number]): number => {
        if (line[1] <= end)
        {
            return end;
        }

        if (/{/.test(line[0]))
        {
            return contentBounds(line[1], file);
        }

        if (/}/.test(line[0]))
        {
            return line[1];
        }

        return end;
    }, start)
}

const excludeNestedContent = (file: string[], nestedClassBounds: {start: number, end: number}[]): string[] => {
    const inRangeInclusive = (start: number, end: number, num: number): boolean => {
        return start <= num && num <= end;
    };

    return file
        .filter((line, index) => !nestedClassBounds
            .some(bounds => inRangeInclusive(bounds.start, bounds.end, index)))
}

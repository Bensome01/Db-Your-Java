import { JavaConstructor } from "./JavaConstructor";
import { JavaField } from "./JavaField"
import { JavaInterface } from "./JavaInterface";
import { JavaMethod } from "./JavaMethod";

export type JavaClass =
{
    className: string;
    keyWords: string[];
    parent: string | undefined;
    interfaces: JavaInterface[] | undefined;
    fields: JavaField[];
    constructors: JavaConstructor[];
    methods: JavaMethod[];
    nestedClasses: JavaClass[];
}

const findClassName = (tokens: string[]): string => {
    const classKeywordLocation: number = tokens.findIndex(token => token === "class");
    return tokens[classKeywordLocation + 1];
};

const findClassKeywords = (tokens: string[]): string[] => {
    const classKeywordLocation: number = tokens.findIndex(token => token === "class");
    return tokens.slice(0, classKeywordLocation - 1);
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

export const makeJavaClass = (file: string[]): JavaClass => {
    const classDeclarations: { tokens: string[], index: number }[] = file
        .map((l, i): { line: string, index: number } => {
            return { line: l, index: i };
        })
        .filter(line => new RegExp(/class/).test(line.line))
        .map((line): { tokens: string[], index: number } => {
            return {tokens: line.line.split(' '), index: line.index}
        })
        .filter(line => line.tokens.some(token => token === "class"));

    const mainClass: string[] = classDeclarations[0].tokens;

    const nestedClassBounds: {start: number, end: number}[] = classDeclarations.slice(1)
        .map((declarations): {start: number, end: number} => {
            return { start: declarations.index , end: contentBounds(declarations.index, file)}
        });

    return {
        className: findClassName(mainClass),
        keyWords: findClassKeywords(mainClass),
        parent: findParentClass(mainClass),
        interfaces: findInterfaces(mainClass),
        fields: [], //implement
        constructors: [], //implement
        methods: [], //implement
        nestedClasses: nestedClassBounds
            .map(classBounds => makeJavaClass(file.slice(classBounds.start, classBounds.end + 1)))
    };
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

const findClassBounds = (file: string[]): string[] => {
    const classDeclarationIndex: number = file.findIndex(line => /class/.test(line));
    const endBracket = contentBounds(classDeclarationIndex, file)

    return file.slice(classDeclarationIndex, endBracket);
}


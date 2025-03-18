import JavaConstructor from "./JavaConstructor";
import JavaField from "./JavaField"
import JavaInterface from "./JavaInterface";
import JavaMethod from "./JavaMethod";

export type JavaClass =
{
    className: string;
    keyWords: string[];
    parent: string | undefined;
    interfaces: JavaInterface[] | undefined;
    fields: JavaField[] = [];
    constructors: JavaConstructor[];
    methods: JavaMethod[] = [];
    nestedClasses: JavaClass[] = [];
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
        .map(interface => {
            if (interface.at(-1) === ",")
            {
                return interface.slice(-1);
            }
            return interface;
        });

    return interfaces;
};

export const makeJavaClass = (file: string[]): JavaClass => {
    const classDeclaration: string[] = file.find(line => new RegExp(/class/).test(line))!.split(' ')!

    return {
        className: findClassName(classDeclaration),
        keyWords: findClassKeywords(classDeclaration),
        parent: findParentClass(classDeclaration),
        interfaces: findInterfaces(classDeclaration),
        fields: ,
        constructors: ,
        methods: ,
        nestedClasses:
    };
};

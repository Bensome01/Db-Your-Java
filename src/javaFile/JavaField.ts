import { TokenizedLine } from "./../Parse/tokenizedLine";
import { findAnnotations } from "./common";

export type JavaField = 
{
    annotations: string[];
    keywords: string[];
    fieldType: string;
    fieldName: string;
    fieldValue: string;
};

export const makeJavaField = (tokens: string[]): JavaField => {
    const { annotations, annotationEnd } = findAnnotations(tokens);

    const equalSignLocation: number = tokens.findIndex(token => token === "=");
    const declarationEnd: number = equalSignLocation === -1 ? tokens.length : equalSignLocation

    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, declarationEnd - 2),
        fieldType: tokens.at(declarationEnd - 2)!,
        fieldName: tokens.at(declarationEnd - 1)!,
        fieldValue: equalSignLocation === -1 ? "" : tokens.at(equalSignLocation + 1)!
    };
}

export const findJavaFields = (file: TokenizedLine[]): TokenizedLine[] => {
    return file.filter(line => !line.tokens.some(token => /\(/.test(token)));
}

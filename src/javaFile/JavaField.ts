import { annotations } from "../Parse/tokens";
import { TokenizedLine } from "./../Parse/tokenizedLine";

export type JavaField = 
{
    annotations: string[];
    keywords: string[];
    fieldType: string;
    fieldName: string;
    fieldValue: string;
};

export const makeJavaField = (tokens: string[]): JavaField => {
    const indexOfAnnotationEnd: number = tokens
        .findIndex(token => annotations
            .some(annotation => token === annotation.source));
    const annotationsEnd: number = indexOfAnnotationEnd === -1 ? 0: indexOfAnnotationEnd;

    const fieldAnnotations: string[] = tokens.slice(0, annotationsEnd);
    const equalSignLocation: number = tokens.findIndex(token => token === "=");
    const declarationEnd: number = equalSignLocation === -1 ? tokens.length : equalSignLocation

    return {
        annotations: fieldAnnotations,
        keywords: tokens.slice(annotationsEnd, declarationEnd - 2),
        fieldType: tokens.at(declarationEnd - 2)!,
        fieldName: tokens.at(declarationEnd - 1)!,
        fieldValue: equalSignLocation === -1 ? "" : tokens.at(equalSignLocation + 1)!
    };
}

export const findJavaFields = (file: TokenizedLine[]): TokenizedLine[] => {
    return file.filter(line => !line.tokens.some(token => /\(/.test(token)));
}

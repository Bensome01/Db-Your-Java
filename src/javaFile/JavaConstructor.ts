import { TokenizedLine } from "../Parse/tokenizedLine";
import { annotations, keywords } from "../Parse/tokens";

export type JavaConstructor = 
{
    annotations: string[];
    keywords: string[];
    className: string;
    parameters: string[];
};

/*
 * @annotations keywords className parameters {
 * guaranteed to have {, parameters, and className
 */
export const makeJavaConstructor = (tokens: string[]): JavaConstructor => {
    const indexOfAnnotationEnd: number = tokens
        .findIndex(token => annotations
            .some(annotation => token === annotation.source));
    const annotationsEnd: number = indexOfAnnotationEnd === -1 ? 0: indexOfAnnotationEnd;

    const constructorAnnotations: string[] = tokens.slice(0, annotationsEnd);

    const parameters: string[] = tokens.at(-2)!
        .split(/\(|\)|,/)
        .map(param => param.trim())
        .filter(param => param !== "");

    return {
        annotations: constructorAnnotations,
        keywords: tokens.slice(annotationsEnd, -3),
        className: tokens.at(-3)!,
        parameters: parameters
    };
}

export const findConstructors = (file: TokenizedLine[], className: string): TokenizedLine[] => {
    return file.filter(line => line.tokens.some(token => token === className));
}

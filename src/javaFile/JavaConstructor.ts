import { TokenizedLine } from "../Parse/tokenizedLine";
import { annotations, keywords } from "../Parse/tokens";
import { findAnnotations } from "./common";

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
    const { annotations, annotationEnd } = findAnnotations(tokens);


    const parameters: string[] = tokens.at(-2)!
        .split(/\(|\)|,/)
        .map(param => param.trim())
        .filter(param => param !== "");

    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, -3),
        className: tokens.at(-3)!,
        parameters: parameters
    };
}

export const findConstructors = (file: TokenizedLine[], className: string): TokenizedLine[] => {
    return file.filter(line => line.tokens.some(token => token === className));
}

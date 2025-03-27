import { TokenizedLine } from "../Parse/tokenizedLine";
import { annotations, keywords } from "../Parse/tokens";
import { determineParameters, findAnnotations } from "./common";

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


    const parameters: string[] = determineParameters(tokens.at(-2)!);

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

export const printJavaConstructor = (constructor: JavaConstructor): void => {
    console.log("annotations: ", constructor.annotations);
    console.log("keywords: ", constructor.keywords);
    console.log("class name: ", constructor.className);
    console.log("parameters: ", constructor.parameters);
}

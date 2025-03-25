import { determineParameters, findAnnotations } from "./common";

export type JavaMethod =
{
    annotations: string[];
    keywords: string[];
    returnType: string;
    methodName: string;
    parameters: string[];
}

export const makeJavaMethod = (tokens: string[]): JavaMethod => {
    const { annotations, annotationEnd } = findAnnotations(tokens);

    const parameters: string[] = determineParameters(tokens.at(-2)!);

    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, -4),
        returnType: tokens.at(-4)!,
        methodName: tokens.at(-3)!,
        parameters: parameters
    };
}

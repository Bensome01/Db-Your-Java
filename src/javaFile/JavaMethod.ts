import { TokenizedLine } from "../Parse/tokenizedLine";
import { findAnnotations } from "./common";

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

    const parameters: string[] = tokens.at(-2)!
        .split(/\(|, |\)/)
        .filter(param => param !== "");

    return {
        annotations: annotations,
        keywords: tokens.slice(annotationEnd, -4),
        returnType: tokens.at(-4)!,
        methodName: tokens.at(-3)!,
        parameters: parameters
    };
}

export const separateMethodFromParameter = (line: TokenizedLine): TokenizedLine => {
    const methodNameLocation: number = line.tokens.findIndex(token => /\(/.test(token));

    if (methodNameLocation === -1)
    {
        return line;
    }

    const targetToken: string = line.tokens.at(methodNameLocation)!;
    const separateLocation: number = targetToken.indexOf("(");
    const separatedTokens: string[] = [targetToken.slice(0, separateLocation), targetToken.slice(separateLocation)];

    return { tokens: line.tokens.toSpliced(methodNameLocation, 1, ...separatedTokens), index: line.index };
}

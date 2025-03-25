import { TokenizedLine } from "../Parse/tokenizedLine";
import { genericAnnotation } from "../Parse/tokens";

export const findAnnotations = (tokens: string[]): { annotations: string[], annotationEnd: number } => {
    const annotationEnd: number = tokens
        .findIndex(token => !genericAnnotation
            .some(annotation => annotation.test(token)));

    const annotations: string[] = tokens.slice(0, annotationEnd);

    return {
        annotations: annotations,
        annotationEnd: annotationEnd
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

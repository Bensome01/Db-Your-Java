import { TokenizedLine } from "../Parse/tokenizedLine";

export type JavaMethod =
{
    keywords: string[];
    returnType: string;
    methodName: string;
    parameters: string[];
}

export const makeJavaMethod = (tokens: string[]): JavaMethod => {
    const mutableTokens: string[] = [];
    tokens.forEach(token => mutableTokens.push(token));

    const parameters: string[] = mutableTokens.pop()!
        .split(/\(|,|\)/)
        .filter(param => param !== "");
    
    const methodName: string = mutableTokens.pop()!;
    const returnType: string = mutableTokens.pop()!;

    return {
        keywords: mutableTokens,
        returnType: returnType,
        methodName: methodName,
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

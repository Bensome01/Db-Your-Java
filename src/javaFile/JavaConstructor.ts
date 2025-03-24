import { TokenizedLine } from "../Parse/tokenizedLine";
import { keywords } from "../Parse/tokens";

export type JavaConstructor = 
{
    keywords: string[];
    parameters: string[];
};


export const makeJavaConstructor = (tokens: string[]): JavaConstructor => {
    const mutableTokens: string[] = [];
    tokens.forEach(token => mutableTokens.push(token));

    const parameters: string[] = mutableTokens.pop()!
        .split(/\(|,|\)/)
        .filter(param => param !== "");
        
    const constructorName: string = mutableTokens.pop()!;

    return {keywords: mutableTokens, parameters: parameters};
}

export const findConstructors = (file: TokenizedLine[], className: string): TokenizedLine[] => {
    return file.filter(line => line.tokens.some(token => token === className));
}

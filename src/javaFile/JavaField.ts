import { TokenizedLine } from "./../Parse/tokenizedLine";

export type JavaField = 
{
    keywords: string[];
    fieldName: string;
    fieldType: string;
};

export const makeJavaField = (tokens: string[]): JavaField => {
    const mutableTokens: string[] = [];
    tokens.forEach(token => mutableTokens.push(token));
    const fieldName: string = mutableTokens.pop()!;
    const fieldType: string = mutableTokens.pop()!;

    return {fieldName: fieldName, fieldType: fieldType, keywords: mutableTokens};
}

export const findJavaFields = (file: TokenizedLine[]): TokenizedLine[] => {
    return file.filter(line => !line.tokens.some(token => /\(/.test(token)));
}

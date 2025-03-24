import { TokenizedLine } from "./../Parse/tokenizedLine";

export type JavaField = 
{
    //
};

export const makeJavaField = (tokens: string[]): JavaField => {
    return {};
}

export const findJavaFields = (file: TokenizedLine[]): TokenizedLine[] => {
    return file.filter(line => !line.tokens.some(token => /\(/.test(token)));
}
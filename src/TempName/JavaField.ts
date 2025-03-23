import { TokenizedLine } from "./JavaSchema";

export type JavaField = 
{
    //
};

export const makeJavaField = (tokens: string[]): JavaField => {
    //
}

export const findJavaFields = (file: TokenizedLine[]): TokenizedLine[] => {
    const excludeEqualsSign: TokenizedLine[] = file.map(line => {
        const equalIndex: number = line.tokens.findIndex(token => token === "=");

        if (equalIndex != -1)
        {
            return { tokens: line.tokens.slice(0, equalIndex), index: line.index};
        }

        return line
    });

    return excludeEqualsSign.filter(line => !line.tokens.some(token => /\(/.test(token)));
}
import { TokenizedLine } from "../Parse/tokenizedLine";

export type JavaMethod =
{
    //
}

export const makeJavaMethod = (tokens: string[]): JavaMethod => {
    return {};
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

    return { tokens: line.tokens.toSpliced(methodNameLocation, 0, ...separatedTokens), index: line.index };
}

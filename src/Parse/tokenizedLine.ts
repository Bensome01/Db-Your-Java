import { beginningContainers, combineRegexes, endingContainers } from "./tokens";

export type TokenizedLine = 
{
    tokens: string[];
    index: number;
};

export const tokenizeLine = (line: string, index: number): TokenizedLine => {
    const trimmedTokens: string[] = trimTokens(line.split(' '));
    const reconnectedTokens: string[] = reconnectTokens(trimmedTokens);

    return { tokens: reconnectedTokens, index: index };
}

const trimTokens = (tokens: string[]): string[] => {
    const equalsIndex: number = tokens.findIndex(token => token === "=");

    if (equalsIndex === -1)
    {
        return tokens;
    }

    return tokens.slice(0, equalsIndex);
}

const reconnectTokens = (tokens: string[]): string[] => {
    const combinedbeginnings: string = combineRegexes(beginningContainers);
    const combinedEndings: string =  combineRegexes(endingContainers);
    
    const beginningRegex: RegExp = new RegExp(combinedbeginnings, "g");
    const endingRegex: RegExp = new RegExp(combinedEndings, "g");

    const openContainers: string[] = [];

    const reconnectedTokens: string[] = tokens.reduce((tokens, token): string[] => {
        const result: string[] = reconnectTokens.length === 0 || openContainers.length === 0
            ? tokens.concat(token)
            : tokens.with(-1, tokens.at(-1) + " " + token);

        const openContainer: string[] | null = token.match(beginningRegex);
        openContainer?.forEach(container => openContainers.push(container));

        const closedContainer: string[] | null = token.match(endingRegex);
        closedContainer?.forEach(container => openContainers.pop());

        return result;
    }, [] as string[])

    return reconnectedTokens;
};

import {
  beginningContainers,
  combineRegexes,
  endingContainers,
} from "./tokens";

export type TokenizedLine = {
  tokens: string[];
  index: number;
};

export const tokenizeLine = (line: string, index: number): TokenizedLine => {
  const trimmedTokens = line.split(" ").filter((token) => token !== "");
  const reconnectedTokens = reconnectTokens(trimmedTokens);

  return { tokens: reconnectedTokens, index: index };
};

/**
 * splitting on ' ' will seperate Type<int, thing> and (Type param1, Type param2)
 * this reconnects them into one token
 */
const reconnectTokens = (tokens: string[]): string[] => {
  const combinedbeginnings = combineRegexes(beginningContainers);
  const combinedEndings = combineRegexes(endingContainers);

  const beginningRegex = new RegExp(combinedbeginnings, "g");
  const endingRegex = new RegExp(combinedEndings, "g");

  const openContainers: string[] = [];

  const reconnectedTokens = tokens.reduce((tokens, token): string[] => {
    const result: string[] =
      reconnectTokens.length === 0 || openContainers.length === 0
        ? tokens.concat(token)
        : tokens.with(-1, tokens.at(-1) + " " + token);

    const openContainer = token.match(beginningRegex);
    openContainer?.forEach((container) => openContainers.push(container));

    const closedContainer = token.match(endingRegex);
    closedContainer?.forEach((container) => openContainers.pop());

    return result;
  }, [] as string[]);

  return reconnectedTokens;
};

export const printTokenizedFile = (file: TokenizedLine[]): void => {
  const rebuiltFile = file.map((line) =>
    line.tokens.reduce(
      (line: string, token: string): string => line + token + " ",
      ""
    )
  );

  rebuiltFile.forEach((line) => console.log(line));
};

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
  const trimmedTokens: string[] = line
    .split(" ")
    .filter((token) => token !== "");
  const reconnectedTokens: string[] = reconnectTokens(trimmedTokens);

  return { tokens: reconnectedTokens, index: index };
};

const reconnectTokens = (tokens: string[]): string[] => {
  const combinedbeginnings: string = combineRegexes(beginningContainers);
  const combinedEndings: string = combineRegexes(endingContainers);

  const beginningRegex: RegExp = new RegExp(combinedbeginnings, "g");
  const endingRegex: RegExp = new RegExp(combinedEndings, "g");

  const openContainers: string[] = [];

  const reconnectedTokens: string[] = tokens.reduce(
    (tokens, token): string[] => {
      const result: string[] =
        reconnectTokens.length === 0 || openContainers.length === 0
          ? tokens.concat(token)
          : tokens.with(-1, tokens.at(-1) + " " + token);

      const openContainer: string[] | null = token.match(beginningRegex);
      openContainer?.forEach((container) => openContainers.push(container));

      const closedContainer: string[] | null = token.match(endingRegex);
      closedContainer?.forEach((container) => openContainers.pop());

      return result;
    },
    [] as string[]
  );

  return reconnectedTokens;
};

export const printTokenizedFile = (file: TokenizedLine[]): void => {
  const rebuiltFile: string[] = file.map((line) =>
    line.tokens.reduce(
      (line: string, token: string): string => line + token + " ",
      ""
    )
  );

  rebuiltFile.forEach((line) => console.log(line));
};

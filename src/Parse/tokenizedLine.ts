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

  const reconnectedTokens = tokens.reduce(
    (
      reconnector: { tokens: string[]; containerDepth: number },
      token
    ): { tokens: string[]; containerDepth: number } => {
      const reconnectedTokens =
        reconnector.containerDepth === 0
          ? reconnector.tokens.concat(token)
          : reconnector.tokens.with(-1, tokens.at(-1) + " " + token);

      const openContainer = token.match(beginningRegex);
      const closedContainer = token.match(endingRegex);

      const openContainerCount =
        openContainer === null ? 0 : openContainer.length;
      const closedContainerCount =
        closedContainer === null ? 0 : closedContainer.length;

      const containerDepth =
        reconnector.containerDepth + openContainerCount - closedContainerCount;

      return { tokens: reconnectedTokens, containerDepth: containerDepth };
    },
    { tokens: [], containerDepth: 0 }
  ).tokens;

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

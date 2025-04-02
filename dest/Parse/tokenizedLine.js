"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTokenizedFile = exports.tokenizeLine = void 0;
const tokens_1 = require("./tokens");
const tokenizeLine = (line, index) => {
    const trimmedTokens = line.split(" ").filter((token) => token !== "");
    const reconnectedTokens = reconnectTokens(trimmedTokens);
    return { tokens: reconnectedTokens, index: index };
};
exports.tokenizeLine = tokenizeLine;
/**
 * splitting on ' ' will seperate Type<int, thing> and (Type param1, Type param2)
 * this reconnects them into one token
 */
const reconnectTokens = (tokens) => {
    const combinedbeginnings = (0, tokens_1.combineRegexes)(tokens_1.beginningContainers);
    const combinedEndings = (0, tokens_1.combineRegexes)(tokens_1.endingContainers);
    const beginningRegex = new RegExp(combinedbeginnings, "g");
    const endingRegex = new RegExp(combinedEndings, "g");
    const reconnectedTokens = tokens.reduce((reconnector, token) => {
        const reconnectedTokens = reconnector.containerDepth === 0
            ? reconnector.tokens.concat(token)
            : reconnector.tokens.with(-1, tokens.at(-1) + " " + token);
        const openContainer = token.match(beginningRegex);
        const closedContainer = token.match(endingRegex);
        const openContainerCount = openContainer === null ? 0 : openContainer.length;
        const closedContainerCount = closedContainer === null ? 0 : closedContainer.length;
        const containerDepth = reconnector.containerDepth + openContainerCount - closedContainerCount;
        return { tokens: reconnectedTokens, containerDepth: containerDepth };
    }, { tokens: [], containerDepth: 0 }).tokens;
    return reconnectedTokens;
};
const printTokenizedFile = (file) => {
    const rebuiltFile = file.map((line) => line.tokens.reduce((line, token) => line + token + " ", ""));
    rebuiltFile.forEach((line) => console.log(line));
};
exports.printTokenizedFile = printTokenizedFile;

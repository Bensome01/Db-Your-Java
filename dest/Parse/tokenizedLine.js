"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTokenizedFile = exports.tokenizeLine = void 0;
const tokens_1 = require("./tokens");
const tokenizeLine = (line, index) => {
    const trimmedTokens = line
        .split(" ")
        .filter((token) => token !== "");
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
    const openContainers = [];
    const reconnectedTokens = tokens.reduce((tokens, token) => {
        const result = reconnectTokens.length === 0 || openContainers.length === 0
            ? tokens.concat(token)
            : tokens.with(-1, tokens.at(-1) + " " + token);
        const openContainer = token.match(beginningRegex);
        openContainer?.forEach((container) => openContainers.push(container));
        const closedContainer = token.match(endingRegex);
        closedContainer?.forEach((container) => openContainers.pop());
        return result;
    }, []);
    return reconnectedTokens;
};
const printTokenizedFile = (file) => {
    const rebuiltFile = file.map((line) => line.tokens.reduce((line, token) => line + token + " ", ""));
    rebuiltFile.forEach((line) => console.log(line));
};
exports.printTokenizedFile = printTokenizedFile;

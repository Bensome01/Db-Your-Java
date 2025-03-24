"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizeLine = void 0;
const tokens_1 = require("./tokens");
const tokenizeLine = (line, index) => {
    const trimmedTokens = trimTokens(line.split(' '));
    const reconnectedTokens = reconnectTokens(trimmedTokens);
    return { tokens: reconnectedTokens, index: index };
};
exports.tokenizeLine = tokenizeLine;
const trimTokens = (tokens) => {
    const equalsIndex = tokens.findIndex(token => token === "=");
    if (equalsIndex === -1) {
        return tokens;
    }
    return tokens.slice(0, equalsIndex);
};
const reconnectTokens = (tokens) => {
    const combinedbeginnings = (0, tokens_1.combineRegexes)(tokens_1.beginningContainers);
    const combinedEndings = (0, tokens_1.combineRegexes)(tokens_1.endingContainers);
    const beginningRegex = new RegExp(combinedbeginnings, "g");
    const endingRegex = new RegExp(combinedEndings, "g");
    const openContainers = [];
    const reconnectedTokens = tokens.reduce((tokens, token) => {
        const result = reconnectTokens.length === 0 || openContainers.length === 0
            ? tokens.concat(token)
            : tokens.with(-1, tokens.at(-1) + token);
        const openContainer = token.match(beginningRegex);
        openContainer?.forEach(container => openContainers.push(container));
        const closedContainer = token.match(endingRegex);
        closedContainer?.forEach(container => openContainers.pop());
        return result;
    }, []);
    return reconnectedTokens;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
/**
 * uses Array.prototype.at() but throws an error when undefined
 */
const index = (arr, index) => {
    const element = arr.at(index);
    if (element === undefined) {
        throw new Error("index out of bounds");
    }
    return element;
};
exports.index = index;

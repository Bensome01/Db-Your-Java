"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringHas = void 0;
const stringHas = (str, tests) => {
    return tests.some(test => test.test(str));
};
exports.stringHas = stringHas;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywords = exports.containers = exports.endingContainers = exports.beginningContainers = exports.primitiveDataTypes = exports.annotations = exports.genericAnnotation = exports.nonAccessModifiers = exports.loops = exports.inheritance = exports.accessibilityModifiers = exports.combineRegexes = void 0;
const combineRegexes = (regexes) => {
    return regexes.reduce((combined, regex) => {
        if (combined.length == 0) {
            return regex.source;
        }
        return combined + "|" + regex.source;
    }, "");
};
exports.combineRegexes = combineRegexes;
exports.accessibilityModifiers = [
    /public/,
    /protected/,
    /private/
];
exports.inheritance = [
    /extends/,
    /implements/
];
exports.loops = [
    /for/,
    /while/,
    /do/
];
exports.nonAccessModifiers = [
    /static/,
    /final/,
    /abstract/,
    /synchronized/,
    /volatile/,
    /transient/,
    /native/
];
exports.genericAnnotation = [
    /@\w+/
];
exports.annotations = [
    /@Override/,
    /@SuppressWarnings/,
    /@Deprecated/,
    /@Safevarargs/,
    /@FunctionalInterface/
];
exports.primitiveDataTypes = [
    /byte/,
    /short/,
    /int/,
    /long/,
    /float/,
    /double/,
    /boolean/,
    /char/
];
exports.beginningContainers = [
    /</,
    /\(/,
    /{/,
    /\[/
];
exports.endingContainers = [
    />/,
    /\)/,
    /}/,
    /\]/
];
exports.containers = exports.beginningContainers.concat(exports.endingContainers);
exports.keywords = [
    /abstract/,
    /assert/,
    /boolean/,
    /break/,
    /byte/,
    /case/,
    /catch/,
    /char/,
    /class/,
    /const/,
    /continue/,
    /default/,
    /do/,
    /double/,
    /else/,
    /enum/,
    /extends/,
    /final/,
    /finally/,
    /float/,
    /for/,
    /goto/,
    /if/,
    /implements/,
    /import/,
    /instanceof/,
    /int/,
    /interface/,
    /long/,
    /native/,
    /new/,
    /package/,
    /private/,
    /protected/,
    /public/,
    /return/,
    /short/,
    /static/,
    /strictfp/,
    /super/,
    /super/,
    /synchronised/,
    /this/,
    /throw/,
    /throws/,
    /transient/,
    /try/,
    /void/,
    /volatile/,
    /while/
];
/*
 * tokenizer
 * lexer
 * parser
 */ 

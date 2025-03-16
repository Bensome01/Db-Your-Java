"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokens = void 0;
class Tokens {
}
exports.Tokens = Tokens;
Tokens.accessibilityModifiers = [
    /public/,
    /protected/,
    /private/
];
Tokens.loops = [
    /for/,
    /while/,
    /do/
];
Tokens.nonAccessModifiers = [
    /static/,
    /final/,
    /abstract/,
    /synchronized/,
    /volatile/,
    /transient/,
    /native/
];
Tokens.genericAnnotation = [
    /@\w+/
];
Tokens.annotations = [
    /@Override/,
    /@SuppressWarnings/,
    /@Deprecated/
];
Tokens.primitiveDataTypes = [
    /byte/,
    /short/,
    /int/,
    /long/,
    /float/,
    /double/,
    /boolean/,
    /char/
];
Tokens.keywords = [
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

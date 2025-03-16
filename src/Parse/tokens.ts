export class Tokens {
    static readonly accessibilityModifiers: RegExp[] = [
        /public/,
        /protected/,
        /private/
    ];

    static readonly loops: RegExp[] = [
        /for/,
        /while/,
        /do/
    ];

    static readonly nonAccessModifiers: RegExp[] = [
        /static/,
        /final/,
        /abstract/,
        /synchronized/,
        /volatile/,
        /transient/,
        /native/
    ];

    static readonly genericAnnotation: RegExp[] = [
        /@\w+/
    ];

    static readonly annotations: RegExp[] = [
        /@Override/,
        /@SuppressWarnings/,
        /@Deprecated/
    ];

    static readonly primitiveDataTypes: RegExp[] = [
        /byte/,
        /short/,
        /int/,
        /long/,
        /float/,
        /double/,
        /boolean/,
        /char/
    ]

    static readonly keywords: RegExp[] = [
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
    ]
}

/*
 * tokenizer
 * lexer
 * parser
 */
export const combineRegexes = (regexes: RegExp[]): string => {
  return regexes.reduce((combined, regex): string => {
    if (combined.length == 0) {
      return regex.source;
    }

    return combined + "|" + regex.source;
  }, "");
};

export const accessibilityModifiers = [/public/, /protected/, /private/];

export const inheritance = [/extends/, /implements/];

export const loops = [/for/, /while/, /do/];

export const nonAccessModifiers = [
  /static/,
  /final/,
  /abstract/,
  /synchronized/,
  /volatile/,
  /transient/,
  /native/,
];

export const genericAnnotation = [/@\w+/];

export const annotations = [
  /@Override/,
  /@SuppressWarnings/,
  /@Deprecated/,
  /@Safevarargs/,
  /@FunctionalInterface/,
];

export const primitiveDataTypes = [
  /byte/,
  /short/,
  /int/,
  /long/,
  /float/,
  /double/,
  /boolean/,
  /char/,
];

export const beginningContainers = [/</, /\(/, /{/, /\[/];

export const endingContainers = [/>/, /\)/, /}/, /\]/];

export const containers: RegExp[] =
  beginningContainers.concat(endingContainers);

export const keywords = [
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
  /while/,
];
/*
 * tokenizer
 * lexer
 * parser
 */

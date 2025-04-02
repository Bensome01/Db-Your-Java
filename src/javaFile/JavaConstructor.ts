import { TokenizedLine } from "../Parse/tokenizedLine";
import { determineParameters, findAnnotations } from "./common";

export type JavaConstructor = {
  annotations: string[];
  keywords: string[];
  className: string;
  parameters: string[];
};

/*
 * @annotations keywords className parameters {
 * guaranteed to have parameters, and className
 * may have either { or parameters;
 */
export const makeJavaConstructor = (tokens: string[]): JavaConstructor => {
  const { annotations, annotationEnd } = findAnnotations(tokens);

  const endCurlyAdjustment: number = tokens.at(-1)! === "{" ? -1 : 0;

  const parameters: string[] = determineParameters(
    tokens.at(-1 + endCurlyAdjustment)!
  );

  return {
    annotations: annotations,
    keywords: tokens.slice(annotationEnd, -2 + endCurlyAdjustment),
    className: tokens.at(-2 + endCurlyAdjustment)!,
    parameters: parameters,
  };
};

export const findConstructors = (
  file: TokenizedLine[],
  className: string
): TokenizedLine[] => {
  return file.filter((line) =>
    line.tokens.some((token) => token === className)
  );
};

export const printJavaConstructor = (constructor: JavaConstructor): void => {
  console.log("annotations: ", constructor.annotations);
  console.log("keywords: ", constructor.keywords);
  console.log("class name: ", constructor.className);
  console.log("parameters: ", constructor.parameters);
};

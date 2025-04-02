import { determineParameters, findAnnotations } from "./common";

export type JavaMethod = {
  annotations: string[];
  keywords: string[];
  returnType: string;
  methodName: string;
  parameters: string[];
};

export const makeJavaMethod = (tokens: string[]): JavaMethod => {
  const { annotations, annotationEnd } = findAnnotations(tokens);

  const endCurlyAdjustment: number = tokens.at(-1)! === "{" ? -1 : 0;

  const parameters: string[] = determineParameters(
    tokens.at(-1 + endCurlyAdjustment)!
  );

  return {
    annotations: annotations,
    keywords: tokens.slice(annotationEnd, -3 + endCurlyAdjustment),
    returnType: tokens.at(-3 + endCurlyAdjustment)!,
    methodName: tokens.at(-2 + endCurlyAdjustment)!,
    parameters: parameters,
  };
};

export const printJavaMethod = (method: JavaMethod): void => {
  console.log("annotations: ", method.annotations);
  console.log("keywords: ", method.keywords);
  console.log("return type: ", method.returnType);
  console.log("method name: ", method.methodName);
  console.log("parameters: ", method.parameters);
};

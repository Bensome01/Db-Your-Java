import { index } from "../utils";
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

  const endCurlyAdjustment = index(tokens, -1) === "{" ? -1 : 0;

  const parameters = determineParameters(
    index(tokens, -1 + endCurlyAdjustment)
  );

  return {
    annotations: annotations,
    keywords: tokens.slice(annotationEnd, -3 + endCurlyAdjustment),
    returnType: index(tokens, -3 + endCurlyAdjustment),
    methodName: index(tokens, -2 + endCurlyAdjustment),
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

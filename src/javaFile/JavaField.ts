import { index } from "../utils";
import { TokenizedLine } from "./../Parse/tokenizedLine";
import { findAnnotations } from "./common";

export type JavaField = {
  annotations: string[];
  keywords: string[];
  fieldType: string;
  fieldName: string;
  fieldValue: string;
};

export const makeJavaField = (tokens: string[]): JavaField => {
  const trimmedSemiColon = tokens.with(-1, index(tokens, -1).slice(0, -1));

  const { annotations, annotationEnd } = findAnnotations(trimmedSemiColon);

  const equalSignLocation: number = trimmedSemiColon.findIndex(
    (token) => token === "="
  );
  const declarationEnd: number =
    equalSignLocation === -1 ? trimmedSemiColon.length : equalSignLocation;

  return {
    annotations: annotations,
    keywords: trimmedSemiColon.slice(annotationEnd, declarationEnd - 2),
    fieldType: index(trimmedSemiColon, declarationEnd - 2),
    fieldName: index(trimmedSemiColon, declarationEnd - 1),
    fieldValue:
      equalSignLocation === -1
        ? ""
        : trimmedSemiColon
            .slice(equalSignLocation + 1)
            .join(" ")
            .slice(),
  };
};

export const findJavaFields = (file: TokenizedLine[]): TokenizedLine[] => {
  return file.filter(
    (line) =>
      !line.tokens.some((token) => /\(/.test(token)) ||
      line.tokens.some((token) => token === "=")
  );
};

export const printjavaField = (field: JavaField): void => {
  console.log("annotations: ", field.annotations);
  console.log("keywords: ", field.keywords);
  console.log("field type: ", field.fieldType);
  console.log("field name: ", field.fieldName);
  console.log("field value: ", field.fieldValue);
};

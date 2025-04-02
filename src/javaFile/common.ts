import { TokenizedLine } from "../Parse/tokenizedLine";
import { genericAnnotation } from "../Parse/tokens";

export const findAnnotations = (
  tokens: string[]
): { annotations: string[]; annotationEnd: number } => {
  const annotationEnd: number = tokens.findIndex(
    (token) => !genericAnnotation.some((annotation) => annotation.test(token))
  );

  const annotations: string[] = tokens.slice(0, annotationEnd);

  return {
    annotations: annotations,
    annotationEnd: annotationEnd,
  };
};

export const separateMethodFromParameter = (
  line: TokenizedLine
): TokenizedLine => {
  const methodNameLocation: number = line.tokens.findIndex((token) =>
    /\(/.test(token)
  );

  if (methodNameLocation === -1) {
    return line;
  }

  const targetToken: string = line.tokens.at(methodNameLocation)!;
  const separateLocation: number = targetToken.indexOf("(");
  const separatedTokens: string[] = [
    targetToken.slice(0, separateLocation),
    targetToken.slice(separateLocation),
  ];

  return {
    tokens: line.tokens.toSpliced(methodNameLocation, 1, ...separatedTokens),
    index: line.index,
  };
};

export const determineParameters = (parameters: string): string[] => {
  const removedParenthesis = parameters.slice(1, -1);

  if (removedParenthesis === "") {
    return [];
  }

  const splitParameters: string[] = removedParenthesis.split(/, | /);
  const reconnectedTypes: string[] = reconnectTypes(splitParameters);

  type reconnector = {
    parameters: string[];
    hasType: boolean;
  };

  const reconnectedParameters: string[] = reconnectedTypes.reduce(
    (reconnectedParameters: reconnector, token: string): reconnector => {
      const parameters = reconnectedParameters.parameters;

      if (reconnectedParameters.hasType) {
        return {
          parameters: parameters.with(-1, parameters.at(-1)! + " " + token),
          hasType: false,
        };
      }

      return {
        parameters: parameters.concat([token]),
        hasType: true,
      };
    },
    { parameters: [], hasType: false }
  ).parameters;

  return reconnectedParameters;
};

const reconnectTypes = (parameters: string[]): string[] => {
  type reconnector = {
    reconnectedParameters: string[];
    inTypeDeclaration: boolean;
  };

  return parameters.reduce(
    (connector: reconnector, token): reconnector => {
      const reconnectedParameters = connector.reconnectedParameters;

      if (connector.inTypeDeclaration) {
        return {
          reconnectedParameters: reconnectedParameters.with(
            -1,
            reconnectedParameters.at(-1)! + ", " + token
          ),
          inTypeDeclaration: !/>/.test(token),
        };
      }

      return {
        reconnectedParameters: reconnectedParameters.concat([token]),
        inTypeDeclaration: /</.test(token),
      };
    },
    { reconnectedParameters: [], inTypeDeclaration: false }
  ).reconnectedParameters;
};

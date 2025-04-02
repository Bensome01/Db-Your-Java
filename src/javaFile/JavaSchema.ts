import { TokenizedLine } from "../Parse/tokenizedLine";
import { index } from "../utils";
import { separateMethodFromParameter } from "./common";
import {
  findConstructors,
  JavaConstructor,
  makeJavaConstructor,
  printJavaConstructor,
} from "./JavaConstructor";
import {
  findJavaFields,
  JavaField,
  makeJavaField,
  printjavaField,
} from "./JavaField";
import { JavaMethod, makeJavaMethod, printJavaMethod } from "./JavaMethod";

type Range = {
  start: number;
  end: number;
};

export type JavaSchema = {
  schema: string;
  schemaName: string;
  keyWords: string[];
  parent: string;
  interfaces: string[];
  fields: JavaField[];
  constructors: JavaConstructor[];
  methods: JavaMethod[];
  nestedClasses: JavaSchema[];
};

export const makeJavaSchema = (file: TokenizedLine[]): JavaSchema => {
  const mainSchema = index(file, 0);

  const schemaName = findSchemaName(mainSchema.tokens);

  const mainSchemaContents = file.slice(1, -1);

  const nestedClassBounds = findNestedClasses(mainSchemaContents);
  const excludeNestedClassContents = excludeContentInBounds(
    mainSchemaContents,
    nestedClassBounds
  );

  const javaFields = findJavaFields(excludeNestedClassContents);
  const excludeJavaFields = excludeContentInBounds(
    excludeNestedClassContents,
    javaFields.map((line, index) => {
      return { start: index, end: index };
    })
  ).map((line) => separateMethodFromParameter(line));

  const javaConstructors = findConstructors(excludeJavaFields, schemaName);
  const excludeJavaConstructors = excludeContentInBounds(
    excludeJavaFields,
    javaConstructors.map((line, index) => {
      return { start: index, end: index };
    })
  );

  const javaMethods = excludeJavaConstructors;

  return {
    schema: mainSchema.tokens.find(
      (token) => token === "class" || token === "interface"
    )!,
    schemaName: schemaName,
    keyWords: findSchemaKeywords(mainSchema.tokens),
    parent: findParentClass(mainSchema.tokens),
    interfaces: findInterfaces(mainSchema.tokens),
    fields: javaFields.map((line) => makeJavaField(line.tokens)),
    constructors: javaConstructors.map((constructor) =>
      makeJavaConstructor(constructor.tokens)
    ),
    methods: javaMethods.map((method) => makeJavaMethod(method.tokens)),
    nestedClasses: nestedClassBounds.map((classBounds) =>
      makeJavaSchema(
        mainSchemaContents.slice(classBounds.start, classBounds.end + 1)
      )
    ),
  };
};

const findSchemaName = (tokens: string[]): string => {
  const SchemaKeywordLocation = tokens.findIndex(
    (token) => token === "class" || token === "interface"
  );
  return tokens[SchemaKeywordLocation + 1];
};

const findSchemaKeywords = (tokens: string[]): string[] => {
  const SchemaKeywordLocation = tokens.findIndex(
    (token) => token === "class" || token === "interface"
  );
  return tokens.slice(0, SchemaKeywordLocation);
};

const findParentClass = (tokens: string[]): string => {
  const extendsLocation = tokens.findIndex((token) => token === "extends");

  if (extendsLocation == -1) {
    return "";
  }
  return tokens[extendsLocation + 1];
};

const findInterfaces = (tokens: string[]): string[] => {
  const implementsLocation = tokens.findIndex(
    (token) => token === "implements"
  );

  if (implementsLocation === -1) {
    return [];
  }

  const interfaces = tokens
    .slice(implementsLocation + 1, -1)
    .map((implemented) => {
      if (implemented.at(-1) === ",") {
        return implemented.slice(-1);
      }
      return implemented;
    });

  return interfaces;
};

const contentBounds = (start: number, file: TokenizedLine[]): number => {
  return file.reduce((end: number, line: TokenizedLine): number => {
    if (line.index <= end) {
      return end;
    }

    if (line.tokens.some((token) => token === "{")) {
      return contentBounds(line.index, file);
    }

    if (line.tokens.some((token) => token === "}")) {
      return line.index;
    }

    return end;
  }, start);
};

const excludeContentInBounds = (
  file: TokenizedLine[],
  contentBounds: Range[]
): TokenizedLine[] => {
  const inRangeInclusive = (range: Range, num: number): boolean => {
    return range.start <= num && num <= range.end;
  };

  return file.filter(
    (line, index) =>
      !contentBounds.some((bounds) => inRangeInclusive(bounds, index))
  );
};

const findNestedClasses = (file: TokenizedLine[]): Range[] => {
  const reIndexedFile = file.map((line, index): TokenizedLine => {
    return { tokens: line.tokens, index: index };
  });

  const nestedClassBounds = reIndexedFile.reduce(
    (
      boundsFinder: { classBounds: Range[]; classDepth: number },
      line
    ): { classBounds: Range[]; classDepth: number } => {
      const isClassDeclaration = line.tokens.some((token) => token === "class");
      const isClassCloser = line.tokens.every((token) => token === "}");

      let classDepth = boundsFinder.classDepth;
      if (isClassDeclaration) {
        classDepth++;
      } else if (isClassCloser) {
        classDepth--;
      }

      var classBounds;
      if (isClassDeclaration) {
        classBounds = boundsFinder.classBounds.concat([
          { start: line.index, end: line.index },
        ]);
      } else if (isClassCloser && classDepth === 0) {
        classBounds = boundsFinder.classBounds.with(-1, {
          start: boundsFinder.classBounds.at(-1)!.start,
          end: line.index,
        });
      } else {
        classBounds = boundsFinder.classBounds;
      }

      return {
        classBounds: classBounds,
        classDepth: classDepth,
      };
    },
    { classBounds: [], classDepth: 0 }
  ).classBounds;

  return nestedClassBounds;
};

export const inheritsFrom = (schema: JavaSchema, parent: string): boolean => {
  return (
    schema.parent === parent ||
    schema.interfaces.some((implement) => implement === parent)
  );
};

export const printJavaSchema = (schema: JavaSchema): void => {
  console.log("schema: ", schema.schema);
  console.log("schema name: ", schema.schemaName);
  console.log("keywords: ", schema.keyWords);
  console.log("parent: ", schema.parent);
  console.log("interfaces: ", schema.interfaces);
  console.log("fields");
  schema.fields.forEach((field) => printjavaField(field));
  console.log("constructors");
  schema.constructors.forEach((constructor) =>
    printJavaConstructor(constructor)
  );
  console.log("methods");
  schema.methods.forEach((method) => printJavaMethod(method));
  console.log("nested classes");
  schema.nestedClasses.forEach((nestedClass) => {
    console.log("nested class");
    printJavaSchema(nestedClass);
  });
  console.log("End of schema", schema.schemaName);
};

// schemaName: string;
// keyWords: string[];
// parent: string;
// interfaces: string[];
// fields: JavaField[];
// constructors: JavaConstructor[];
// methods: JavaMethod[];
// nestedClasses: JavaSchema[];

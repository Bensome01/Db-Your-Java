import { stripFileFromPath } from "../Parse/converter";
import { TokenizedLine } from "../Parse/tokenizedLine";
import { makeJavaSchema, JavaSchema, printJavaSchema } from "./JavaSchema";

const findFileName = (filePath: string): string => {
  const components: string[] = filePath.split("/");
  return components.at(-1)!.slice(0, -5);
};

export type JavaFile = {
  fileName: string;
  package: string;
  imports: string[];
  fileClass: JavaSchema;
};

export const makeJavaFile = (filePath: string): JavaFile => {
  const tokenizedFile: TokenizedLine[] = stripFileFromPath(filePath);

  return {
    fileName: findFileName(filePath),
    package: tokenizedFile
      .find((line) => line.tokens.at(0) === "package")!
      .tokens.at(-1)!
      .slice(0, -1),
    imports: tokenizedFile
      .filter((line) => line.tokens.at(0) === "import")
      .map((line) => line.tokens.at(-1)!.slice(0, -1)),
    fileClass: makeJavaSchema(
      tokenizedFile.filter(
        (line) =>
          line.tokens.at(0)! !== "import" && line.tokens.at(0)! !== "package"
      )
    ),
  };
};

export const getFullyQualifiedName = (file: JavaFile): string => {
  return file.package + "." + file.fileName;
};

export const printJavaFile = (file: JavaFile): void => {
  console.log("file name: ", file.fileName);
  console.log("package: ", file.package);
  console.log("imports: ", file.imports);
  console.log("JavaSchema");
  printJavaSchema(file.fileClass);
};

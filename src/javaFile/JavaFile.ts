import { connectLines, stripFileFromPath, stripFileLines } from "../Parse/converter";
import { TokenizedLine, tokenizeLine } from "../Parse/tokenizedLine";
import { accessibilityModifiers, annotations, inheritance } from "../Parse/tokens";
import { makeJavaSchema, JavaSchema } from "./JavaSchema"

const findFileName = (filePath: string): string => {
    const components: string[] = filePath.split('/');
    return components.at(-1)!.slice(0, -5);
};

export type JavaFile = {
    fileName: string;
    package: string;
    imports: string[];
    fileClass: JavaSchema;
};

export const makeJavaFile = (filePath: string): JavaFile => {
    const whiteList: RegExp[] = accessibilityModifiers
        .concat(inheritance)
        .concat([/import/, /package/, /{/, /}/]);

    const strippedFile: string[] = stripFileFromPath(filePath, whiteList);
    const connectedFile: string[] = connectLines(strippedFile, [/{/, /;/]);
    const tokenizedFile: TokenizedLine[] = connectedFile
        .map((line, index): TokenizedLine => tokenizeLine(line, index));

    return {
        fileName: findFileName(filePath),
        package: tokenizedFile
            .find(line => line.tokens.at(0) === "package")!
            .tokens.at(-1)!
            .slice(0, -1),
        imports: tokenizedFile
            .filter(line => line.tokens.at(0))
            .map(line => line.tokens.at(-1)!.slice(0, -1)),
        fileClass: makeJavaSchema(tokenizedFile
            .filter(line => line.tokens.at(0)! !== "import" && line.tokens.at(0)! !== "package"))
    };
};

export const getFullyQualifiedName = (file: JavaFile): string => {
    return file.package + "." + file.fileName;
}

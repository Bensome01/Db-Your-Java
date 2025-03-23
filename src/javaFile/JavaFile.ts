import { connectLines, stripFileFromPath, stripFileLines } from "../Parse/converter";
import { accessibilityModifiers, annotations, inheritance } from "../Parse/tokens";
import { makeJavaSchema, JavaSchema } from "./JavaSchema"

const findFileName = (filePath: string): string => {
    const components: string[] = filePath.split('/');
    return components.at(-1)!.slice(-5);
};

export type JavaFile = {
    package: string;
    imports: string[];
    fileName: string;
    fileClass: JavaSchema;
};

export const makeJavaFile = (filePath: string) => {
    const whiteList: RegExp[] = accessibilityModifiers
        .concat(annotations)
        .concat(inheritance)
        .concat([/import/, /package/, /{/, /}/]);

    const strippedFile: string[] = stripFileFromPath(filePath, whiteList);
    const connectedFile: string[] = connectLines(strippedFile, [/{/, /;/])

    return {
        package: stripFileLines(connectedFile, [/package/]),
        imports: connectedFile.filter(line => /import/.test(line)),
        fileName: findFileName(filePath),
        fileClass: makeJavaSchema(connectedFile)
    };
};

export const getFullyQualifiedName = (file: JavaFile): string => {
    return file.package + file.fileName;
}

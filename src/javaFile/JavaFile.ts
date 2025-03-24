import { connectLines, stripFileFromPath, stripFileLines } from "../Parse/converter";
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
    const connectedFile: string[] = connectLines(strippedFile, [/{/, /;/])

    return {
        fileName: findFileName(filePath),
        package: stripFileLines(connectedFile, [/package/])[0].slice(0, -1),
        imports: connectedFile.filter(line => /import/.test(line))
            .map(line => line.slice(0, -1)),
        fileClass: makeJavaSchema(connectedFile)
    };
};

export const getFullyQualifiedName = (file: JavaFile): string => {
    return file.package + "." + file.fileName;
}

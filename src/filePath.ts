import { readdirSync } from "node:fs";

export const findAllFilePaths = (filePath: string): string[] => {
    const folderContents = readdirSync(filePath, { withFileTypes: true });

    const filePaths: string[] = folderContents.flatMap(content => {
        if (content.isDirectory())
        {
            return findAllFilePaths(filePath + content.name + "/");
        }
        return filePath + content.name;
    });

    return filePaths;
}
import { readdirSync } from "node:fs";

export function FindAllFilePaths(filePath: string): string[]
{
    const folderContents = readdirSync(filePath, { withFileTypes: true });

    const filePaths: string[] = folderContents.flatMap(content => {
        if (content.isDirectory())
        {
            return FindAllFilePaths(filePath + content.name + "/");
        }
        return filePath + content.name;
    });

    return filePaths;
}
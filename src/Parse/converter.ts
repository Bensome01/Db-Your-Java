import { readFileSync } from "node:fs";

export function StripFile(filePath: string, whiteList: RegExp[]): string[]
{
    const rawFile: string = readFileSync(filePath, 'utf8');

    const lines: string[] = rawFile
        .split('\n')
        .filter((line) => whiteList.some(regExp => regExp.test(line)));

    return lines;
}

/*
 * intake file
 * convert to text
 * regex
 * return result
 */
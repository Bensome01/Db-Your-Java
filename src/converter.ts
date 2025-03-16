import { readFileSync } from "node:fs";

const whiteList = [
    /.*public .*/,
    /.*private .*/,
    /.*protected .*/,
    /.*extends .*/,
    /.*implements .*/,
    /.*import .*/,
    /.*@\w+.*/
];

export function ConvertFile(filePath: string): string[]
{
    const rawFile: string = readFileSync(filePath, 'utf8');

    return StripFile(rawFile, whiteList);
}

function StripFile(file: string, whiteList: RegExp[]): string[]
{
    const lines: string[] = file
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
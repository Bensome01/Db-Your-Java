export const stringHas = (str: string, tests: RegExp[]): boolean => {
    return tests.some(test => test.test(str));
}

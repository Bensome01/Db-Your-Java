/**
 * uses Array.prototype.at() but throws an error when undefined
 */
export const index = <T>(arr: T[], index: number): T => {
  const element = arr.at(index);

  if (element === undefined) {
    throw new Error("index out of bounds");
  }

  return element;
};

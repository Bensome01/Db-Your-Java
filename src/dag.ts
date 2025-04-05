import { JavaFile } from "./javaFile/JavaFile";
import { inheritsFrom } from "./javaFile/JavaSchema";

export type DagHead = {
  roots: DagNode[];
};

type DagNode = {
  node: JavaFile;
  children: DagNode[];
};

export const makeDagHead = (): DagHead => {
  return { roots: [] };
};

const makeDagNode = (file: JavaFile): DagNode => {
  return { node: file, children: [] };
};

/**
 * adds a JavaFile to the DAG. Assumes that all necessary parents are in the DAG
 */
export const addToDag = (file: JavaFile, dag: DagHead): void => {
  const fileClass = file.fileClass;
  const extensions =
    fileClass.parent === ""
      ? fileClass.interfaces
      : fileClass.interfaces.concat([fileClass.parent]);

  if (extensions.length === 0) {
    dag.roots.push(makeDagNode(file));
    return;
  }

  const parentNodes = extensions.map((extension) => searchDag(extension, dag));

  if (parentNodes.some((node) => node === undefined)) {
    throw new Error("DAG does not contain all necessary parent nodes");
  }

  const fileNode = makeDagNode(file);
  parentNodes.forEach((parent) => parent!.children.push(fileNode));
};

export const dagContains = (fileName: string, dag: DagHead): boolean => {
  return searchDag(fileName, dag) !== undefined;
};

const searchDag = (fileName: string, dag: DagHead): DagNode | undefined => {
  return undefined;
};

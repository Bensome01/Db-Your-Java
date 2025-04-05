import { JavaFile } from "./javaFile/JavaFile";
import { inheritsFrom } from "./javaFile/JavaSchema";

export type DagHead = {
  roots: DagNode[];
};

type DagNode = {
  node: JavaFile;
  children: DagNode[];
};

export const makeDag = (file: JavaFile): DagNode => {
  return { node: file, children: [] };
};

export const addToDag = (file: JavaFile, dag: DagHead): DagNode | undefined => {
  const fileClass = file.fileClass;
  const extensions =
    fileClass.parent === ""
      ? fileClass.interfaces
      : fileClass.interfaces.concat([fileClass.parent]);

  const parent = searchDag(file.fileName, dag);

  parent?.children.push(makeDag(file));

  return parent;
};

export const dagContains = (fileName: string, dag: DagHead): boolean => {
  return searchDag(fileName, dag) !== undefined;
};

const combineDag = (
  head1: DagHead,
  head2: DagHead,
  combinationNode: DagNode
): DagHead => {
  return { roots: [] };
};

const searchDag = (fileName: string, dag: DagHead): DagNode | undefined => {
  return undefined;
};

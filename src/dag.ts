import { JavaFile } from "./javaFile/JavaFile";
import { inheritsFrom, JavaSchema } from "./javaFile/JavaSchema";

export type Dag<T> = {
  nodes: HashMap<DagNode<T>>;
  roots: HashMap<string>;
  comparer: Compare<T>;
  getKey: GetKey<T>;
};

type Compare<T> = (item1: T, item2: T) => boolean;
type GetKey<T> = (item: T) => string;

type DagNode<T> = {
  value: T;
  key: string;
  children: HashMap<DagNode<T>>;
};

type HashMap<T> = Record<string, T>;

export const makeDag = <T>(
  nodes: HashMap<DagNode<T>>,
  roots: HashMap<string>,
  comparer: Compare<T>,
  GetKey: GetKey<T> = String
): Dag<T> => {
  return {
    nodes: nodes,
    roots: roots,
    comparer: comparer,
    getKey: GetKey,
  };
};

const makeDagNode = <T>(
  item: T,
  key: string,
  children?: HashMap<DagNode<T>>
): DagNode<T> => {
  return {
    value: item,
    key: key,
    children: children === undefined ? {} : children,
  };
};

/**
 * Adds the item to the DAG.
 * @param dag The DAG to add the item to
 * @param childList must be an adjacency list such that key (parent) -> values (children)
 * @param item The item to add
 */
export const addToDag = <T>(
  dag: Dag<T>,
  childList: Record<string, T[]>,
  item: T
): void => {
  const nodeKey = dag.getKey(item);
  if (dag.nodes[nodeKey] !== undefined) {
    return;
  }

  //add all children
  childList[nodeKey].forEach((child) => addToDag(dag, childList, child));

  //put children in HashMap
  const children: HashMap<DagNode<T>> = {};

  childList[nodeKey].forEach((child) => {
    const childKey = dag.getKey(child);
    children[childKey] = dag.nodes[childKey];

    if (dag.roots[childKey] !== undefined) {
      delete dag.roots[childKey];
    }
  });

  //add node
  const node = makeDagNode(item, nodeKey, children);

  dag.roots[nodeKey] = nodeKey;
  dag.nodes[nodeKey] = node;
};

/**
 * unimplemented
 */
export const createTopologicalArray = <T>(dag: Dag<T>): T[] => {
  const stack: T[] = [];

  return stack;
};

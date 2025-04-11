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
 * Requires valid reverse ordering of items for insertion
 * @param item The item to add
 * @param dag The DAG to add the item to
 */
//change to require strict ordering so that it can gain efficiency
//consider void implementation instead
export const addToDag = <T>(item: T, dag: Dag<T>): Dag<T> => {
  const id = dag.getKey(item);

  if (dag.nodes[id] !== undefined) {
    throw new Error(`item ${id} is already in the DAG`);
  }

  const originalRoots = Object.values(dag.roots);
  const keptRoots = originalRoots.filter(
    (root) => !dag.comparer(item, dag.nodes[root].value)
  );
  const roots =
    keptRoots.length !== originalRoots.length || originalRoots.length === 0
      ? keptRoots.concat([id]).reduce((set, root): HashMap<string> => {
          return { ...set, root };
        }, {})
      : keptRoots.reduce((set, root): HashMap<string> => {
          return { ...set, root };
        }, {});

  const node = makeDagNode(item, id);

  return makeDag(dag.nodes, roots, dag.comparer, dag.getKey);
};

/**
 * unimplemented
 */
const findLeaves = <T>(dag: Dag<T>): DagNode<T>[] => {
  return [];
};

/**
 * unimplemented
 */
const searchDag = <T>(
  className: string,
  dag: Dag<T>
): DagNode<T> | undefined => {
  return undefined;
};

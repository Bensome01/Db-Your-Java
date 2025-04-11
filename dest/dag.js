"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToDag = exports.makeDag = void 0;
const makeDag = (nodes, roots, comparer, GetKey = String) => {
    return {
        nodes: nodes,
        roots: roots,
        comparer: comparer,
        getKey: GetKey,
    };
};
exports.makeDag = makeDag;
const makeDagNode = (item, key, children) => {
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
const addToDag = (item, dag) => {
    const id = dag.getKey(item);
    if (dag.nodes[id] !== undefined) {
        throw new Error(`item ${id} is already in the DAG`);
    }
    const originalRoots = Object.values(dag.roots);
    const keptRoots = originalRoots.filter((root) => !dag.comparer(item, dag.nodes[root].value));
    const roots = keptRoots.length !== originalRoots.length || originalRoots.length === 0
        ? keptRoots.concat([id]).reduce((set, root) => {
            return { ...set, root };
        }, {})
        : keptRoots.reduce((set, root) => {
            return { ...set, root };
        }, {});
    const node = makeDagNode(item, id);
    return (0, exports.makeDag)(dag.nodes, roots, dag.comparer, dag.getKey);
};
exports.addToDag = addToDag;
/**
 * unimplemented
 */
const findLeaves = (dag) => {
    return [];
};
/**
 * unimplemented
 */
const searchDag = (className, dag) => {
    return undefined;
};

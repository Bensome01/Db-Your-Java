"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dagContains = exports.addToDag = exports.makeDagHead = void 0;
const makeDagHead = () => {
    return { roots: [] };
};
exports.makeDagHead = makeDagHead;
const makeDagNode = (file) => {
    return { node: file, children: [] };
};
/**
 * adds a JavaFile to the DAG. Assumes that all necessary parents are in the DAG
 */
const addToDag = (file, dag) => {
    const fileClass = file.fileClass;
    const extensions = fileClass.parent === ""
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
    parentNodes.forEach((parent) => parent.children.push(fileNode));
};
exports.addToDag = addToDag;
const dagContains = (fileName, dag) => {
    return searchDag(fileName, dag) !== undefined;
};
exports.dagContains = dagContains;
const searchDag = (fileName, dag) => {
    return undefined;
};

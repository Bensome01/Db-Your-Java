"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dagContains = exports.addToDag = exports.makeDag = void 0;
const makeDag = (file) => {
    return { node: file, children: [] };
};
exports.makeDag = makeDag;
const addToDag = (file, dag) => {
    const fileClass = file.fileClass;
    const extensions = fileClass.parent === ""
        ? fileClass.interfaces
        : fileClass.interfaces.concat([fileClass.parent]);
    const parent = searchDag(file.fileName, dag);
    parent?.children.push((0, exports.makeDag)(file));
    return parent;
};
exports.addToDag = addToDag;
const dagContains = (fileName, dag) => {
    return searchDag(fileName, dag) !== undefined;
};
exports.dagContains = dagContains;
const combineDag = (head1, head2, combinationNode) => {
    return { roots: [] };
};
const searchDag = (fileName, dag) => {
    return undefined;
};

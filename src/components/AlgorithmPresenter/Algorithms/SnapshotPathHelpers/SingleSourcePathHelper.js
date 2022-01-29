export default class SingleSourcePathHelper {
    constructor(initialNodeId, paths = null, distances = null) {
        this.initialNodeId = initialNodeId;
        this.paths = paths ? paths : new Map().set(initialNodeId, []);
        this.distances = distances ? distances : new Map().set(initialNodeId, 0);
    }

    containsPathTo = (targetId) => this.paths.has(targetId);
    containsNode = (nodeId) => this.nodeIds().has(nodeId);
    containsEdge = (edgeId) => this.edgeIds().has(edgeId);

    initialNode = () => this.initialNode;

    addPathTo = (targetId, edges) => {
        this.paths.set(targetId, edges);
        this.distances.set(targetId, edges.reduce(e => e.weight, 0));
    }
    addPathUsingParent = (parentId, targetId, edge) => {
        const { weight } = edge;

        const parentDistance = this.distances.get(parentId);
        const parentPath = this.paths.get(parentId);

        this.paths.set(targetId, [...parentPath, edge]);
        this.distances.set(targetId, parentDistance + weight);
    }

    pathTo = targetId => this.paths.get(targetId);

    distanceTo = (targetId) => this.distances.has(targetId) ? this.distances.get(targetId) : Number.POSITIVE_INFINITY;
    distances = () => this.distances;

    nodeIds = () => {
        const nodeIds = new Set();

        for (const [target, ] of this.paths.entries()) {
            this.nodesInPathTo(target).forEach(n => nodeIds.add(n));
        }

        return nodeIds;
    }
    edgeIds = () => {
        const edgeIds = new Set();

        for (const [, edges] of this.paths.entries()) {
            edges.map(e => e.id).forEach(e => edgeIds.add(e));
        }

        return edgeIds;
    }

    nodesInPathTo = (targetId) => {
        const nodes = [this.initialNodeId];
        const path = this.paths.get(targetId);

        for (const { target } of path) {
            nodes.push(target);
        }

        return nodes;
    }
    edgesInPathTo = (targetId) => {
        return this.paths.get(targetId);
    }

    clone = () => {
        const pathEntries = [];
        for (const [target, path] of this.paths.entries()) {
            pathEntries.push([target, [...path]])
        }
        const distances = this.distances.entries();
        const initialNode = this.initialNodeId;

        return new SingleSourcePathHelper(initialNode, new Map(pathEntries), new Map(distances));
    }
}
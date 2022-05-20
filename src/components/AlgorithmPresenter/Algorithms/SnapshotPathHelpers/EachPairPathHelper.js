import SingleSourcePathHelper from "./SingleSourcePathHelper";

export default class EachPairPathHelper {
    constructor() {
        this.paths = new Map();
    }

    from = sourceNode => {
        const { paths } = this;
        if (!paths.has(sourceNode)) {
            paths.set(
                sourceNode,
                new SingleSourcePathHelper(sourceNode));
        }

        return paths.get(sourceNode);
    };

    addPathWithIntermediate = (sourceId, intermediateId, targetId) => {
        const sourceToIntermediate = this.from(sourceId).edgesInPathTo(intermediateId);
        const intermediateToTarget = this.from(intermediateId).edgesInPathTo(targetId);

        this.from(sourceId).addPathTo(targetId, [...sourceToIntermediate, ...intermediateToTarget]);
    }

    clone = () => {
        const paths = new Map();
        for (const [source, pathHelper] of this.paths) {
            paths.set(source, pathHelper.clone());
        }

        const pathHelper = new EachPairPathHelper();
        pathHelper.paths = paths;

        return pathHelper;
    };
}
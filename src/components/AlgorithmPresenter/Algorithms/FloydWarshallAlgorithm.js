import EachPairEnchancer from "./Enchancers/EachPairEnchancer";
import FloydWarshallEnchancer from "./Enchancers/FloydWarshallEnchancer";
import EachPairPathHelper from "./SnapshotPathHelpers/EachPairPathHelper";

const alg = graph => {
    const snapshotList = [];
    const helper = new EachPairPathHelper();

    for (const edge of graph.getEdges()) {
        const { id, source, target, weight } = edge.get('model');

        helper.from(source).addPathTo(target, [{
            id, source, target, weight
        }]);
    }

    snapshotList.push({ helper: helper.clone() });

    for (const intermediate of graph.getNodes()) {
        for (const source of graph.getNodes()) {
            for (const target of graph.getNodes()) {
                const { id: sourceId } = source.get('model');
                const { id: targetId } = target.get('model');
                const { id: intermediateId } = intermediate.get('model');

                const directDistance = helper.from(sourceId).distanceTo(targetId);
                const distanceThroughIntermediate =
                    helper.from(sourceId).distanceTo(intermediateId)
                    + helper.from(intermediateId).distanceTo(targetId)

                if (distanceThroughIntermediate < directDistance) {
                    helper.addPathWithIntermediate(sourceId, intermediateId, targetId);
                }

                snapshotList.push({
                    helper: helper.clone(),
                    source,
                    target,
                    intermediate
                })
            }
        }
    }

    console.log(helper);

    return snapshotList;
};

const Enchancer = ({ snapshot }) => {
    return (
        <>
            <EachPairEnchancer snapshot={snapshot} />
            <FloydWarshallEnchancer snapshot={snapshot} />
        </>
    );
};

const FloydWarshallAlgorithm = () => ({ graph }) => ({
    snapshotList: alg(graph),
    enchancer: Enchancer
});

export default FloydWarshallAlgorithm;
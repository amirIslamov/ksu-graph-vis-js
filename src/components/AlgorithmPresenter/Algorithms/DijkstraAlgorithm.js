import PriorityQueue from "algorithms/data_structures/priority_queue";
import SingleSourcePathHelper from "./SnapshotPathHelpers/SingleSourcePathHelper";
import SingleSourceEnchancer from "./Enchancers/SingleSourceEnchancer";
import DijkstraEnchancer from "./Enchancers/DijkstraEnchancer";

const alg = (initialNode, graph) => {
    const snapshotList = [];

    const distances = new Map(
        graph.getNodes().map(n => [n.get('model').id, Number.POSITIVE_INFINITY])
    ).set(initialNode, 0);
    
    const helper = new SingleSourcePathHelper(initialNode);

    snapshotList.push({ helper: helper.clone() })

    const { addPathUsingParent } = helper;

    const frontier = new PriorityQueue();
    for (const [node, d] of distances.entries()) {
        frontier.insert(node, d)
    }

    while (!frontier.isEmpty()) {
        const current = frontier.extract();

        for (const edge of graph.findById(current).getOutEdges()) {
            const { id, source, target, weight } = edge.get('model');

            const relaxedDistance = Math.min(
                distances.get(target),
                distances.get(source) + weight
            );
            
            if (relaxedDistance < distances.get(target)) {
                addPathUsingParent(source, target, { 
                    id,
                    source,
                    target,
                    weight 
                })

                distances.set(target, relaxedDistance);
                frontier.changePriority(target, relaxedDistance);
            }

            snapshotList.push({ 
                helper: helper.clone(),
                current, 
                relaxingNeighbour: target,
                relaxingEdge: id
            })
        }
    }

    return snapshotList;
}

const Enchancer = ({ snapshot }) => {
    return (
        <>
            <SingleSourceEnchancer snapshot={snapshot} />
            <DijkstraEnchancer snapshot={snapshot} />
        </>
    );
}

const DijkstraAlgorithm = ({ initialNode }) => ({ graph }) => ({
    snapshotList: alg(initialNode, graph),
    enchancer: Enchancer
});

export default DijkstraAlgorithm;

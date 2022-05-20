import BellmanFordEnchancer from "./Enchancers/BellmanFordEnchancer";
import SingleSourceEnchancer from "./Enchancers/SingleSourceEnchancer";
import SingleSourcePathHelper from "./SnapshotPathHelpers/SingleSourcePathHelper";
import * as _ from 'lodash';

const alg = (initialNode, graph) => {
    const snapshotList = [];
    const nodes = graph.getNodes();
    const edges = graph.getEdges();

    const A = new Map(
        nodes.map(n => [n.get('model').id, edges.map(_ => Number.POSITIVE_INFINITY)])
    );
    A.get(initialNode)[0] = 0;

    const helper = new SingleSourcePathHelper(initialNode);

    snapshotList.push({ helper: helper.clone() });

    const { addPathUsingParent } = helper;

    for (let i = 1; i < nodes.length; i++) {
        for (const edge of graph.getEdges()) {
            const { id, source, target, weight } = edge.get('model');

            if (A.get(target)[i] > A.get(source)[i - 1] + weight) {
                A.get(target)[i] = A.get(source)[i - 1] + weight;
                addPathUsingParent(source, target, {
                    id, source, target, weight
                });
            }

            snapshotList.push({ helper: helper.clone() });
        }
        
    }

    return snapshotList;
}

const Enchancer = ({ snapshot }) => {
    return (
        <>
            <SingleSourceEnchancer snapshot={snapshot} />
            <BellmanFordEnchancer snapshot={snapshot} />
        </>
    );
}

const BellmanFordAlgorithm = ({ initialNode }) => ({ graph }) => ({
    snapshotList: alg(initialNode, graph),
    enchancer: Enchancer
});

export default BellmanFordAlgorithm;
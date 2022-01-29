import { GraphinContext } from "@antv/graphin";
import { useContext, useEffect } from "react";

const nodeStyles = {
    default: {
        fill: 'gray',
        stroke: 'gray',
        fillOpacity: 0.1
    },
    inTree: {
        fill: 'blue',
        stroke: 'blue',
        fillOpacity: 0.1
    }
}

const edgeStyles = {
    default: {
        stroke: 'gray'
    },
    inTree: {
        stroke: 'blue',
    },
}

const SingleSourceEnchancer = ({ snapshot }) => {
    const { graph } = useContext(GraphinContext);
    const { helper } = snapshot;

    const { containsEdge, containsNode, distanceTo } = helper;

    const nodes = graph.getNodes();
    const edges = graph.getEdges();

    const styleDefault = () => {
        nodes.forEach(n => {
            graph.update(n, { style: { keyshape: nodeStyles.default } })
        })

        edges.forEach(e => {
            graph.update(e, { style: { keyshape: edgeStyles.default } })
        })
    }

    const highlightTree = () => {
        nodes.forEach(n => {
            const id = n.get('model').id;
            if (containsNode(id)) {
                graph.update(n, { style: { keyshape: nodeStyles.inTree } })
            }
        })

        edges.forEach(e => {
            const id = e.get('model').id;
            if (containsEdge(id)) {
                graph.update(e, { style: { keyshape: edgeStyles.inTree } })
            }
        })
    };

    const showDistances = () => {
        nodes.forEach(n => {
            const id = n.get('model').id;
            graph.update(n, { 
                style: { 
                    label: { 
                        value: String(distanceTo(id)) 
                    } 
                } 
            });
        })
    }

    useEffect(() => {
        styleDefault();
        highlightTree();
        showDistances();
    })

    return null;
}

export default SingleSourceEnchancer;
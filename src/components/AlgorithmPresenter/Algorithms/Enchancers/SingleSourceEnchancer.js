import {GraphinContext} from "@antv/graphin";
import { useContext, useEffect } from "react";
import * as lodash from "lodash";


const NodeState = {
    Root: 'Root',
    InTree: 'InTree',
    NotInTree: 'NotInTree'
}

const EdgeState = {
    InTree: 'InTree',
    NotInTree: 'NotInTree'
}

const nodeStateStyles = {
    [NodeState.InTree]: {
        keyshape: {
            fill: 'blue',
            stroke: 'blue',
            fillOpacity: 0.1
        }
    },
    [NodeState.NotInTree]: {
        keyshape: {
            fill: 'gray',
            stroke: 'gray',
            fillOpacity: 0.1
        }
    }
};

const edgeStateStyles = {
    [EdgeState.InTree]: {
        keyshape: {
            stroke: 'blue'
        },
    },
    [EdgeState.NotInTree]: {
        keyshape: {
            stroke: 'gray',
        }
    }
};

const configureStateStyles = lodash.once(graph => {
    graph.node(() => ({
        stateStyles: {
            ...nodeStateStyles
        }
    }));
    graph.edge(() => ({
        stateStyles: {
            ...edgeStateStyles
        }
    }));

    graph.render();
});

const SingleSourceEnchancer = ({ snapshot }) => {
    const { graph } = useContext(GraphinContext);
    const { helper } = snapshot;

    const { nodeIds, edgeIds } = helper;

    configureStateStyles(graph);

    console.log(graph.getNodes().map(n => n.getCurrentStatesStyle()));

    const styleDefault = () => {
        const edges = new Set(edgeIds());
        const nodes = new Set(nodeIds());

        graph.getEdges().filter(e => !edges.has(e.getID())).forEach(e => {
            graph.priorityState(e, EdgeState.NotInTree);
        });
        graph.getNodes().filter(n => !nodes.has(n.getID())).forEach(n => {
            graph.priorityState(n, NodeState.NotInTree);
        });
    }

    const highlightTree = () => {
        const edges = new Set(edgeIds());
        const nodes = new Set(nodeIds());

        graph.getEdges().filter(e => edges.has(e.getID())).forEach(e => {
            graph.priorityState(e, EdgeState.NotInTree);
        });
        graph.getNodes().filter(n => nodes.has(n.getID())).forEach(n => {
            graph.priorityState(n, NodeState.NotInTree);
        });
    };

    const clearStates = () => {
        graph.getEdges().forEach(e => {
            e.clearStates()
        });
        graph.getNodes().forEach(n => {
            n.clearStates()
        });
    };

    useEffect(() => {
        clearStates();
        styleDefault();
        highlightTree();
    })

    return null;
}

export default SingleSourceEnchancer;
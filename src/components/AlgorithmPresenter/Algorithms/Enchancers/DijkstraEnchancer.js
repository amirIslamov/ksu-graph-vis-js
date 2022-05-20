import { GraphinContext } from "@antv/graphin";
import { useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import * as lodash from "lodash";

const NodeState = {
    Current: 'Current',
}

const nodeStateStyles = {
    [NodeState.InTree]: {
        keyshape: {
            fill: 'blue',
            stroke: 'blue',
            fillOpacity: 0.1
        }
    }
};

const configureStateStyles = lodash.once(graph => {
    graph.node(n => ({
        ...n,
        stateStyles: {
            ...n.stateStyles,
            ...nodeStateStyles
        }
    }));
});

const DijkstraEnchancer = ({ snapshot }) => {
    const { graph } = useContext(GraphinContext);
    const { current } = snapshot;

    configureStateStyles(graph);

    useEffect(() => {
        const item = graph.findById(current);
        if (!item) return () => {};

        graph.setItemState(item, NodeState.Current, true);
        return () => { graph.setItemState(item, NodeState.Current, false) }
    });

    return null;
}

export default DijkstraEnchancer;
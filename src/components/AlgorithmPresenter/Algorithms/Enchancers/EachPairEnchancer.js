import {useContext, useEffect, useMemo, useState} from "react";
import {GraphinContext} from "@antv/graphin";
import {match, select} from "ts-pattern";
import _ from 'lodash';

const EnchancerState = {
    Idle: 'Idle',
    NodeHover: 'NodeHover',
};

const idle = () =>
    ({ state: EnchancerState.Idle });
const hovered = nodeId =>
    ({ state: EnchancerState.NodeHover, nodeId });

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
    [NodeState.Root]: {
        fill: 'purple',
        stroke: 'blue',
        fillOpacity: 0.1
    },
    [NodeState.InTree]: {
        fill: 'blue',
        stroke: 'blue',
        fillOpacity: 0.1
    },
    [NodeState.NotInTree]: {
        fill: 'gray',
        stroke: 'gray',
        fillOpacity: 0.1
    }
};

const edgeStateStyles = {
    [EdgeState.InTree]: {
        stroke: 'blue',
    },
    [EdgeState.NotInTree]: {
        stroke: 'gray',
    }
};

const EachPairEnchancer = ({ snapshot }) => {
    const { graph } = useContext(GraphinContext);
    const [state, setState] = useState(idle());
    const setStateStyles = useMemo(() => _.once(() => {
        graph.getNodes().forEach(n => {
            graph.updateItem(n, {
                stateStyles: nodeStateStyles
            });
        });
        graph.getEdges().forEach(e => {
            graph.updateItem(e, {
                stateStyles: edgeStateStyles
            });
        });
    }))

    useEffect(() => {
        setStateStyles();

        const onHover = evt => {
            match(state)
                .with({ state: EnchancerState.Idle }, () =>
                    setState(hovered(evt.target.id)))
                .otherwise(() => {})
        };
        const onLeave = () => {
            match(state)
                .with({ state: EnchancerState.NodeHover }, () =>
                    setState(idle()))
                .otherwise(() => {});
        };

        graph.on('node:mouseover', onHover);
        graph.on('node:mouseleave', onLeave);

        return () => {
            graph.off('node:mouseover', onHover);
            graph.off('node:mouseleave', onLeave);
        };
    });

    return (
        <>
            {
                match(state)
                    .with({ state: EnchancerState.Idle }, () => null)
                    .with({ state: EnchancerState.NodeHover, nodeId: select() }, nodeId =>
                        <HighlightTree nodeId={nodeId} snapshot={snapshot} />)
                    .run()
            }
        </>
    );
}

const HighlightTree = ({ nodeId, snapshot }) => {
    const { graph } = useContext(GraphinContext);
    const { helper } = snapshot;

    useEffect(() => {
        graph.getNodes().forEach(node => {
            const { id } = node.get('model');
            if (id === nodeId) graph.setItemState(node, NodeState.Root, true);
            if (helper.from(nodeId).containsNode(id)) {
                graph.setItemState(node, NodeState.InTree, true);
                graph.update(node, {
                    style: {
                        label: {
                            value: String(helper.from(nodeId).distanceTo(id))
                        }
                    }
                });
            }
            else graph.setItemState(node, NodeState.InTree, true);
        });
        graph.getEdges().forEach(edge => {
            const edges = new Set(helper.from(nodeId).edgeIds());
            const { id } = edge.get('model');
            if (edges.has(id)) graph.setItemState(edge, NodeState.InTree, true)
            else graph.setItemState(edge, NodeState.InTree, true);
        });

        return () => {
            graph.getNodes().forEach(node => {
                graph.setItemState(node, NodeState.InTree, false);
                graph.setItemState(node, NodeState.Root, false);
                graph.setItemState(node, NodeState.NotInTree, false);
                graph.update(node, {
                    style: {
                        label: {
                            value: String()
                        }
                    }
                });
            });
            graph.getEdges().forEach(edge => {
                graph.setItemState(edge, NodeState.InTree, false);
                graph.setItemState(edge, NodeState.NotInTree, false);
            });
        };
    });

    return null;
}

export default EachPairEnchancer;
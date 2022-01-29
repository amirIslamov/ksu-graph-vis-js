import { GraphinContext } from "@antv/graphin";
import { useContext } from "react";
import { useEffect } from "react/cjs/react.development";

const nodeStyles = {
    current: {
        fill: 'red',
        stroke: 'red',
        fillOpacity: 0.1
    },
};

const edgeStyles = {

};

const DijkstraEnchancer = ({ snapshot }) => {
    const { graph } = useContext(GraphinContext);
    const { current } = snapshot;

    const nodes = graph.getNodes();

    const highlightCurrent = () => {
        nodes.forEach(n => {
            const id = n.get('model').id;
            if (id === current) {
                graph.update(n, { style: { keyshape: nodeStyles.current } })
            }
        })
    };

    useEffect(() => {
        highlightCurrent()
    });

    return null;
}

export default DijkstraEnchancer;
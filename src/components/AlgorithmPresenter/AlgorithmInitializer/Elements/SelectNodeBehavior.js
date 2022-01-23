import { GraphinContext } from "@antv/graphin";
import { useContext } from "react";
import { useEffect } from "react/cjs/react.production.min";

const SelectNodeBehaviour = ({ onSelected }) => {
    const { graph } = useContext(GraphinContext);    

    useEffect(() => {
        const handleNodeClick = e => {
            onSelected(e.item.getID())
        };

        graph.on('node:click', handleNodeClick);

        return () => {
            graph.off('node:click', handleNodeClick);
        }
    }, [graph, onSelected])

    return null;
}

export default SelectNodeBehaviour;
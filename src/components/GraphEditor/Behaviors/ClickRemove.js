import { GraphinContext } from "@antv/graphin";
import { useContext, useEffect } from "react";

const ClickRemove = () => {
    const { graph } = useContext(GraphinContext);

    useEffect(() => {
        const handleClick = ({ item }) => {
            graph.removeItem(item);
        }

        graph.on('node:click', handleClick);
        graph.on('edge:click', handleClick);
        
        return () => {
            graph.off('node:click', handleClick);
            graph.off('edge:click', handleClick);
        };
    });

    return null;
}

export default ClickRemove;
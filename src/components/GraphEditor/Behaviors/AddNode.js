import {useContext, useEffect} from "react";
import {GraphinContext} from "@antv/graphin";
import { v4 } from "uuid";

const nodeConfigFactory = (bp) => ({
    id: v4(),
    ...bp
});

const AddNode = () => {
    const { graph } = useContext(GraphinContext);

    useEffect(() => {
        const handleCanvasClick = evt => {
            const blueprint = {
                x: evt.x,
                y: evt.y
            }

            graph.addItem('node', nodeConfigFactory(blueprint))
        };

        graph.on('canvas:click', handleCanvasClick);

        return () => {
            graph.off('canvas:click', handleCanvasClick);
        }
    });

    return null
}

export default AddNode;
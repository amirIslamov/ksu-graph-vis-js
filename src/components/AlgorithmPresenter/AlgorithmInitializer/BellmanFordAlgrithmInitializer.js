import { GraphinContext } from "@antv/graphin";
import { useContext, useEffect } from "react";
import BellmanFordAglorithm from "../Algorithms/BellmanFordAlgorithm";


const BellmanFordAlgrithmInitializer = ({ onInitialized, onCancel }) => {
    const {graph} = useContext(GraphinContext);

    useEffect(() => {
        const handleNodeClick = e => {
            onInitialized(BellmanFordAglorithm({ initialNode: e.item.getID() }))
        }

        graph.on('node:click', handleNodeClick);

        return () => graph.off('node:click', handleNodeClick);
    })

    return <div>
            <button onClick={onCancel}>Cancel</button>
            <div>Click to select node</div>
        </div>
}

export default BellmanFordAlgrithmInitializer;
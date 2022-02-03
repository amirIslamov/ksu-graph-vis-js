import { GraphinContext } from "@antv/graphin";
import { Button, Card, Modal } from "antd";
import { useContext, useEffect } from "react";
import DijkstraAlgorithm from "../Algorithms/DijkstraAlgorithm";

const DijkstraAlgorithmInitializer = ({ onInitialized, onCancel }) => {
    const {graph} = useContext(GraphinContext);

    useEffect(() => {
        const handleNodeClick = e => {
            onInitialized(DijkstraAlgorithm({ initialNode: e.item.getID() }))
        }

        graph.on('node:click', handleNodeClick);

        return () => graph.off('node:click', handleNodeClick);
    })

    return <Card
            style={{ position: 'absolute',
                    top: '100px',
                    left: '100px'}}>
                <div>Click to select node</div>
                <div>
                    <Button onClick={onCancel}>Cancel</Button>  
                </div>
            </Card>
}

export default DijkstraAlgorithmInitializer;
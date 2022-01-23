import { GraphinContext } from "@antv/graphin";
import { useContext } from "react";


const DijkstraAlgorithm = ({ initialNodeId }) => ({ snapshotManager }) => {
    const { graph } = useContext(GraphinContext);     // eslint-disable-line

    return <div>DijkstraAlgorithm</div>;
}
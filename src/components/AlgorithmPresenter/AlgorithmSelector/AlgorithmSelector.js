import { Button, Card } from "antd";
import BellmanFordAlgrithmInitializer from "../AlgorithmInitializer/BellmanFordAlgrithmInitializer";
import DijkstraAlgorithmInitializer from "../AlgorithmInitializer/DijkstraAlgrithmInitializer";
import FloydWarshallAlgrithmInitializer from "../AlgorithmInitializer/FloydWarshallAlgrithmInitializer";

const Algorithms = {
    Dijkstra: 'Dijkstra',
    BellmanFord: 'BellmanFord',
    FloydWarshall: 'FloydWarshall'
}

const initializerMap = {
    [Algorithms.Dijkstra]: DijkstraAlgorithmInitializer,
    [Algorithms.BellmanFord]: BellmanFordAlgrithmInitializer,
    [Algorithms.FloydWarshall]: FloydWarshallAlgrithmInitializer
}

const AlgorithmSelector = (props) => {
    const { onSelected } = props;
    const select = (alg) => onSelected(initializerMap[alg])

    return <Card style={{ position: 'absolute',
                           top: '100px',
                           left: '100px'}}>
        <Button onClick={() => select(Algorithms.Dijkstra)}>{Algorithms.Dijkstra}</Button>
        <Button onClick={() => select(Algorithms.FloydWarshall)}>{Algorithms.FloydWarshall}</Button>
        <Button onClick={() => select(Algorithms.BellmanFord)}>{Algorithms.BellmanFord}</Button>
    </Card>
}

export default AlgorithmSelector;
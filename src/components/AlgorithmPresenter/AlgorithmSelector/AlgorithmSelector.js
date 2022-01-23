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
    const { onSelected, onCancel } = props;
    const select = (alg) => onSelected(initializerMap[alg])

    return <div>
        <button onClick={() => select(Algorithms.Dijkstra)}>{Algorithms.Dijkstra}</button>
        <button onClick={() => select(Algorithms.FloydWarshall)}>{Algorithms.FloydWarshall}</button>
        <button onClick={() => select(Algorithms.BellmanFord)}>{Algorithms.BellmanFord}</button>
        <button onClick={onCancel}>Cancel</button>
    </div>
}

export default AlgorithmSelector;
import FloydWarshallAlgorithm from "../Algorithms/FloydWarshallAlgorithm";

const FloydWarshallAlgorithmInitializer = ({ onInitialized }) => {
    return <div>
        <div>FloydWarshallAlgorithm</div>
        <button onClick={() => onInitialized(FloydWarshallAlgorithm())}>Proceed</button>
    </div>;
}

export default FloydWarshallAlgorithmInitializer;
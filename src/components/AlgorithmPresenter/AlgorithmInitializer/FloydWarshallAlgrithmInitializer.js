import FloydWarshallAlgorithm from "../Algorithms/FloydWarshallAlgorithm";

const FloydWarshallAlgrithmInitializer = ({ onInitialized }) => {
    return <div>
        <div>FloydWarshallAlgrithm</div>
        <button onClick={onInitialized(FloydWarshallAlgorithm())}>Proceed</button>
    </div>;
}

export default FloydWarshallAlgrithmInitializer;
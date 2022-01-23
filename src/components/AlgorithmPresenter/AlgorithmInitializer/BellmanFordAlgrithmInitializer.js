import { useLayoutEffect } from "react";
import { useEffect } from "react/cjs/react.production.min";
import BellmanFordAglorithm from "../Algorithms/FloydWarshallAlgorithm";


const BellmanFordAlgrithmInitializer = ({ onInitialized }) => {
    return <div>
        <div>BellmanFordAlgrithm</div>
        <button onClick={onInitialized(BellmanFordAglorithm())}>Proceed</button>
    </div>;
}

export default BellmanFordAlgrithmInitializer;
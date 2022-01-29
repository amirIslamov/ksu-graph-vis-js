import { Minimap } from "@antv/g6-pc";
import Graphin, { Behaviors, GraphinContext } from "@antv/graphin";
import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import { match, select } from "ts-pattern";
import AlgorithmSelector from "./AlgorithmSelector/AlgorithmSelector";
import AlgorithmSnapshotList from "./AlgorithmSnapshotList";

const PresenterState = {
    Selecting: 'Selecting',
    Initializing: 'Initializing',
    Presenting: 'Presenting',
}

const selecting = () => ({ state: PresenterState.Selecting });
const initializing = (initializer) => ({ 
    state: PresenterState.Initializing,
    initializer
});
const presenting = (algorithm) => ({
    state: PresenterState.Presenting,
    algorithm
});


const AlgorithmPresenter = () => {
    const { graph } = useContext(GraphinContext);
    const [state, setState] = useState(selecting);

    const onSelected = (initializer) => setState(initializing(initializer));
    const onInitialized = (algorithm) => setState(presenting(algorithm));
    const onCancel = () => setState(selecting())
    
    return (
        <>
            <Behaviors.DragNode disabled />
            <Behaviors.ClickSelect disabled />
            <Behaviors.DragCanvas />
            {
                match(state)
                .with({ state: PresenterState.Selecting }, _ => 
                    <AlgorithmSelector 
                        onSelected={onSelected} 
                        onCancel={onCancel} />)
                .with({ state: PresenterState.Initializing, initializer: select() }, Initializer => 
                    <Initializer
                        graphData={graph.save()}
                        onInitialized={onInitialized}
                        onCancel={onCancel} />)
                .with({ state: PresenterState.Presenting, algorithm: select() }, algorithm => 
                    <AlgorithmSnapshotList algorithm={algorithm} />)
                .run()
            }
        </>
    )
}

export default AlgorithmPresenter;
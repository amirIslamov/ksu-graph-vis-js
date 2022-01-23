import Graphin from "@antv/graphin";
import { useState } from "react";
import { match, select } from "ts-pattern";
import AlgorithmSelector from "./AlgorithmSelector/AlgorithmSelector";

const PresenterState = {
    Default: 'Default',
    Selected: 'Selected',
    Initialized: 'Initialized',
    Presentring: 'Presenting'
}

const def = () => ({ state: PresenterState.Default });
const selected = (initializer) => ({ 
    state: PresenterState.Selected,
    initializer
});
const initialized = (algorithm) => ({
    state: PresenterState.Initialized,
    algorithm
});

const AlgorithmPresenter = (graphData) => {
    const [state, setState] = useState(def());

    const onSelected = (initializer) => setState(selected(initializer));
    const onInitialized = (algorithm) => setState(initialized(algorithm));
    const onCancel = () => setState(def())
    
    return <Graphin data={graphData}> 
        {
            match(state)
                .with({ state: PresenterState.Default }, _ => 
                    <AlgorithmSelector 
                        onSelected={onSelected} 
                        onCancel={onCancel} />)
                .with({ state: PresenterState.Selected, initializer: select() }, Initializer => 
                    <Initializer 
                        onInitialized={onInitialized}
                        onCancel={onCancel} />)
                .with({ state: PresenterState.Initialized, algorithm: select() }, Algorithm => 
                    <Algorithm />)
                .run()
        }
    </Graphin>
}

export default AlgorithmPresenter;
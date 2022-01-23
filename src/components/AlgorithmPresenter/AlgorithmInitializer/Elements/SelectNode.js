import { GraphinContext } from "@antv/graphin"
import { useContext, useState } from "react"
import { match, select } from "ts-pattern";
import SelectNodeBehaviour from "./SelectNodeBehavior";

const SelectNodeState = {
    Default: 'Default',
    Selecting: 'Selecting',
    Selected: 'Selected'
}

const def = () => ({ state: SelectNodeState.Default });
const selecting = () => ({ state: SelectNodeState.Selecting });
const selected = nodeId => ({ state: SelectNodeState.Selected, nodeId })

const SelectNode = ({ onSelect }) => {
    const { graph } = useContext(GraphinContext);
    const [state, setState] = useState(def());

    const onBeginSelect = () => setState(selecting());
    const onSelected = nodeId => setState(selected(nodeId));

    return <div>
        {
            match(state)
                .with({ state: SelectNodeState.Default }, _ => 
                    <div onClick={onBeginSelect}>Click to select node</div>)
                .with({ state: SelectNodeState.Selecting }, _ => 
                    <SelectNodeBehaviour onSelected={onSelected} />)
                .with({ state: SelectNodeState.Selected, nodeId: select() }, nodeId => 
                    <div>{nodeId}</div>)
                .run()
        }
    </div>
}

export default SelectNode;
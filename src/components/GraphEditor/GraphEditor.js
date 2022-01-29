import { useState } from "react";
import Graphin, { Behaviors, Utils } from "@antv/graphin";
import EditorStates from "./EditorStates";
import { match, select } from "ts-pattern";
import Toolbar from "./Toolbar";
import ShowEdgeWeights from "./Behaviors/ShowEdgeWeights";
import AddNode from "./Behaviors/AddNode";
import AddEdge from "./Behaviors/AddEdge";
import ClickRemove from "./Behaviors/ClickRemove";
import EditNode from "./Behaviors/EditNode";
import EditEdge from "./Behaviors/EditEdge";
import ContextMenu from "./ContextMenu";

const { DragCanvas, DragNode, ZoomCanvas, ClickSelect } = Behaviors;

const def = () => ({ state: EditorStates.Default });
const edit = () => ({ state: EditorStates.Edit });
const editNode = nodeId => ({ state: EditorStates.EditNode, nodeId });
const editEdge = edgeId => ({ state: EditorStates.EditEdge, edgeId });
const remove = () => ({ state: EditorStates.Remove })

const DefaultBehaviours = ({ enterEditEdge, enterEditNode }) => {
    return (
        <>
            <DragCanvas />
            <DragNode />
            <ZoomCanvas />
            <ClickSelect />
            <ContextMenu 
                enterEditEdge={enterEditEdge}
                enterEditNode={enterEditNode}
                />
        </>
    );
};
const EditBehaviours = ({ enterEditEdge, enterEditNode }) => {
    return  (
        <>
            <AddNode />
            <AddEdge />
            <ZoomCanvas />
            <ClickSelect />
            <ContextMenu 
                enterEditEdge={enterEditEdge}
                enterEditNode={enterEditNode}
                />
        </>
    );
};
const EditNodeBehaviours = ({nodeId, enterDefault}) => {
    return  (
        <>
            <EditNode 
                nodeId={nodeId}
                enterDefault={enterDefault}
                />
        </>
    );
};
const EditEdgeBehaviours = ({edgeId, enterDefault}) => {
    return  (
        <>
            <EditEdge 
                edgeId={edgeId}
                enterDefault={enterDefault}
                />
        </>
    );
};
const RemoveBehaviours = () => {
    return  (
        <>
            <ClickRemove />
            <DragCanvas />
            <DragNode />
            <ZoomCanvas />
        </>
    );
};  

const GraphEditor = () => {
    const [state, setState] = useState(def());

    const enterDefault = () => setState(def());
    const enterEdit = () => setState(edit());
    const enterRemove = () => setState(remove());
    const enterEditEdge = edgeId => setState(editEdge(edgeId));
    const enterEditNode = nodeId => setState(editNode(nodeId));

    
    return (
        <>
            {
                match(state)
                    .with({ state: EditorStates.Default }, () => 
                        <DefaultBehaviours
                            enterEditEdge={enterEditEdge}
                            enterEditNode={enterEditNode}
                            />)
                    .with({ state: EditorStates.Edit }, () => 
                        <EditBehaviours
                            enterEditEdge={enterEditEdge}
                            enterEditNode={enterEditNode}
                            />)
                    .with({ state: EditorStates.EditEdge, edgeId: select() }, id => 
                        <EditEdgeBehaviours 
                            edgeId={id}
                            enterDefault={enterDefault} 
                            />)
                    .with({ state: EditorStates.EditNode, nodeId: select() }, id => 
                        <EditNodeBehaviours 
                            nodeId={id} 
                            enterDefault={enterDefault} 
                            />)
                    .with({ state: EditorStates.Remove }, () => 
                        <RemoveBehaviours />)
                    .run()
            }

            <Toolbar 
                state={state}
                enterDefault={enterDefault}
                enterEdit={enterEdit}
                enterRemove={enterRemove}
                />
            <ShowEdgeWeights />
        </>
    );
}


export default GraphEditor;
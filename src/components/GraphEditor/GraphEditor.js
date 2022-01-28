import {useState} from "react";
import Graphin from "@antv/graphin";
import {MiniMap} from "@antv/graphin-components";
import DragCanvas from "@antv/graphin/es/behaviors/DragCanvas";
import ZoomCanvas from "@antv/graphin/es/behaviors/ZoomCanvas";
import EditNode from "./Behaviors/EditNode";
import EditEdge from "./Behaviors/EditEdge";
import DragNode from "@antv/graphin/es/behaviors/DragNode";
import ClickSelect from "@antv/graphin/es/behaviors/ClickSelect";
import AddNode from "./Behaviors/AddNode";
import AddEdge from "./Behaviors/AddEdge";
import EditorModes from "./EditorModes";
import Toolbar from "./Toolbar";

const Behaviors = {
    [EditorModes.Default]: [
        <DragNode  />,
        <ClickSelect />
    ],
    [EditorModes.Edit]: [
        <AddNode />,
        <AddEdge />,
        <ClickSelect />
    ],
    [EditorModes.EditEdge]: [
        <DragNode disabled />,
        <ClickSelect disabled />,
        <EditEdge />
    ]
}

const GraphEditor = (props) => {
    const [mode, setMode] = useState(EditorModes.Default);
    
    return <Graphin data={{}}>
        { Behaviors[mode] }

        <MiniMap visible={true} />
        <DragCanvas />
        <ZoomCanvas />
        <Toolbar mode={mode} setMode={setMode}/>

        <EditNode />
        <EditEdge />
    </Graphin>;
}


export default GraphEditor;
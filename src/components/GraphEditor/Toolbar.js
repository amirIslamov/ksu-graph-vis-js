import { GraphinContext } from "@antv/graphin";
import { Toolbar as TBar } from "@antv/graphin-components";
import { useContext } from "react";
import { 
    ZoomInOutlined,
    ZoomOutOutlined,
    EditOutlined,
    EditFilled
 } from "@ant-design/icons";
import EditorModes from "./EditorModes";

 const EditToggleButton = (props) => {
    const { mode, setMode } = props;

    const handleToggle = () => {
        if (mode === EditorModes.Default) {
            setMode(EditorModes.Edit)
        } else {
            setMode(EditorModes.Default)
        }
    }

    return <TBar.Item onClick={handleToggle}>
        {mode === EditorModes.Default 
        ? <EditOutlined />
        : <EditFilled />}
    </TBar.Item>
 }

const Toolbar = (props) => {
    const { apis } = useContext(GraphinContext);
    const { mode, setMode } = props;

    return <TBar direction="vertical" style={{ position: 'absolute', right: '0px', top: '0px', width: '40px' }}>
        <TBar.Item><ZoomInOutlined onClick={() => apis.handleZoomOut()} /></TBar.Item>
        <TBar.Item><ZoomOutOutlined onClick={() => apis.handleZoomIn()}/></TBar.Item>
        <EditToggleButton mode={mode} setMode={setMode} />
    </TBar>
}

export default Toolbar;
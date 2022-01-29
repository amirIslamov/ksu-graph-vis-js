import { GraphinContext } from "@antv/graphin";
import { Toolbar as GToolbar } from "@antv/graphin-components";
import { useContext } from "react";
import { 
    ZoomInOutlined,
    ZoomOutOutlined,
    EditOutlined,
    EditFilled,
    DeleteFilled,
    DeleteOutlined,
 } from "@ant-design/icons";
import EditorStates from "./EditorStates";

const ToggleButton = ({ toggled, toggleOn, toggleOff, onToggleOff, onToggleOn }) => {
    return (
        <GToolbar.Item onClick={ toggled ? onToggleOff : onToggleOn }>
            {
                toggled 
                    ? toggleOn
                    : toggleOff
            }
        </GToolbar.Item>
    );
}

const Toolbar = ({ state, enterEdit, enterRemove, enterDefault }) => {
    const { apis } = useContext(GraphinContext);

    const editToggled = state.state === EditorStates.Edit;
    const removeToggled = state.state === EditorStates.Remove;

    return (
        <GToolbar direction="vertical" className="editor-toolbar">
            <GToolbar.Item><ZoomInOutlined onClick={() => apis.handleZoomOut()} /></GToolbar.Item>
            <GToolbar.Item><ZoomOutOutlined onClick={() => apis.handleZoomIn()}/></GToolbar.Item>

            <GToolbar.Item>
                <ToggleButton
                    toggled={editToggled}
                    toggleOn={<EditFilled />}
                    toggleOff={<EditOutlined />}
                    onToggleOn={enterEdit}
                    onToggleOff={enterDefault}
                    />
            </GToolbar.Item>
            <GToolbar.Item>
                <ToggleButton
                    toggled={removeToggled}
                    toggleOn={<DeleteFilled />}
                    toggleOff={<DeleteOutlined />}
                    onToggleOn={enterRemove}
                    onToggleOff={enterDefault} 
                    />
            </GToolbar.Item>
        </GToolbar>
    );
}

export default Toolbar;
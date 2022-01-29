import { ContextMenu as GContextMenu } from "@antv/graphin-components";
import { DeleteOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { GraphinContext } from "@antv/graphin";
import { match } from "ts-pattern";

const ContextMenuItems = {
    Edit: 'Edit',
    Remove: 'Remove',
    Log: 'Log'
}

const nodeContextMenuOptions = [
    {
        key: ContextMenuItems.Edit,
        icon: <EditOutlined />,
        name: 'Edit'
    },
    {
        key: ContextMenuItems.Log,
        icon: <SettingOutlined />,
        name: 'Log'
    },
    {
        key: ContextMenuItems.Remove,
        icon: <DeleteOutlined />,
        name: 'Delete'
    }
];

const edgeContextMenuOptions = [
    {
        key: ContextMenuItems.Edit,
        icon: <EditOutlined />,
        name: 'Edit'
    },
    {
        key: ContextMenuItems.Log,
        icon: <SettingOutlined />,
        name: 'Log'
    },
    {
        key: ContextMenuItems.Remove,
        icon: <DeleteOutlined />,
        name: 'Delete'
    }
]

const ContextMenu = ({ enterEditEdge, enterEditNode }) => {
    const { graph } = useContext(GraphinContext);

    const remove = id => {
        graph.removeItem(id);
    }

    const handleEdgeMenuChange = (menuItem, menuData) => {
        const { id: edgeId } = menuData;

        match(menuItem)
            .with({ key: ContextMenuItems.Edit }, () => enterEditEdge(edgeId))
            .with({ key: ContextMenuItems.Remove }, () => remove(edgeId))
            .with({ key: ContextMenuItems.Log }, () => console.log(menuData))
            .run();
    }
    const handleNodeMenuChange = (menuItem, menuData) => {
        const { id: nodeId } = menuData;

        match(menuItem)
            .with({ key: ContextMenuItems.Edit }, () => enterEditNode(nodeId))
            .with({ key: ContextMenuItems.Remove }, () => remove(nodeId))
            .with({ key: ContextMenuItems.Log }, () => console.log(menuData))
            .run();
    }

    return (
        <>
            <GContextMenu bindType='node' className='node-context-menu' style={{ width: '100px' }}>
                <GContextMenu.Menu
                    options={nodeContextMenuOptions}
                    onChange={handleNodeMenuChange}
                    bindType="node" 
                    />
            </GContextMenu>
            <GContextMenu bindType='edge' className='node-context-menu' style={{ width: '100px' }}>
                <GContextMenu.Menu 
                    options={edgeContextMenuOptions}
                    onChange={handleEdgeMenuChange}
                    bindType="edge"
                    />
            </GContextMenu>
        </>
    );
}

export default ContextMenu;
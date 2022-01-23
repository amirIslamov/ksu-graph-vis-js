import SelectNode from "./Elements/SelectNode";

const DijkstraAlgorithmInitializer = ({ onInitialize, onCancel }) => {
    return <div>
        <SelectNode onSelect={onInitialize} />
        <div onClick={onCancel} >Cancel</div>
    </div>
}

export default DijkstraAlgorithmInitializer;
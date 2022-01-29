import SingleSouceEnchancer from "./Enchancers/SingleSourceEnchancer";

const FloydWarshallAlgorithm = () => ({ graph }) => ({
    snapshotList: [],
    enchancer: SingleSouceEnchancer
});

export default FloydWarshallAlgorithm;
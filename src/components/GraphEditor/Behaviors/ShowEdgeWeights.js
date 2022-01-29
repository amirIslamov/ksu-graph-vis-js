import { GraphinContext } from "@antv/graphin";
import { useContext, useEffect } from "react";

const ShowEdgeWeights = ({}) => {
    const { graph } = useContext(GraphinContext);

    useEffect(() => {
        const handle = ({ edge }) => {
            const { weight } = edge.getModel();
            graph.update(edge, {
                style: {
                    label: {
                        value: String(weight),
                        fill: 'black'
                    }
                }
            });
        }

        graph.on('aftercreateedge', handle);
        graph.on('afterweightupdate', handle);

        return () => {
            graph.off('afetercreateedge', handle);
            graph.off('afterweightupdate', handle);
        }
    });

    return null;
}

export default ShowEdgeWeights;
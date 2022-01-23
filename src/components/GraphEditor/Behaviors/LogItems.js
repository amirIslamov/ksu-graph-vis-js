import { GraphinContext } from "@antv/graphin";
import { useContext, useEffect } from "react";

const LogItems = () => {
    const { graph } = useContext(GraphinContext);

    useEffect(() => {
        graph.on('afteradditem', e => {
            console.log(e)
        });
    }, [graph]);

    return null;    
}

export default LogItems;
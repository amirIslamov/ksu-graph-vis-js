import { FastBackwardOutlined, FastForwardOutlined, StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons/lib/icons";
import { GraphinContext } from "@antv/graphin";
import { Toolbar } from "@antv/graphin-components";
import { useContext, useEffect, useMemo, useState } from "react";
import * as _ from 'lodash';

const AlgorithmSnapshotList = ({ algorithm }) => {
    const { graph } = useContext(GraphinContext);
    const beforeEnumerating = useMemo(() => {
        const data = _.cloneDeep(graph.save())
        console.log('saving graph data', data)
        return data;
    }, [graph]);
    const [snapshotIndex, setSnapshotIndex] = useState(0);
    const { snapshotList, enchancer: Enchancer } = useMemo(() => algorithm({ graph }), [algorithm, graph]);

    useEffect(() => () => {
        console.log('restoring graph data', beforeEnumerating);
        graph.changeData(beforeEnumerating);
    }, [beforeEnumerating, graph])

    const onNext = () => { setSnapshotIndex(snapshotIndex + 1); };
    const onPrevious = () => { setSnapshotIndex(snapshotIndex - 1); };
    const onLast = () => { setSnapshotIndex(snapshotList.length - 1); };
    const onFirst = () => { setSnapshotIndex(0); };

    return (
        snapshotList 
            ? (
                <>
                    <SnapshotToolbar
                        next={{ onNext, nextEnabled: snapshotList.length && (snapshotIndex < snapshotList.length - 1) }}
                        previous={{ onPrevious, previousEnabled: snapshotList.length && (snapshotIndex > 0) }}
                        toLast={{ onLast, lastEnabled: snapshotList.length && (snapshotIndex < snapshotList.length - 1) }}
                        toFirst={{ onFirst, firstEnabled: snapshotList.length && (snapshotIndex > 0) }}
                        />
                    <Enchancer 
                        snapshot={snapshotList[snapshotIndex]} 
                        />
                </>
            )
            : null            
    )
}

const SnapshotToolbar = ({ next, previous, toLast, toFirst }) => {
    const { nextEnabled, onNext } = next;
    const { previousEnabled, onPrevious } = previous;
    const { lastEnabled, onLast } = toLast;
    const { firstEnabled, onFirst } = toFirst;

    return (
        <Toolbar>
            {
                firstEnabled 
                    ? (
                        <Toolbar.Item onClick={() => {if (firstEnabled) onFirst()}}>
                            <FastBackwardOutlined />              
                        </Toolbar.Item>
                    )
                    : null
            }
            {
                previousEnabled 
                    ? (
                        <Toolbar.Item onClick={() => {if (previousEnabled) onPrevious()}}>
                            <StepBackwardOutlined />
                        </Toolbar.Item>
                    )
                    : null
            }
            {
                nextEnabled 
                    ? (
                        <Toolbar.Item onClick={() => {if (nextEnabled) onNext()}}>
                            <StepForwardOutlined />
                        </Toolbar.Item>
                    )
                    : null
            }
            {
                lastEnabled 
                    ? (
                        <Toolbar.Item onClick={() => {if (lastEnabled) onLast()}}>
                            <FastForwardOutlined />              
                        </Toolbar.Item>
                    )
                    : null
            }
        </Toolbar>
    )
}

export default AlgorithmSnapshotList;
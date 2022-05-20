import {GraphinContext, Utils} from '@antv/graphin';
import React from 'react';
import { v4 } from 'uuid';

let timesCalled = 0;
let id;

const edgeConfigFactory = (bp) => {
  if (timesCalled % 2 === 0) id = v4() 
  timesCalled++;
  const weight = 1;

  return {
    id,
    weight,
    ...bp
}
}

const AddEdge = () => {
  const { graph } = React.useContext(GraphinContext);

  React.useEffect(() => {
    const processEdges = () => {
      const data = graph.save();
      graph.data({
        ...data,
        edges: Utils.processEdges(data.edges)
      });
    };

    graph.addBehaviors(
        {
          type: 'create-edge',
          getEdgeConfig: edgeConfigFactory
        },
        'default',
      );
    graph.get('canvas').setCursor('crosshair');

    graph.on('aftercreateedge', processEdges)

    return () => {
      if (graph && !graph.destroyed) {
        graph.removeBehaviors('create-edge', 'default');
        graph.get('canvas').setCursor('default');
      }
      graph.off('aftercreateedge', processEdges);
    };
  }, [graph]);

  return null
};

export default AddEdge;
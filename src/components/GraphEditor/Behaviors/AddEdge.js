import { GraphinContext } from '@antv/graphin';
import React from 'react';
import { v4 } from 'uuid';

const edgeConfigFactory = (bp) => {
  const weight = 1;

  return {
    id: v4(),
    weight,
    style: {
        label: {
            value: `${weight}`,
            offset: [0, 0]
        }
    },
    ...bp
}
}

const CreateEdge = props => {
  const { graph } = React.useContext(GraphinContext);

  React.useEffect(() => {
    graph.addBehaviors(
        {
          type: 'create-edge',
          getEdgeConfig: edgeConfigFactory
        },
        'default',
      );
      graph.get('canvas').setCursor('crosshair');

    return () => {
      if (graph && !graph.destroyed) {
        graph.removeBehaviors('create-edge', 'default');
        graph.get('canvas').setCursor('default');
      }
    };
  }, [graph]);

  return null
};
export default CreateEdge;
import { GraphinContext } from "@antv/graphin";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useContext, useEffect, useState } from "react";
import * as Yup from 'yup';

const EditEdge = (props) => {
    const [edgeId, setEdgeId] = useState(null);
    const { graph } = useContext(GraphinContext);

    useEffect(() => {
        const handleEdgeClick = e => {
            const model =  e.item.get('model');
            setEdgeId(model.id)
        }
        const handleNodeClick = e => {
            setEdgeId(null);
        }
        const handeCanvasClick = e => {
            setEdgeId(null);
        }

        graph.on('edge:click', handleEdgeClick);
        graph.on('node:click', handleNodeClick);
        graph.on('canvas:click', handeCanvasClick);

        return () => {
            graph.off('edge:click', handleEdgeClick);
            graph.off('node:click', handleNodeClick);
            graph.off('canvas:click', handeCanvasClick);
        }
    });

    return (
        edgeId 
            ? <Formik
                initialValues={graph.findById(edgeId).get('model')}
                validationSchema={Yup.object({
                    weight: Yup.number().positive("Weight sould be positive number")
                })}
                onSubmit={(values) => { graph.findById(edgeId) }}>
                <Form>
                    <label htmlFor="weight" >Weight:</label>
                    <Field name='weight' />
                    <ErrorMessage />
                </Form>
            </Formik>
            : null
    )
}

export default EditEdge;
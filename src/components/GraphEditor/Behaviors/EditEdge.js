import { GraphinContext } from "@antv/graphin";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useContext } from "react";
import * as Yup from 'yup';

const EditEdge = ({ edgeId, enterDefault }) => {
    const { graph } = useContext(GraphinContext);
    
    const edge = graph.findById(edgeId);

    const model = edge.getModel();
    const { weight } = model;

    const handleSubmit = ({ weight: newWeight }, { setSubmitting }) => {
        setSubmitting(true);
        graph.emit('beforeweightupdate', { edge: edge });
        graph.update(edgeId, { ...model, weight: Number(newWeight) });
        graph.emit('afterweightupdate', { edge: edge });
        enterDefault();
    }

    return (
        <Formik
            initialValues={{ weight }}
            validationSchema={Yup.object({
                weight: Yup.number().positive('Weight should be a positive number')
            })}
            onSubmit={handleSubmit}>
            {formik => (
                <Form>
                    <Field name='weight' />
                    <ErrorMessage name='weight' />

                    <button 
                        type="submit" 
                        disabled={!formik.dirty || formik.isSubmitting}>Submit</button>
                    <button type="button" onClick={enterDefault}>Cancel</button>
                </Form>
            )}
        </Formik>
    );
}

export default EditEdge;
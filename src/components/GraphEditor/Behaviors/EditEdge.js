import { GraphinContext } from "@antv/graphin";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useContext } from "react";
import * as Yup from 'yup';
import 'antd/dist/antd.css';    
import { Button } from "antd";


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
                    <Modal visible={true} footer={
                        <div>
                            <Button 
                                type="submit" 
                                disabled={!formik.dirty || formik.isSubmitting}>Submit</Button>
                            <Button type="button" onClick={enterDefault}>Cancel</Button>
                        </div>
                    }
                    mask={false}>
                        <label htmlFor="weight">Weight: </label>
                        <Field name='weight' placeholder='Weight' />
                        <ErrorMessage name='weight' />    
                    </Modal>
                </Form>
            )}    
        </Formik>
    );
}

export default EditEdge;
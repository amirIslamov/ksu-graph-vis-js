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

    const handleSubmit = ({ weight: newWeight }) => {
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
        >
            {formik => (
                <Form> 
                    <Modal
                        title={'Edit edge'}
                        visible={true}
                        onCancel={enterDefault}
                        mask={false}
                        footer={
                            <div>
                                <Button
                                    type="primary"
                                    disabled={!formik.dirty}
                                    onClick={() => { handleSubmit(formik.values) }}
                                    >Submit</Button>
                                <Button htmlType="button" onClick={enterDefault}>Cancel</Button>
                            </div>
                        }>
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
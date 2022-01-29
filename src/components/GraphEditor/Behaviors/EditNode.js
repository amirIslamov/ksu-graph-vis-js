import { GraphinContext } from "@antv/graphin";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useContext, useEffect } from "react";
import * as Yup from 'yup';

const EditNode = ({ nodeId, enterDefault }) => {
    const { graph } = useContext(GraphinContext)

    useEffect(() => {
        enterDefault();
    })

    return null
}

export default EditNode;
import { ErrorMessage, Field  } from 'formik';
import React from 'react'


function Input(props) {
    const { label, name, ...rest } = props;
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} className="form-control" />
            <ErrorMessage name={name} />
        </div>
    )
}

export default Input

import { ErrorMessage, Field } from 'formik';
import React from 'react'

function Select(props) {
    const { label, name, options, ...rest } = props;
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name} {...rest} className="form-control">
                {
                    options.map(option => {
                        return (
                            <option defaultValue='option2' key={option.key} value={option.value}>{option.key}</option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} />
        </div>
    )
}

export default Select

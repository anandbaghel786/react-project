import { ErrorMessage, Field } from 'formik';
import React from 'react'

function Radio(props) {
    const { label, name, options, ...rest } = props;
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <br />
            <Field id={name} name={name} {...rest} className="form-control">
                {
                    ({field}) => {
                        return options.map(option => {
                            return (
                                <React.Fragment key={option.key}>
                                    <input type="radio" id={option.value} {...field} value={option.value} checked={field.value==option.value}  className="ml-4" />
                                    <label htmlFor={option.value} className="ml-1">{option.key}</label>
                                </React.Fragment>
                            )
                        })   
                    }
                }
            </Field>
            <ErrorMessage name={name} />
        </div>
    )
}

export default Radio

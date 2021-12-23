import { ErrorMessage, Field } from 'formik';
import React from 'react'

function Checkbox(props) {
    const { label, name, options, ...rest } = props;
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <br />
            <Field name={name} {...rest} className="form-control">
                {
                    ({field}) => {
                        return options.map(option => {
                            return (
                                <React.Fragment key={option.key}>
                                    <input type="checkbox" id={option.value} {...field} value={option.value} checked={field.value.includes(option.value)}  className="ml-4"  />
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

export default Checkbox

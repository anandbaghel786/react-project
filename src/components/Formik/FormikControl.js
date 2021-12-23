import React from 'react'
import Checkbox from './Checkbox';
import Input from './Input';
import Radio from './Radio';
import Select from './Select';
import Textarea from './Textarea';

function FormikControl(props) {
    const { control, ...rest } = props;
    switch (control) {
        case "input": 
                return  <Input {...rest} />
            break;

        case "textarea":
            return  <Textarea {...rest} />
            break;

        case "select":
            return  <Select {...rest} />
            break;

        case "radio":
            return  <Radio {...rest} />
            break;

        case "checkbox":
            return  <Checkbox {...rest} />
            break;

        case "date":

            break;

        default: return null;
    }
    return (
        <div>

        </div>
    )
}

export default FormikControl

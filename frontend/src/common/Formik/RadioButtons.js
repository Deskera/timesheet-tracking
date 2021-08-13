import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { Field } from 'formik';



function InputText(props) {
    const { id, name, type, options } = props;

    return (
        <Field name={name} id={id}>
            {props => {
                const { field, form } = props
                return (
                    <>
                        {options.map(option => {
                            return (
                                <>
                                    <Input id={option.key}
                                        name={name}
                                        type={type}
                                        value={option.value}
                                        checked={field.value === option.value}
                                        onChange={form.handleChange}
                                    />{' '}
                                    <Label htmlFor={option.key} className="form-check-label">{option.key}</Label>
                                    <br />
                                </>
                            )
                        })}
                    </>
                )
            }}
        </Field>
    );
}

export default InputText;




import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { WrapperInput, FieldFeedback } from '../CustomStyles';
import { ErrorMessage, Field } from 'formik';
import { images } from '../CommonUtils';
import PhoneInput from 'react-phone-input-2';


function InputText(props) {
    const { label, id, name, type, placeholder, imgInfo, options, ...rest } = props;
    console.log("avv", props);

    return (
        <Field name="phone">
            {props => {
                const { field, form } = props
                return (
                    <>
                        <div className="col-3 my-auto">{label}</div>
                        <div className="col-6">
                            {options.map(option => {
                                return (
                                    <>
                                        <Input id={id}
                                            name={name}
                                            type={type}
                                            value={option.value}
                                            checked={field.value === option.value}
                                            onChange={form.handleChange}
                                        />{' '}
                                        <Label htmlFor="male" className="form-check-label">{option.key}</Label>
                                        <br />
                                    </>
                                )

                            })}
                        </div>
                    </>
                )
            }}
        </Field>
    );
}

export default InputText;




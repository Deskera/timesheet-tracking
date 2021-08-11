import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { WrapperInput, FieldFeedback } from '../CustomStyles';
import { ErrorMessage, Field } from 'formik';
import { images } from '../CommonUtils';
import PhoneInput from 'react-phone-input-2';


function InputText(props) {
    const { id, name, type, placeholder, imgInfo, options, ...rest } = props;
    // console.log("avv", props);

    return (
        <Field name={name}>
            {props => {
                const { field, form } = props
                {/* console.log("manu", field); */}
                {/* console.log("manu2", form, options); */}
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




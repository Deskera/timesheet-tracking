import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { WrapperInput, FieldFeedback } from '../CustomStyles';
import { ErrorMessage, Field } from 'formik';
import { images } from '../CommonUtils';


function Select(props) {
    const { label, id, name, type, placeholder, imgInfo, options, ...rest } = props;
    console.log("avv", props);

    return (
        <Field name={name}>
            {props => {
                const { field } = props
                return (
                    <>
                        <WrapperInput className="input-group">
                            <Input {...field} 
                            type={type} 
                            id={id} 
                            name={name} className="form-select">
                                <option selected value="">
                                    Country
                                </option>
                                {options.map(option => {
                                    return (
                                        <option key={option.value} value={option.value} selected={field.value === option.value}>
                                            {option.key}
                                        </option>
                                    )
                                })}
                            </Input>
                        </WrapperInput>
                    </>
                )
            }}
        </Field>
    );
}

export default Select;








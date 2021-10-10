import * as React from 'react';
import { Input } from 'reactstrap';
import { WrapperInput } from '../CustomStyles';
import { Field } from 'formik';


function Select(props) {
    const { id, name, type, options } = props;

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








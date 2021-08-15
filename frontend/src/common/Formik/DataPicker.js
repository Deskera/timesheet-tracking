import * as React from 'react';
import { Input } from 'reactstrap';
import { Field } from 'formik';

function DatePicker(props) {
    const { id, name, type } = props;

    return (
        <Field name={name}>
            {props => {
                const { field } = props
                return (
                    <>
                        <Input {...field} id={id} name={name}
                            type={type}
                        />
                    </>
                )
            }}
        </Field>
    );
}

export default DatePicker;




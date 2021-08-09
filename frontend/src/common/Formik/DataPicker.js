import * as React from 'react';
import { Input } from 'reactstrap';
import { WrapperInput, FieldFeedback } from '../CustomStyles';
import { ErrorMessage, Field } from 'formik';
import { images } from '../CommonUtils';

function DatePicker(props) {
    const { label, id, name, type, placeholder, imgInfo, options, ...rest } = props;

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




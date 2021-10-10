import * as React from 'react';
import { Input } from 'reactstrap';
import { WrapperInput, FieldFeedback } from './CustomStyles';
import { ErrorMessage, Field } from 'formik';
import {images} from '../common/CommonUtils';

function InputFormat(props) {

    const id = props.id;
    const name = props.name;
    const placeholder = props.placeholder;
    const imgInfo = props.imgInfo ? props.imgInfo : {};

    var isPassword = false;
    if (props.type === 'password') {
        isPassword = true;
    }

    const [type, setType] = React.useState(props.type);

    function toggleType() {
        setType(type === "password" ? "text" : "password");
    }

    return (
        <Field name={name}>
            {props => {
                const { field, meta } = props
                return (
                    <>
                        <WrapperInput className="input-group"
                            // valid={field.value!=='' && meta.touched && !meta.error}
                            invalid={meta.touched && meta.error}

                        >
                            {
                                imgInfo.frontImg ?
                                    <span className="input-group-text bg-white pe-0 inputF">
                                        <img src={imgInfo.frontImg} alt={imgInfo.frontAlt} style={{ width: '24px'}} />
                                    </span>
                                    :
                                    null
                            }
                            <Input id={id}
                                {...field}    // speread operator will take care of name, value, handleChange and handleBlur
                                type={type}
                                placeholder={placeholder}
                                className="form-control inputF"
                                // valid={field.value!=='' && meta.touched && !meta.error}
                                invalid={meta.touched && meta.error}
                            />
                            {(() => {
                                if (isPassword) {
                                    if (type === 'password') {
                                        return (
                                            <span className="input-group-text bg-white inputF p-0">
                                                <img src={images['eye-closed.svg'].default} alt="eye closed" style={{ width: '20px', marginRight: '10px', cursor: 'pointer' }}
                                                    onMouseOver={toggleType}
                                                />
                                            </span>
                                        )
                                    }
                                    else {
                                        return (
                                            <span className="input-group-text bg-white inputF p-0">
                                                <img src={images['eye.svg'].default} alt="eye opened" style={{ width: '20px', marginRight: '10px', cursor: 'pointer' }}
                                                    onMouseLeave={toggleType}
                                                />
                                            </span>
                                        )
                                    }
                                } else if (imgInfo.backImg) {
                                    return (
                                        <span className="input-group-text bg-white inputF">
                                            <img src={imgInfo.backImg} alt={imgInfo.backAlt} style={{ width: '24px' }} />
                                        </span>
                                    )
                                }
                            })()}
                        </WrapperInput>
                        <ErrorMessage name={field.name} component={FieldFeedback} />
                    </>
                )
            }}
        </Field>
    );
}

export default InputFormat;


// implementing the Field component from formik package as
/* 


<Field name="email">
    id="email"
    placeholder="Email"
    as={Input}  // 'as' prop renders the Field component as any other html tag like 'textarea' or 'select', and even takes custom components, default is as='input' which is the <input> tag of html, 'component' prop can also be used instead of 'as'
    
    // value={formik.values.email}
    // onChange={formik.handleChange}
    // onBlur={formik.handleBlur}
    
    // the above three lines can be replaced by one single line below
    // {...formik.getFieldProps('email')}   // behind the scenes, .getField() methods implements the other three props
    
    // when the Input component is replaced by Field component from formik package, we don't even need the getFieldProps() method
</Field>


*/
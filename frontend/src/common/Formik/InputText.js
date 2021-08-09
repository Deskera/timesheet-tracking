import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { WrapperInput, FieldFeedback } from '../CustomStyles';
import { ErrorMessage, Field } from 'formik';
import { images } from '../CommonUtils';
// import TextField from '@mat'

function InputText(props) {
    const { label, id, name, placeholder, imgInfo, border, ...rest } = props;
    
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
                    {label ? 
                        <Label htmlFor={id}>{label}</Label>
                        :
                        null
                    }
                        <WrapperInput className="input-group"
                            invalid={meta.touched && meta.error}

                        >
                            {
                                imgInfo && imgInfo.frontImg ?
                                    <span className="input-group-text bg-white pe-0 inputF">
                                        <img src={imgInfo.frontImg} alt={imgInfo.frontAlt} style={{ width: '24px'}} />
                                    </span>
                                    :
                                    null
                            }
                            <Input id={id}
                                {...field}
                                type={type}
                                placeholder={placeholder}
                                className={`form-control ${border ? "" : "inputF"}`}
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
                                } else if (imgInfo && imgInfo.backImg) {
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

export default InputText;
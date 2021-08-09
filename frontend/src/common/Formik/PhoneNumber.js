import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { WrapperInput, FieldFeedback } from '../CustomStyles';
import { ErrorMessage, Field } from 'formik';
import { images } from '../CommonUtils';
import PhoneInput from 'react-phone-input-2';


function InputText(props) {
    const { label, id, name, type, placeholder, imgInfo, border, ...rest } = props;

    return (
        <Field name={name}>
            {props => {
                const { form, meta } = props
                return (
                    <>
                        <WrapperInput className="input-group"
                            invalid={meta.touched && meta.error}
                        >
                            <PhoneInput
                                id={id}
                                name={name}
                                value={form.values.phone}
                                onBlur={form.handleBlur}
                                onChange={(a, b, v) => { form.handleChange(v) }}
                                country={'us'}
                                inputProps={{
                                    name: { name },
                                }}
                                enableSearch disableSearchIcon
                                preferredCountries={['us', 'in', 'sg']}
                                searchPlaceholder="Search Country"
                                inputStyle={{
                                    width: "100%",
                                    height: '45px',
                                    border: border ? "": 'none',
                                    boxShadow: "none",
                                    borderRadius: '4px'
                                }}
                                buttonStyle={{
                                    border: border ? "" : 'none',
                                    borderRight: "none",
                                    backgroundColor: 'white',
                                    borderRadius: '4px'
                                }}
                                dropdownStyle={{
                                    borderRadius: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                                searchStyle={{
                                    textAlign: 'center',
                                    border: 'none'
                                }}
                            />
                        </WrapperInput>
                        <ErrorMessage name={name} component={FieldFeedback} />
                    </>
                )
            }}
        </Field>
    );
}

export default InputText;
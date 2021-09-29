import * as React from 'react';
import { WrapperInput, FieldFeedback } from '../CustomStyles';
import { ErrorMessage, Field } from 'formik';
import PhoneInput from 'react-phone-input-2';

function InputText(props) {
    const { id, name, border } = props;

    return (
        <Field name={name}>
            {props => {
                const { field, form, meta } = props
                return (
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12">
                            <WrapperInput className="input-group bg-info col-6 p-0"
                                invalid={meta.touched && meta.error}
                            >
                                <div style={{ width: '100%' }}>
                                    <PhoneInput
                                        id={id}
                                        name={name}
                                        value={field.value}
                                        onBlur={form.handleBlur}
                                        onChange={(a, b, v) => { form.handleChange(v) }}
                                        country={'us'}
                                        inputProps={{
                                            name: name,
                                        }}
                                        enableSearch disableSearchIcon
                                        preferredCountries={['us', 'in', 'sg']}
                                        searchPlaceholder="Search Country"
                                        inputStyle={{
                                            width: "100%",
                                            height: '45px',
                                            border: border ? "" : 'none',
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
                                </div>
                            </WrapperInput>
                            <ErrorMessage name={field.name} component={FieldFeedback} />
                        </div>
                    </div>
                )
            }}
        </Field>
    );
}

export default InputText;
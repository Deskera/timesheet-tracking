import React from 'react';

import { Input, FormGroup, Label } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';

import { WrapperInput, FieldFeedback } from '../../common/CustomStyles';
import { countryOptions } from '../admin-register/OrganizationInfoComponent';

function OrganizationForm() {
    return (
        <Form>
            {/* Country */}
            <FormGroup className="field-wrapper">
                <Field name="country">
                    {props => {
                        const { field, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="country" className="col-3 p-0">Country</Label>
                                <div className="col-6">
                                    <Input {...field} type="select" id="country" name="country" className="form-select">
                                        <option selected value="">
                                            Select
                                        </option>
                                        {countryOptions.map(option => {
                                            return (
                                                <option key={option.value} value={option.value} selected={field.value === option.value}>
                                                    {option.key}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                    <ErrorMessage name={field.name} component={FieldFeedback} />
                                </div>

                            </div>
                        )
                    }}
                </Field>
            </FormGroup>

    {/* Website Url */ }
    < FormGroup className = "field-wrapper" >
        <Field name="websiteUrl">
            {props => {
                const { field, meta } = props
                return (
                    <div className="row d-flex justify-content-center align-items-center">
                        <Label htmlFor="websiteUrl" className="col-3 p-0">Website Url</Label>
                        <div className="col-6">
                            <Input {...field} id="websiteUrl" name="websiteUrl"
                                type="text"
                                placeholder=""
                                invalid={meta.touched && meta.error}
                            />
                            <ErrorMessage name={field.name} component={FieldFeedback} />
                        </div>

                    </div>
                )
            }}
        </Field>
            </FormGroup >

    {/* Company Contact */ }
    < FormGroup className = "" >
        <Field name="contact">
            {props => {
                const { field, meta } = props
                return (
                    <div className="row d-flex justify-content-center align-items-center">
                        <Label htmlFor="contact" className="col-3 p-0">Company Number</Label>
                        <div className="col-6">
                            <Input {...field} id="contact" name="contact"
                                type="text"
                                placeholder=""
                                invalid={meta.touched && meta.error}
                            />
                            <ErrorMessage name={field.name} component={FieldFeedback} />
                        </div>

                    </div>
                )
            }}
        </Field>
            </FormGroup >
        </Form >
    )
}

export default OrganizationForm;
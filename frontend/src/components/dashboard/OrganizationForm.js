import React from 'react';

import { Input, FormGroup, Label } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';

import { WrapperInput, FieldFeedback } from '../../common/CustomStyles';

function OrganizationForm() {
    return (
        <Form>
            {/* Tenant Name */}
            <FormGroup className="field-wrapper">
                <Field name="tenantName">
                    {props => {
                        const { field, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="tenantName" className="col-3 p-0">Organization Name</Label>
                                <div className="col-6">
                                    <Input {...field} id="tenantName" name="tenantName"
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
            </FormGroup>

            {/* Country */}
            <FormGroup className="row field-wrapper">
                <Field name="country">
                    {props => {
                        const { field } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="country" className="col-3 p-0">Country</Label>
                                <div className="col-6">
                                    <Input {...field} type="select" id="country" name="country" class="form-select">
                                        <option selected>Country</option>
                                        <option value="India" selected={field.value === 'India'}>India</option>
                                        <option value="US" selected={field.value === 'US'}>United States of America</option>
                                        <option value="Singapore" selected={field.vlaue === 'Singapore'}>Singapore</option>
                                    </Input>
                                </div>
                            </div>
                        )
                    }}
                </Field>
            </FormGroup>

            {/* <FormGroup className="field-wrapper">
                <Field name="country">
                    {props => {
                        const { field, form, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="country" className="col-3 p-0">Country</Label>
                                <div className="col-6">
                                    <Input {...field} id="country" name="country"
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
            </FormGroup> */}

            {/* Website Url */}
            <FormGroup className="field-wrapper">
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
            </FormGroup>

            {/* Company Contact */}
            <FormGroup className="">
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
            </FormGroup>  
        </Form>
    )
}

export default OrganizationForm;
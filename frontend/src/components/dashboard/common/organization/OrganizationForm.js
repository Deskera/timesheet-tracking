import React from 'react';

import { FormGroup, Label } from 'reactstrap';
import { Form } from 'formik';

import { countryOptions } from '../../../admin-register/OrganizationInfoComponent';
import FormikControl from '../../../../common/Formik/FormikControl';

function OrganizationForm() {
    return (
        <Form className="my-3">
            {/* Country */}
            <FormGroup className="field-wrapper row d-flex align-items-center">
                <Label htmlFor="country" className="col-3 offset-1 p-0">Country</Label>
                <div className="col-7">
                    <FormikControl control="select"
                        id="country"
                        name="country"
                        type="select"
                        options={countryOptions}
                    />
                </div>
            </FormGroup>

            {/* Website Url */}
            <FormGroup className="field-wrapper row d-flex align-items-center">
                <Label htmlFor="websiteUrl" className="col-3 offset-1 p-0">Website Url</Label>
                <div className="col-7">
                    <FormikControl control="inputText"
                        id="websiteUrl"
                        name="websiteUrl"
                        type="text"
                        border
                    />
                </div>
            </FormGroup>

            {/* Company Contact */}
            <FormGroup className="row d-flex align-items-center">
                <Label htmlFor="contact" className="col-3 offset-1 p-0">Company Number</Label>
                <div className="col-7">
                    <FormikControl control="phoneNumber"
                        id="contact"
                        name="contact"
                        border
                    />
                </div>
            </FormGroup>
        </Form>
    )
}

export default OrganizationForm;
import React from 'react';

import { FormGroup, Label } from 'reactstrap';
import { Form } from 'formik';

import FormikControl from '../../common/Formik/FormikControl';

import { genderOptions } from '../../components/admin-register/PersonalInfoComponent';

function UserForm(props) {

    return (
        <Form className="my-3">
            {/* First Name */}
            <FormGroup className="field-wrapper row d-flex align-items-center">
                <Label htmlFor="firstname" className="col-3 offset-1 p-0">First Name</Label>
                <div className="col-7">
                    <FormikControl control="inputText"
                        id="firstname"
                        name="firstname"
                        type="text"
                        border
                    />
                </div>
            </FormGroup>

            {/* Last Name */}
            <FormGroup className="field-wrapper row d-flex align-items-center">
                <Label htmlFor="lastname" className="col-3 offset-1 p-0">Last Name</Label>
                <div className="col-7">
                    <FormikControl control="inputText"
                        id="lastname"
                        name="lastname"
                        type="text"
                        border
                    />
                </div>
            </FormGroup>

            {/* Phone Number */}
            <FormGroup className="field-wrapper row d-flex align-items-center">
                <Label htmlFor="phone" className="col-3 offset-1 p-0">Phone Number</Label>
                <div className="col-7">
                    <FormikControl control="phoneNumber"
                        id="phone"
                        name="phone"
                        border
                    />
                </div>
            </FormGroup>

            {/* Email */}
            <FormGroup className="field-wrapper row d-flex align-items-center">
                <Label htmlFor="email" className="col-3 offset-1 p-0">Email</Label>
                <div className="col-7">
                    <FormikControl control="inputText"
                        id="email"
                        name="email"
                        type="email"
                        border
                    />
                </div>
            </FormGroup>

            {/* Designation */}
            <FormGroup className="field-wrapper row d-flex align-items-center">
                <Label htmlFor="designation" className="col-3 offset-1 p-0">Designation</Label>
                <div className="col-7">
                    <FormikControl control="inputText"
                        id="designation"
                        name="designation"
                        type="text"
                        border
                    />
                </div>
            </FormGroup>

            {/* Gender */}
            <FormGroup className="field-wrapper row d-flex align-items-center">
                <Label htmlFor="gender" className="col-3 offset-1 p-0">Gender</Label>
                <div className="col-7">
                    <FormikControl control="radio"
                        id="gender"
                        name="gender"
                        type="radio"
                        options={genderOptions}
                    />
                </div>
            </FormGroup>

            {/* Date */}
            <FormGroup className="row d-flex align-items-center">
                <Label htmlFor="joiningDate" className="col-3 offset-1 p-0">Joining Date</Label>
                <div className="col-7">
                <FormikControl control="date"
                id="joiningDate"
                name="joiningDate"
                type="date"
                border

                />
                    {/* <Field name="joiningDate">
                        {props => {
                            const { field, meta } = props
                            return (
                                <div className="row d-flex justify-content-center align-items-center">
                                    <Label htmlFor="joiningDate" className="col-3 p-0">Joining Date</Label>
                                    <div className="col-6">
                                        

                                    </div>
                                </div>
                            )
                        }}
                    </Field> */}
                </div>
            </FormGroup>
        </Form>
    )
}

export default UserForm;
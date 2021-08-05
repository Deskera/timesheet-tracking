import React from 'react';

import { Input, FormGroup, Label } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';

import { WrapperInput, FieldFeedback } from '../../common/CustomStyles';


function FormView(props) {

    return (
        <Form>
            {/* First Name */}
            <FormGroup className="field-wrapper">
                <Field name="firstname">
                    {props => {
                        const { field, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="firstname" className="col-3 p-0">First Name</Label>
                                <div className="col-6">
                                    <Input {...field} id="firstname" name="firstname"
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

            {/* Last Name */}
            <FormGroup className="field-wrapper">
                <Field name="lastname">
                    {props => {
                        const { field, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="lastname" className="col-3 p-0">Last Name</Label>
                                <div className="col-6">
                                    <Input {...field} id="lastname" name="lastname"
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

            {/* Phone Number */}
            <FormGroup className="field-wrapper">
                <Field name="phone">
                    {props => {
                        const { field, form, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="phone" className="col-3 p-0">Phone Number</Label>
                                <div className="col-6">
                                    <WrapperInput className="input-group bg-info col-6 p-0"
                                        // valid={field.value !== '' && field.value.length > 4 && meta.touched && !meta.error}
                                        invalid={meta.touched && meta.error}
                                    >
                                        <div style={{ width: '100%' }}>
                                            <PhoneInput
                                                id="phone"
                                                name="phone"
                                                value={form.values.phone}
                                                onBlur={form.handleBlur}
                                                onChange={(a, b, v) => { form.handleChange(v) }}
                                                country={'us'}
                                                inputProps={{
                                                    name: 'phone',
                                                }}
                                                enableSearch disableSearchIcon
                                                preferredCountries={['us', 'in', 'sg']}
                                                searchPlaceholder="Search Country"
                                                inputStyle={{
                                                    width: "100%",
                                                    height: '45px',
                                                    boxShadow: 'none',
                                                    borderRadius: '4px'
                                                }}
                                                buttonStyle={{
                                                    borderRight: 'none',
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
            </FormGroup>

            {/* Email */}
            <FormGroup className="field-wrapper">
                <Field name="email">
                    {props => {
                        const { field, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="email" className="col-3 p-0">Email</Label>
                                <div className="col-6">
                                    <Input {...field} id="email" name="email"
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

            {/* Designation */}
            <FormGroup className="field-wrapper">
                <Field name="designation">
                    {props => {
                        const { field, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="designation" className="col-3 p-0">Designaion</Label>
                                <div className="col-6">
                                    <Input {...field} id="designation" name="designation"
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

            {/* Gender */}
            <FormGroup className="field-wrapper">
                <Field name="gender">
                    {props => {
                        const { field, form } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="gender" className="col-3 p-0">Gender</Label>
                                <div className="col-6">
                                    <div className="col-6">
                                        <Input id="male"
                                            name="gender"
                                            type="radio"
                                            value="MALE"
                                            checked={field.value === 'MALE'}
                                            onChange={form.handleChange}
                                        />{' '}
                                        <Label htmlFor="male" className="form-check-label">Male</Label>
                                        <br />

                                        <Input id="female"
                                            name="gender"
                                            type="radio"
                                            value="FEMALE"
                                            checked={field.value === 'FEMALE'}
                                            onChange={form.handleChange}
                                        />{' '}
                                        <Label htmlFor="female" className="form-check-label">Female</Label>

                                        <br />
                                        <Label htmlFor="other" className="form-check-label" style={{ width: '80px', height: '30px', borderRadius: '100px' }}>
                                            <Input id="other"
                                                name="gender"
                                                type="radio"
                                                value="OTHER"
                                                checked={field.value === 'OTHER'}
                                                onChange={form.handleChange}
                                            />{' '}
                                            Other
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Field>
            </FormGroup>

            {/* Date */}
            <FormGroup className="">
                <Field name="joiningDate">
                    {props => {
                        const { field, meta } = props
                        return (
                            <div className="row d-flex justify-content-center align-items-center">
                                <Label htmlFor="joiningDate" className="col-3 p-0">Joining Date</Label>
                                <div className="col-6">
                                    <Input {...field} id="joiningDate" name="joiningDate"
                                        type="date"
                                        placeholder=""
                                        invalid={meta.touched && meta.error}
                                        // onChange={form.handleChange}
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

export default FormView;
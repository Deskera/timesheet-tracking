import React from 'react';
import { FormGroup, Input, Button, Label } from 'reactstrap';
import LogoCard, { Centered, ParentCard, Card, FieldFeedback, WrapperInput } from '../../common/CustomStyles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import InputFormat from '../../common/InputComponent';
import PhoneInput from 'react-phone-input-2';

const initialValues = {
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    password: '',
    phone: '',
    designation: ''
}

Yup.addMethod(Yup.string, 'validatePhone', function () {
    return this.test('test-phone', "Invalid number format", value => {
        if (value && value.length > 4) return this.phone().isValidSync(value)
        return true
    })
})

const validationSchema = Yup.object({
    // email: Yup.string()
    //     .required('Required')
    //     .email('Invalid Email format'),
    // // .checkUserExists(),

    // phone: Yup.string()
    //     .validatePhone(),

    // password: Yup.string()
    //     .required('Required')
    //     .min(8, 'Password must contain atleast 8 characters')
    //     .max(16, "Password can't be more than 16 characters"),

    // confirmPassword: Yup.string()
    //     .required('Required')
    //     .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
})

function Add() {

    const onSubmit = (values) => {

        const newEmployee = {
            // firstName: registerValues.personal_info.firstname,
            // lastName: registerValues.personal_info.lastname,
            // gender: registerValues.personal_info.gender,
            // email: registerValues.values.email,
            
            //     tenantName: registerValues.organization_info.companyName,
            //     country: registerValues.organization_info.country,
            //     websiteUrl: registerValues.organization_info.websiteUrl,
            //     contact: registerValues.organization_info.companyPhone,
            
                
            //     contactNumber: registerValues.values.phone,
        }
        

        fetch("http://localhost:8080/api/users/save?password" , {
            method: 'POST',
            body: JSON.stringify(newEmployee),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(response => console.log(response))
            // .then(history.push("/dashboard"))
            .catch(error => {
                console.log('Post User', error.message);
                alert('Sorry, try Again\nError: ' + error.message);
            });
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {/* this 'Form' wrapper is from formik package which automatically hooks into formik's handleSubmit() method */}
            <Form className="mx-auto mb-5" style={{ maxWidth: '350px' }}>



                {/* First Name */}
                <FormGroup className="field-wrapper">
                    <InputFormat id="firstname"
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                        reuired
                    />
                </FormGroup>

                {/* Last Name */}
                <FormGroup className="field-wrapper">
                    <InputFormat id="lastname"
                        name="lastname"
                        type="text"
                        placeholder="Last Name"
                    />
                </FormGroup>

                {/* Gender */}
                <FormGroup className="row field-wrapper">
                    <Field name="phone">
                        {props => {
                            const { field, form, meta } = props
                            return (
                                <>
                                    <div className="col-3 my-auto">Gender</div>
                                    <div className="col-6">
                                        <Input id="male"
                                            name="gender"
                                            type="radio"
                                            value="MALE"
                                            onChange={form.handleChange}
                                        />{' '}
                                        <Label htmlFor="male" className="form-check-label">Male</Label>
                                        <br />

                                        <Input id="female"
                                            name="gender"
                                            type="radio"
                                            value="FEMALE"
                                            onChange={form.handleChange}
                                        />{' '}
                                        <Label htmlFor="female" className="form-check-label">Female</Label>

                                        <br />
                                        <Label htmlFor="other" className="form-check-label" style={{ width: '80px', height: '30px', borderRadius: '100px' }}>
                                            <Input id="other"
                                                name="gender"
                                                type="radio"
                                                value="OTHER"
                                                onChange={form.handleChange}
                                            />{' '}
                                            Other
                                        </Label>
                                    </div>
                                </>
                            )
                        }}
                    </Field>
                </FormGroup>


                {/* Email Address */}
                <FormGroup className="field-wrapper">
                    <InputFormat id="email" name="email"
                        type="email"
                        placeholder="Email"
                        imgInfo={{
                            // frontImg: "./assets/images/mail.svg",
                            // frontAlt: "Mail Icon"
                        }}
                    />
                </FormGroup>

                {/* Password */}
                <FormGroup className="field-wrapper">
                    <InputFormat id="password"
                        name="password"
                        type="text"
                        placeholder="Password"
                    />
                </FormGroup>

                {/* Phone Number */}
                <FormGroup className="field-wrapper">
                    <Field name="phone">
                        {props => {
                            const { field, form, meta } = props
                            return (
                                <>
                                    <WrapperInput className="input-group"
                                        valid={field.value !== '' && field.value.length > 4 && meta.touched && !meta.error}
                                        invalid={meta.touched && meta.error}
                                    >
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
                                                border: 'none',
                                                boxShadow: 'none',
                                                borderRadius: '4px'
                                            }}
                                            buttonStyle={{
                                                border: 'none',
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
                                    <ErrorMessage name='phone' component={FieldFeedback} />
                                </>
                            )
                        }}
                    </Field>
                </FormGroup>

                {/* Designation */}
                <FormGroup className="field-wrapper">
                    <InputFormat id="designation"
                        name="designation"
                        type="text"
                        placeholder="Designation"
                    />
                </FormGroup>


                {/* Button - Create Account */}
                <FormGroup className="mt-5">
                    {/* useHistory() hook is used to go to new endpoint */}
                    <Button type="submit" color="success" style={{ width: "100%" }}>
                        Add
                    </Button>
                </FormGroup>
            </Form>
        </Formik>
    )
}

export default Add;
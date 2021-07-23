import * as React from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import LogoCard, { Centered, ParentCard, Card, FieldFeedback, WrapperInput } from './CustomStyles';
import { Link, useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import InputFormat from './InputComponent';

const initialValues = {
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
}

const loginUser = (value) => {
    var r=3;
    fetch("http://localhost:8080/api/users/login?email="+value+"&password="+"abc", {
            // headers: {
            //     'Access-Control-Allow-Origin': 'http://localhost:3000',
            //     'Access-Control-Allow-Credentials': 'true',
            //     'Content-Type': 'application/json'
            // },
        })
            .then(response => {
                if (response.ok) {
                    // history.push("/dashboard");
                    return response;
                }
                else {
                    var error = new Error(response.status + ': ' + response.statusText);
                    error.response = response;
                    if(response.status === 404) {
                        console.log("404 wali error ", r)
                        r=0;
                        return 0;
                        // alert("Whoops! This email isn't registered :(");
                    }
                    else {
                        console.log("400 wali error ", r)
                        r=1;
                        return 1;
                        // alert("Incorrect password for this email.");
                    }
                    // throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            // .then(response => response.json())
            // .then(response => console.log(response))
            // .catch(error => console.log(error))
    // return r;
}

Yup.addMethod(Yup.string, 'checkUserExists', function () {
    console.log("check");
    return this.test('check-user-existence', "Email already taken!", value => {
        var ans = loginUser(value);
        console.log("acdd", loginUser(value))
        console.log("ans = ", ans);
        if (ans === 1) {
            // console.log("ans = 0")
            return false
        }
        return true
    })
})

Yup.addMethod(Yup.string, 'validatePhone', function () {
    return this.test('test-phone', "Invalid number format", value => {
        if (value && value.length > 4) return this.phone().isValidSync(value)
        return true
    })
})

const validationSchema = Yup.object({
    email: Yup.string()
        .required('Required')
        .email('Invalid Email format'),
        // .checkUserExists(),

    phone: Yup.string()
        .validatePhone(),

    password: Yup.string()
        .required('Required')
        .min(8, 'Password must contain atleast 8 characters')
        .max(16, "Password can't be more than 16 characters"),

    confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
})

function Register() {

    const history = useHistory();
    const onSubmit = (values) => {
        // console.log("a", values);
        history.push("/register/personal-info", {values});
    }

    return (
        <Centered className="container">
            <ParentCard className="row">
                <LogoCard register />

                <Card right className="col-6 p-5 d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%' }}>
                        <h2 className="display-6 mb-5 text-center">Sign Up with your work email!</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {/* this 'Form' wrapper is from formik package which automatically hooks into formik's handleSubmit() method */}
                            <Form className="mx-auto mb-5" style={{ maxWidth: '350px' }}>

                                {/* Email Address */}
                                <FormGroup className="field-wrapper">
                                    <InputFormat id="email" name="email"
                                        type="email"
                                        placeholder="Email"
                                        imgInfo={{
                                            frontImg: "./assets/images/mail.svg",
                                            frontAlt: "Mail Icon"
                                        }}
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

                                {/* Password */}
                                <FormGroup className="field-wrapper">
                                    <InputFormat name="password"
                                        type="password"
                                        placeholder="Password"
                                        imgInfo={{
                                            frontImg: "./assets/images/key.svg",
                                            frontAlt: "Key Icon"
                                        }}
                                    />
                                </FormGroup>

                                {/* Confirm Password */}
                                <FormGroup>
                                    <InputFormat name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        imgInfo={{
                                            frontImg: "./assets/images/key.svg",
                                            frontAlt: "Key Icon"
                                        }}
                                    />
                                </FormGroup>

                                {/* Button - Create Account */}
                                <FormGroup className="mt-5">
                                    {/* useHistory() hook is used to go to new endpoint */}
                                    <Button type="submit" color="success" style={{ width: "100%" }}>
                                        Create Account
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Formik>

                        {/* Switch to Login Screen */}
                        <div className="text-center">
                            <Link to="/login">
                                <Button className="mx-auto btn-outline-wanning" color="none">
                                    ← Already have an Account? Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </ParentCard>
        </Centered>
    );
}

export default Register;
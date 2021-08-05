import * as React from 'react';
import { FormGroup, Button } from 'reactstrap';
import LogoCard, { Centered, ParentCard, Card, FieldFeedback, WrapperInput } from '../../common/CustomStyles';
import { Link, useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import InputFormat from '../../common/InputComponent';
import {images} from '../../common/CommonUtils';

const initialValues = {
    email: '',
    phone: '',
    password: 'Abc@1234',
    confirmPassword: 'Abc@1234'
}

Yup.addMethod(Yup.string, 'validatePhone', function () {
    return this.test('test-phone', "Invalid number format", value => {
        if (value && value.length > 4) return this.phone().isValidSync(value)
        return true
    })
})

const atleast1Cap = "(?=.*[A-Z])";
const atleast1Num = ".*[0-9].*";
const atleast1Spe = "[*@!#%&()^~{}]+";

const validationSchema = Yup.object({
    email: Yup.string()
        .required('Required')
        .email('Invalid Email format'),

    phone: Yup.string()
        .validatePhone(),

    password: Yup.string()
        .required('Required')
        .min(8, 'Password must be 8 characters or longer!')
        .max(16, "Password can't be more than 16 characters!")
        .matches(atleast1Cap, "Please use atleast one capital letter!")
        .matches(atleast1Num, "Please use atleast one number!")
        .matches(atleast1Spe, "Please use atleast one special character!"),

    confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match!')
})

function Register() {

    const formRefRegister = React.useRef();
    const history = useHistory();

    const onSubmit = (values) => {
        // history.push("/register/personal-info", {values})
        fetch("http://localhost:8080/api/users/search?email=" + values.email)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error(response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(response => { 
                // console.log("navay", response); 
                if(response === true) {
                    formRefRegister.current.setFieldError("email","Email already taken!");
                }
                else {
                    history.push("/register/personal-info", {values})
                }
            })
            .catch(error => console.log(error))
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
                            innerRef={formRefRegister}
                        >
                            {/* this 'Form' wrapper is from formik package which automatically hooks into formik's handleSubmit() method */}
                            <Form className="mx-auto mb-5" style={{ maxWidth: '350px' }}>

                                {/* Email Address */}
                                <FormGroup className="field-wrapper">
                                    <InputFormat id="email" name="email"
                                        type="email"
                                        placeholder="Email"
                                        imgInfo={{
                                            frontImg: images['mail.svg'].default,
                                            frontAlt: "Mail Icon"
                                        }}
                                    />
                                </FormGroup>

                                {/* Phone Number */}
                                <FormGroup className="field-wrapper">
                                    <Field name="phone">
                                        {props => {
                                            const { form, meta } = props
                                            return (
                                                <>
                                                    <WrapperInput className="input-group"
                                                        // valid={field.value !== '' && field.value.length > 4 && meta.touched && !meta.error}
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
                                            frontImg: images['key.svg'].default,
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
                                            frontImg: images['key.svg'].default,
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
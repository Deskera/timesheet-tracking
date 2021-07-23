import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import LogoCard, { Centered, ParentCard, Card, FieldFeedback, WrapperInput } from './CustomStyles';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputFormat from './InputComponent';

const initialValues = {
    email: '',
    password: ''
}

// const loginUser = (values, history) => {
//     fetch("http://localhost:8080/api/users/login?email="+values.email+"&password="+values.password, {
//             // headers: {
//             //     'Access-Control-Allow-Origin': 'http://localhost:3000',
//             //     'Access-Control-Allow-Credentials': 'true',
//             //     'Content-Type': 'application/json'
//             // },
//         })
//             .then(response => {
//                 if (response.ok) {
//                     history.push("/dashboard");
//                     return response;
//                 }
//                 else {
//                     var error = new Error(response.status + ': ' + response.statusText);
//                     error.response = response;
//                     if(response.status === 404) {
//                         alert("Whoops! This email isn't registered :(");
//                     }
//                     else {
//                         alert("Incorrect password for this email.");
//                     }
//                     throw error;
//                 }
//             },
//                 error => {
//                     var errmess = new Error(error.message);
//                     throw errmess;
//                 })
//             .then(response => response.json())
//             .then(response => console.log(response))
//             .catch(error => console.log(error))
// }

// Yup.addMethod(Yup.string, 'checkUserExists', function () {
//     return this.test('test-phone', "Whoops! This email isn't registered :(", value => {
//         if (value && value.length > 4) return this.phone().isValidSync(value)
//         return true
//     })
// })

const validationSchema = Yup.object({
    email: Yup.string()
        .required('Required')
        .email('Invalid email format'),
        // .checkUserExists(),

    password: Yup.string()
        .required('Required')
        .min(8, 'Hint: Your password contains atleast 8 characters!')
        .max(16, "Hint: Your password is not more than 16 characters!"),
})

function Login() {

    const history = useHistory();

    const onSubmit = (values) => {
        fetch("http://localhost:8080/api/users/login?email="+values.email+"&password="+values.password, {
            // headers: {
            //     'Access-Control-Allow-Origin': 'http://localhost:3000',
            //     'Access-Control-Allow-Credentials': 'true',
            //     'Content-Type': 'application/json'
            // },
        })
            .then(response => {
                if (response.ok) {
                    // response = response.json()
                    // console.log("mm", response)
                    // history.push("/dashboard");
                    return response;
                }
                else {
                    var error = new Error(response.status + ': ' + response.statusText);
                    error.response = response;
                    if(response.status === 404) {
                        alert("Whoops! This email isn't registered :(");
                    }
                    else {
                        alert("Incorrect password for this email.");
                    }
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(response => {console.log(response);localStorage.setItem("user",JSON.stringify(response))})
            .then(response => history.push("/dashboard"))
            .catch(error => console.log(error))
        // loginUser(values, history);
    }

    return (
        <Centered className="container">
            <ParentCard className="row">
                <LogoCard login />

                <Card right className="col-6 p-5 d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%' }}>
                        <h2 className="display-6 mb-5 text-center">Sign In for Deskera Application</h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
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

                                {/* Password */}
                                <FormGroup className="mb-3">
                                    <InputFormat id="password" name="password"
                                        type="password"
                                        placeholder="Password"
                                        imgInfo={{
                                            frontImg: "./assets/images/key.svg",
                                            frontAlt: "Key Icon"
                                        }}
                                    />
                                </FormGroup>

                                {/* Login Button */}
                                <FormGroup className="mt-5">
                                    <Button type="submit" color="success" style={{ width: "100%" }}>
                                        Login
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Formik>

                        <div className="text-center">
                            <Link to="/register">
                                <Button className="mx-auto" color="none">
                                    Don't have an Account? Sign Up Now →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </ParentCard>
        </Centered>
    );
}

export default Login;
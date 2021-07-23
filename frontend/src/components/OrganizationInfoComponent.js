import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Centered, Card, ParentCard } from './CustomStyles'
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputFormat from './InputComponent';

const initialValues = {
    companyName: '',
    country: '',
    websiteUrl: '',
    companyPhone: ''
}

const validationSchema = Yup.object({
    companyName: Yup.string()
        .required('Required!'),

    country: Yup.string()
        .required('Required'),

    websiteUrl: Yup.string()
        .url('Must be a valid URL')
})

function OrganizationInfo() {

    const history = useHistory();
    // console.log("bbbb", history.location);

    const registerValues = history.location.state;

    const onSubmit = (values) => {
        registerValues["organization_info"] = values;
        console.log("aa ", registerValues);

        const newUser = {
            tenantDto: {
                tenantName: registerValues.organization_info.companyName,
                country: registerValues.organization_info.country,
                websiteUrl: registerValues.organization_info.websiteUrl,
                contact: registerValues.organization_info.companyPhone
            },
            userDto: {
                firstName: registerValues.personal_info.firstname,
                lastName: registerValues.personal_info.lastname,
                gender: registerValues.personal_info.gender,
                email: registerValues.values.email,
                contactNumber: registerValues.values.phone,
            }
        }



        fetch("http://localhost:8080/api/tenants/initial-setup?password=" + registerValues.values.password, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                // 'Access-Control-Allow-Credentials': 'true',
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
            .then(history.push("/dashboard"))
            .catch(error => {
                console.log('Post User', error.message);
                alert('Sorry, try Again\nError: ' + error.message);
            });



    }

    return (
        <Centered alone className="container">
            <ParentCard className="row">
                <Card className="col-12 p-5 py-0 d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%' }} className="p-2">
                        <div className="text-center mt-3 mb-4" >
                            <img src="/assets/images/logo-black.svg" alt="Deskera logo"
                                style={{ width: "40%", maxWidth: '400px', height: '', objectFit: 'cover' }}
                            />
                            <h2 className="display-6 text-center">Hi {registerValues.personal_info.firstname}</h2>
                            <h4 className="text-center">Tell us something about your company :)</h4>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            <Form className="mx-auto mb-5" style={{ maxWidth: '350px' }}>

                                {/* Company Name */}
                                <FormGroup className="field-wrapper">
                                    <InputFormat id="companyName" name="companyName"
                                        type="text"
                                        placeholder="Company Name"
                                    />
                                </FormGroup>

                                {/* Country */}
                                <FormGroup className="field-wrapper">
                                    <InputFormat id="country" name="country"
                                        type="text"
                                        placeholder="Country"
                                    />
                                </FormGroup>

                                {/* Website URL */}
                                <FormGroup className="field-wrapper">
                                    <InputFormat id="websiteUrl" name="websiteUrl"
                                        type="text"
                                        placeholder="Website URL"
                                    />
                                </FormGroup>

                                {/* Company Phone Number */}
                                <FormGroup className="field-wrapper">
                                    <InputFormat id="companyPhone" name="companyPhone"
                                        type="tel"
                                        placeholder="Company Phone Number"
                                    />
                                </FormGroup>

                                {/* Submit */}
                                <FormGroup className="row">
                                    <Link to="/register/personal-info" className="col-4 pb-5">
                                        <Button color="success" style={{ width: "100%" }}>
                                            Back
                                        </Button>
                                    </Link>
                                    <div>
                                        <Button type="submit" color="success" style={{ width: "100%" }}>
                                            Register Organization
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </Formik>
                    </div>
                </Card>
            </ParentCard>
        </Centered>
    );
}

export default OrganizationInfo;
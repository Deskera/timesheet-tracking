import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Centered, Card, ParentCard } from '../../common/CustomStyles'
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { images } from '../../common/CommonUtils';
import FormikControl from '../../common/Formik/FormikControl';

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

export const countryOptions = [
    { value: 'SG', key: "Singapore (SG)" },
    { value: 'US', key: "United States of America (US)" },
    { value: 'MY', key: "Malaysia (MY)" },
    { value: 'AU', key: "Australia (AU)" },
    { value: 'CA', key: "Canada (CA)" },
    { value: 'ID', key: "Indonesia (ID)" },
    { value: 'IN', key: "India (IN)" },
    { value: 'UK', key: "United Kingdom of Great Britain and Northern Ireland (UK)" }
]

function OrganizationInfo() {

    const history = useHistory();
    // console.log("bbbb", history.location);

    const registerValues = history.location.state;

    const onSubmit = (values) => {
        registerValues["organization_info"] = values;

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
                email: registerValues.values.email,
                gender: registerValues.personal_info.gender,
                contactNumber: registerValues.values.phone,
                roleId: 1,
            }
        }

        console.log("asd", newUser);

        fetch("http://localhost:8080/api/tenants/initial-setup?password=" + registerValues.values.password, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
                'connection': 'keep-alive'
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
            .then(response => { console.log(response); alert("Registered!"); history.push("/login") })
            .catch(error => {
                console.log('Post User', error);
                // alert('Sorry, try Again\nError: ' + error.message);
            });
    }

    return (
        <Centered alone className="container">
            <ParentCard className="row">
                <Card className="col-12 p-5 py-0 d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%' }} className="p-2">
                        <div className="text-center mt-3 mb-4" >
                            <img src={images["logo-black.svg"].default} alt="Deskera logo"
                                style={{ width: "40%", maxWidth: '400px', height: '', objectFit: 'cover' }}
                            />
                            {/* <h2 className="display-6 text-center">Hi {registerValues.personal_info.firstname}</h2> */}
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
                                    <FormikControl control="inputText"
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        placeholder="Company Name"
                                    />
                                </FormGroup>

                                {/* Country */}
                                <FormGroup className="row field-wrapper">
                                    <FormikControl control="select"
                                        id="country"
                                        name="country"
                                        type="select"
                                        options={countryOptions}
                                    />
                                </FormGroup>

                                {/* Website URL */}
                                <FormGroup className="field-wrapper">
                                    <FormikControl control="inputText"
                                        id="websiteUrl"
                                        name="websiteUrl"
                                        type="text"
                                        placeholder="Website URL"
                                    />
                                </FormGroup>

                                {/* Company Phone Number */}
                                <FormGroup className="field-wrapper">
                                    <FormikControl control="inputText"
                                        id="companyPhone"
                                        name="companyPhone"
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
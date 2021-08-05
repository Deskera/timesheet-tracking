import React from 'react';
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { Centered, Card, ParentCard } from '../../common/CustomStyles';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputFormat from '../../common/InputComponent';
import {images} from '../../common/CommonUtils';

const initialValues = {
    firstname: '',
    lastname: '',
    gender: ''
}

const validationSchema = Yup.object({
    firstname: Yup.string()
        .required('Required!'),

    lastname: Yup.string()
        .required('Required!')
})

function PersonalInfo() {

    const history = useHistory();

    const registerValues = history.location.state;
    const onSubmit = (values) => {
        registerValues["personal_info"] = values;
        history.push("/register/organization-info", registerValues);
    }

    return (
        <Centered alone className="container">
            <ParentCard alone className="row">
                <Card className="col-12 p-5 py-0 d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%' }} className="p-2 py-0">
                        <div className="text-center mt-3 mb-4" >
                            <img src={images["logo-black.svg"].default} alt="Deskera logo"
                                style={{ width: "40%", maxWidth: '400px', height: '', objectFit: 'cover' }}
                            />
                            <h2 className="display-6 text-center">Fill your Account Details</h2>
                            <h4 className="text-center">Help us get to know you better :)</h4>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            <Form className="mx-auto mb-5" style={{ maxWidth: '380px' }}>

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
                                            const { form } = props
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

                                {/* Submit */}
                                <FormGroup className="row mb-3">
                                    <Link to="/register" className="col-6">
                                        <Button color="success" style={{ width: "100%" }}>
                                            Back
                                        </Button>
                                    </Link>
                                    <div className="col-6">
                                        <Button type="submit" color="success" style={{ width: "100%" }}>
                                            Next
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

export default PersonalInfo;
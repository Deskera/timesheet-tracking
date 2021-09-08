import * as React from 'react';
import { FormGroup, Button } from 'reactstrap';
import LogoCard, { Centered, ParentCard, Card } from '../../common/CustomStyles';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { images } from '../../common/CommonUtils';
// import Loader from '../../common/Loader';
import { baseUrl } from '../../common/baseUrl';
import axios from 'axios';

// import { makeStyles } from '@material-ui/core/styles';

import FormikControl from '../../common/Formik/FormikControl';

import { ScaleLoader } from 'react-spinners';

const initialValues = {
    email: '',
    password: 'Abc@1234'
}

const atleast1Cap = "(?=.*[A-Z])";
const atleast1Num = ".*[0-9].*";
const atleast1Spe = "[*@!#%&()^~{}]+";

const validationSchema = Yup.object({
    email: Yup.string()
        .required('Required')
        .email('Invalid email format'),

    password: Yup.string()
        .required('Required')
        .min(8, 'Password must be 8 characters or longer!')
        .max(16, "Password can't be more than 16 characters")
        .matches(atleast1Cap, "Please use atleast one capital letter!")
        .matches(atleast1Num, "Please use atleast one number!")
        .matches(atleast1Spe, "Please use atleast one special character!"),
})

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// }));

function Login() {

    const [loader, setLoader] = React.useState(false);

    const formRef = React.useRef();
    const history = useHistory();

    const onSubmit = (values) => {
        setLoader(true);
        axios.get(baseUrl + "api/users/login?email=" + values.email + "&password=" + values.password)
            .then((response) => {
                setLoader(false);
                console.log("a", response);
                if (response.data.user.userDto.roleId == 2) {
                    alert("Access Denied!");
                }
                else {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    history.push("/dashboard");
                }
            })
            .catch((err) => {
                setLoader(false);
                if (err.response === undefined) {
                    alert("Server Error");
                }
                else if (err.response.status === 404) {
                    formRef.current.setFieldError("email", "Whoops! This email isn't registered :(")
                }
                else if (err.response.data === "Invalid password") {
                    formRef.current.setFieldError("password", "Incorrect password for this email.")
                }
                else if (err.response.data === "Already logged in") {
                    alert("Multiple login Attemp!")
                }
                console.log(err.response)
            })
    }

    return (

        <Centered className="container">
            <ParentCard className="row"> {/* style={{ opacity: loader ? '0.4' : '' }} */}
                {/* {loader && <Loader />} */}

                <LogoCard login />

                <Card right className="col-6 p-5 d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%' }}>
                        <h2 className="display-6 mb-5 text-center">Sign In for Deskera Application</h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            innerRef={formRef}
                        >
                            <Form className="mx-auto mb-5" style={{ maxWidth: '350px' }}>
                                <FormGroup className="field-wrapper">
                                    <FormikControl control='inputText'
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='Email'
                                        imgInfo={{
                                            frontImg: images['mail.svg'].default,
                                            frontAlt: "Mail Icon"
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <FormikControl control="inputText"
                                        id="password" name="password"
                                        type="password"
                                        placeholder="Password"
                                        imgInfo={{
                                            frontImg: images['key.svg'].default,
                                            frontAlt: "Key Icon"
                                        }}
                                    />
                                </FormGroup>

                                {/* Login Button */}
                                <FormGroup className="mt-5">
                                    <Button type="submit" color="success" className="d-flex align-items-center justify-content-center" style={{ width: "100%", height: "40px" }}>
                                        {loader ? <ScaleLoader color="#fff" loading={loader} height={10} /> : "Login"}
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


                    {/* <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Standard" />
                        <TextField id="filled-basic" label="Filled" variant="filled" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </form> */}

                </Card>
            </ParentCard>
        </Centered>
    );
}

export default Login;
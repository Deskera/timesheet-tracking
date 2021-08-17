import React from 'react';
import { Button, Modal } from "react-bootstrap";
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import UserForm from './UserForm';
import { baseUrl } from '../../../common/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { getUser } from '../../../common/CommonUtils';

function AddModal(props) {

    const { show, handleClose, renderAgain } = props;

    const [saveLoader, setSaveLoader] = React.useState(false);
    const addEmpFormRef = React.useRef();

    const addEmployee = () => {
        setSaveLoader(true);

        const newEmp = {
            firstName: addEmpFormRef.current.values.firstname,
            lastName: addEmpFormRef.current.values.lastname,
            email: addEmpFormRef.current.values.email,
            designation: addEmpFormRef.current.values.designation,
            contactNumber: addEmpFormRef.current.values.phone,
            gender: addEmpFormRef.current.values.gender,
            joiningDate: addEmpFormRef.current.values.joiningDate,
            roleId: 2,
            tenantName: getUser().tenantDto.tenantName
        }
        axios.post((baseUrl + "api/users/save?password=Welcome" + newEmp.firstName), newEmp)
            .then(() => {
                renderAgain();
                setSaveLoader(false);
                toast.success("Employee added successfully!");
                handleClose();
            })
            .catch((err) => {
                setSaveLoader(false);
                if (err.response.data === "user already exists") {
                    addEmpFormRef.current.setFieldError("email", "Email already taken!")
                }
                console.log(err.response)
            })
    }

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        designation: '',
        phone: '',
        gender: '',
        joiningDate: ''
    }

    Yup.addMethod(Yup.string, 'validatePhone', function () {
        return this.test('test-phone', "Invalid number format", value => {
            if (value && value.length > 4) return this.phone().isValidSync(value)
            return true
        })
    })

    const validationSchema = Yup.object({
        firstname: Yup.string()
            .required('Required!'),

        lastname: Yup.string()
            .required('Required!'),

        email: Yup.string()
            .required('Required')
            .email('Invalid email format'),

        designation: Yup.string()
            .required('Required'),

        phone: Yup.string()
            .validatePhone(),
    })

    const SaveLoader = () => {
        return (
            <PulseLoader speedMultiplier="1" color="#fff" loading={saveLoader} size={8} />
        )
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>New Employee</Modal.Title>
                    <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                </Modal.Header>

                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={() => addEmployee()}
                        innerRef={addEmpFormRef}
                    >
                        <UserForm />
                    </Formik>
                </Modal.Body>

                <Modal.Footer>
                    <Button style={{ width: "80px" }} variant="primary" onClick={() => addEmpFormRef.current.submitForm()}>{saveLoader ? <SaveLoader /> : "Save"}</Button>
                    <span></span>
                    <Button className="btn-outline-danger" variant="" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddModal;
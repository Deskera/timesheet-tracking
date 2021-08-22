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

function EditModal(props) {

    const { show, emp, handleClose, tableRef } = props;

    const [saveLoader, setSaveLoader] = React.useState(false);
    const editEmpFormRef = React.useRef();

    const editEmployee = () => {
        setSaveLoader(true);

        const editEmp = {
            userId: emp && emp.userId,
            userDto: {
                firstName: editEmpFormRef.current.values.firstname,
                lastName: editEmpFormRef.current.values.lastname,
                email: editEmpFormRef.current.values.email,
                designation: editEmpFormRef.current.values.designation,
                contactNumber: editEmpFormRef.current.values.phone,
                gender: editEmpFormRef.current.values.gender,
                joiningDate: editEmpFormRef.current.values.joiningDate,
                roleId: editEmpFormRef.current.values.roleId
            }
        }

        const scopeRef = tableRef.current;

        axios.put((baseUrl + "api/users/edit"), editEmp)
            .then(() => {
                scopeRef.onQueryChange();
                setSaveLoader(false);
                toast.success("Employee updated successfully!");
                handleClose();
            })
            .catch((err) => {
                setSaveLoader(false);
                if (err.response.data === "email already exists") {
                    editEmpFormRef.current.setFieldError("email", "Email already taken!")
                }
                console.log(err)
            })
    }

    const initialValues = {
        firstname: emp && emp.userDto.firstName,
        lastname: emp && emp.userDto.lastName,
        email: emp && emp.userDto.email,
        designation: emp && emp.userDto.designation,
        phone: emp && emp.userDto.contactNumber,
        gender: emp && emp.userDto.gender,
        joiningDate: emp && emp.userDto.joiningDate,
        roleId: emp && emp.userDto.roleId
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
                    <Modal.Title>{emp && (emp.userDto.firstName + " " + emp.userDto.lastName)}</Modal.Title>
                    <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                </Modal.Header>

                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={() => editEmployee()}
                        innerRef={editEmpFormRef}
                    >
                        <UserForm />
                    </Formik>
                </Modal.Body>

                <Modal.Footer>
                    <Button style={{ width: "80px" }} variant="primary" onClick={() => editEmpFormRef.current.submitForm()}>
                        {saveLoader ? <SaveLoader /> : "Save"}
                    </Button>
                    <span></span>
                    <Button className="btn-outline-danger" variant="" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditModal;
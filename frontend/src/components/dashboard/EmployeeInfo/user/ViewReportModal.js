import React from 'react';
import { Button, Modal } from "react-bootstrap";
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import UserForm from './UserForm';
import { baseUrl } from '../../../../common/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import { PulseLoader } from "react-spinners";
import axios from 'axios';

function ViewReportModal(props) {

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

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>{emp && (emp.userDto.firstName + " " + emp.userDto.lastName)}</Modal.Title>
                    {/* <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} /> */}
                </Modal.Header>

                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'scroll' }}>

                </Modal.Body>

                <Modal.Footer>
                    <Button style={{ width: "80px" }} variant="primary" onClick={handleClose()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewReportModal;
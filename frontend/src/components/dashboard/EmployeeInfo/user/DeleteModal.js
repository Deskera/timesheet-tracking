import React from 'react';
import { Button, Modal } from "react-bootstrap";
import 'yup-phone-lite';
import { baseUrl } from '../../../../common/baseUrl';
import { getUser } from '../../../../common/CommonUtils';
import { ToastContainer, toast } from 'react-toastify';
import { PulseLoader } from "react-spinners";
import axios from 'axios';

function DeleteModal(props) {

    const { show, emp, handleClose, tableRef } = props;

    const [saveLoader, setSaveLoader] = React.useState(false);

    const deleteEmployee = () => {
        setSaveLoader(true);
        const scopeRef = tableRef.current;

        axios.delete(baseUrl + "api/users/delete?email=" + emp.userDto.email)
            .then(() => {
                scopeRef.onQueryChange();
                setSaveLoader(false);
                toast.success("Employee deleted successfully!");
                handleClose();
            })
            .catch((err) => {
                setSaveLoader(false);
                console.log("error", err)
            })
    }

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
                <Modal.Body className="text-center py-4">
                    <div className="mb-4" style={{ fontSize: '20px' }}>Are you sure you want to delete this employee's details?</div>
                    <Button variant='success' style={{ width: '70px', marginRight: '20px' }} onClick={() => deleteEmployee()}>{saveLoader ? <SaveLoader /> : "Yes"}</Button>
                    <Button variant='danger' style={{ width: '70px' }} onClick={handleClose}>No</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeleteModal;
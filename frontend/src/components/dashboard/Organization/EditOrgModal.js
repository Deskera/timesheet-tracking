import React from 'react';
import { Button, Modal } from "react-bootstrap";
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import OrganizationForm from './OrganizationForm';
import { baseUrl } from '../../../common/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import { getUser } from '../../../common/CommonUtils';

function EditOrgModal(props) {

    const { show, handleClose, renderAgain } = props;

    const [saveLoader, setSaveLoader] = React.useState(false);
    const editOrgFormRef = React.useRef();

    const editOrg = () => {
        console.log("qqqq");
        setSaveLoader(true);

        const editOrg = {
            tenantName: getUser().tenantDto.tenantName,
            country: editOrgFormRef.current.values.country,
            websiteUrl: editOrgFormRef.current.values.websiteUrl,
            contact: editOrgFormRef.current.values.contact
        }

        axios.put((baseUrl + "api/tenants/edit"), editOrg)
            .then(() => {
                renderAgain();
                setSaveLoader(false);
                var user = getUser();
                user.tenantDto = editOrg;
                localStorage.setItem("user", JSON.stringify(user));
                toast.success("Company updated successfully!");
                handleClose();
            })
            .catch((err) => {
                setSaveLoader(false);
                console.log(err);
            })
    }

    const initialValues = {
        country: getUser().tenantDto.country,
        websiteUrl: getUser().tenantDto.websiteUrl,
        contact: getUser().tenantDto.contact
    }

    const validationSchema = Yup.object({
        tenantName: Yup.string()
            .required('Rwquired!'),

        country: Yup.string()
            .required('Required!')
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
                    <Modal.Title>{getUser().tenantDto.tenantName}: Company Details</Modal.Title>
                    <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                </Modal.Header>

                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={() => editOrg()}
                        innerRef={editOrgFormRef}
                    >
                        <OrganizationForm />
                    </Formik>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" style={{ width: "80px" }} variant="primary" onClick={() => editOrg()}>{saveLoader ? <SaveLoader /> : "Save"}</Button>
                    <span></span>
                    <Button className="btn-outline-danger" variant="" onClick={() => { console.log("nnnn"); handleClose() }}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditOrgModal;
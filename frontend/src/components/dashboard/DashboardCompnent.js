import React, { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MaterialTable, { MTableToolbar } from "material-table";

import { FieldFeedback, WrapperInput } from '../../common/CustomStyles';


import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Input, FormGroup, Label, Button } from 'reactstrap';
import { Modal } from 'react-bootstrap'

import { images } from '../../common/CommonUtils';
import { tableIcons } from '../../common/TableIcons';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';

import InputFormat from '../../common/InputComponent';


import CloseIcon from '@material-ui/icons/Close';


import FormView from './FormComponent';

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
        .required('Required!')
        .validatePhone(),
})

function Dashboard() {

    const [allEmployees, setAllEmployees] = React.useState([]);
    const [addModal, setAddModal] = React.useState();
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [emp, setEmp] = React.useState();

    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);

    React.useEffect(() => {
        const getUsers = async (values) => {
            axios.get("http://localhost:8080/api/users/tenant/" + user.tenantName)
                .then((response) => {
                    console.log(response.data);
                    setAllEmployees(response.data);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getUsers();
    }, [])

    const addEmployee = () => {
        setAddModal(true);
    }

    const editEmployee = (e) => {
        console.log("emp", emp);
    }

    const deleteEmployee = (e) => {
        console.log("delete", e);
        axios.delete("http://localhost:8080/api/users/delete?" + e.email)
            .then((response) => {
                console.log(response.data);
                setAllEmployees(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const tableColumns = [
        { title: "SN", field: "tableData.id", filtering: false, render: row => (row.tableData.id + 1) },
        { title: "Name", field: "firstName", render: row => (row.firstName + " " + row.lastName) },
        { title: "Designation", field: "designation" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "contactNumber" },
        {
            title: "Actions", field: "email", filtering: false, render: row =>
                <>
                    <div className="d-flex justify-content-between" style={{ width: '150px' }}>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Edit</Tooltip>}>
                                <tableIcons.Edit style={{ cursor: 'pointer' }} onClick={() => { setEditModal(true); setEmp(row) }} />
                            </OverlayTrigger>
                        </div>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Delete</Tooltip>}>
                                <tableIcons.Delete style={{ cursor: 'pointer' }} onClick={() => { setDeleteModal(true); setEmp(row) }} />
                            </OverlayTrigger>
                        </div>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">View Report</Tooltip>}>
                                <img src={images['report.png'].default} style={{ width: '25px', cursor: 'pointer' }} onClick={() => console.log(row)} />
                            </OverlayTrigger>
                        </div>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Download Report</Tooltip>}>
                                <tableIcons.Export style={{ width: '25px', cursor: 'pointer' }} onClick={() => console.log(row)} />
                            </OverlayTrigger>
                        </div>
                    </div>
                </>
        }
    ]

    const onSubmit = (values) => {
        console.log(values);
    }

    const initialValuesAdd = {
        firstname: '',
        lastname: '',
        email: '',
        designation: '',
        phone: '',
        gender: ''
    }

    const initialValuesEdit = {
        firstname: emp && emp.firstName,
        lastname: emp && emp.lastName,
        email: emp && emp.email,
        designation: emp && emp.designation,
        phone: emp && emp.contactNumber,
        gender: emp && emp.gender
    }

    const addEmpFormRef = React.useRef();
    const editEmpFormRef = React.useRef();

    return (
        <div className="col-10 offset-1">

            {/* Add Employee Modal */}
            <Modal show={addModal} onHide={() => setAddModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>New Employee</Modal.Title>
                    <CloseIcon onClick={() => setAddModal(false)} style={{ cursor: 'pointer' }} />
                </Modal.Header>

                <Modal.Body>
                    <Formik
                        initialValues={initialValuesAdd}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        innerRef={addEmpFormRef}
                    >
                        <FormView />
                    </Formik>
                </Modal.Body>

                <Modal.Footer>
                    <Button color="primary" onClick={() => addEmployee(emp)}>Save</Button>
                    <span></span>
                    <Button color="secondary" onClick={() => setAddModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Employee Modal */}
            <Modal show={editModal} onHide={() => setEditModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>{emp && (emp.firstName + " " + emp.lastName)}</Modal.Title>
                    <CloseIcon onClick={() => setEditModal(false)} style={{ cursor: 'pointer' }} />
                </Modal.Header>

                <Modal.Body>
                    <Formik
                        initialValues={initialValuesEdit}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        innerRef={editEmpFormRef}
                    >
                        <FormView />
                    </Formik>

                    <Button color="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
                    <Button color="primary" onClick={() => editEmployee(emp)}>Save</Button>
                </Modal.Body>
            </Modal>

            {/* Delete Employee Modal */}
            <Modal show={deleteModal} onHide={() => setDeleteModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>Are you sure you want to delete this employee's details?</Modal.Title>
                    <CloseIcon onClick={() => setDeleteModal(false)} style={{ cursor: 'pointer' }} />
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Button color='success' style={{marginRight: '20px'}} onClick={() => deleteEmployee(emp)}>Yes</Button>
                    <Button color='danger' onClick={() => setDeleteModal(false)}>No</Button>
                </Modal.Body>
            </Modal>


            <MaterialTable
                icons={tableIcons}
                // title="Employee Details"
                columns={tableColumns}
                // columns={[{ title: "Name", field: "firstName" },
                // { title: "Designation", field: "designation" }]}
                data={allEmployees}
                options={{
                    search: true,
                    // selection: false,
                    filtering: true,
                    // grouping: false,
                    // paging: false,
                    // searchFieldAlignment: 'left',

                }}
                components={{
                    Toolbar: (props) => (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <MTableToolbar {...props} />
                            <Button color="primary" onClick={() => setAddModal(true)}>+ Add Employee</Button>
                        </div>
                    )
                }}
            />
        </div>
    );
}

export default Dashboard;


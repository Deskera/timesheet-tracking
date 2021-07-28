import React, { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MaterialTable, { MTableToolbar } from "material-table";

import { FieldFeedback, WrapperInput } from '../../common/CustomStyles';

import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Input, FormGroup, Label } from 'reactstrap';
import { Modal } from 'react-bootstrap'

import { images, getUser } from '../../common/CommonUtils';
import { tableIcons } from '../../common/TableIcons';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';

import InputFormat from '../../common/InputComponent';


import CloseIcon from '@material-ui/icons/Close';


import FormView from './FormComponent';

import { baseUrl } from '../../common/baseUrl';

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

function Dashboard() {

    const [allEmployees, setAllEmployees] = React.useState([]);
    const [addModal, setAddModal] = React.useState();
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [emp, setEmp] = React.useState()
    const [num, setNum] = React.useState(0);

    const addEmpFormRef = React.useRef();
    const editEmpFormRef = React.useRef();

    // using localstorage created while admin login to access the tenantName
    React.useEffect(() => {
        const getUsers = async (values) => {
            axios.get(baseUrl + "api/users/tenant/" + getUser().tenantName)
                .then((response) => {
                    console.log(response.data);
                    setAllEmployees(response.data);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getUsers();
    }, [num])

    // saving new employee from modal
    const addEmployee = () => {
        console.log("addref", addEmpFormRef);
        addEmpFormRef.current.setTouched({
            firstname: true,
            lastname: true,
            email: true,
            designation: true,
            phone: true
        })
        addEmpFormRef.current.validateForm();

        const newEmp = {
            firstName: addEmpFormRef.current.values.firstname,
            lastName: addEmpFormRef.current.values.lastname,
            email: addEmpFormRef.current.values.email,
            designation: addEmpFormRef.current.values.designation,
            contactNumber: addEmpFormRef.current.values.phone,
            gender: addEmpFormRef.current.values.gender,
            joiningDate: addEmpFormRef.current.values.joiningDate,
            roleId: 2,
            tenantName: getUser().tenantName
        }
        axios.post((baseUrl + "api/users/save?password=Welcome" + newEmp.firstName), newEmp)
            .then(() => {
                setNum(num + 1);
                setAddModal(false);
            })
            .catch((err) => {
                if (err.response.data === "user already exists") {
                    console.log("a", addEmpFormRef);
                    addEmpFormRef.current.setFieldError("email", "Email already taken!")
                }
                console.log(err.response)
            })
    }

    // editing existing employee from modal
    const editEmployee = () => {
        // console.log("editemp", emp);

        editEmpFormRef.current.setTouched({
            firstname: true,
            lastname: true,
            email: true,
            designation: true,
            phone: true
        })
        editEmpFormRef.current.validateForm();

        const editEmp = {
            firstName: editEmpFormRef.current.values.firstname,
            lastName: editEmpFormRef.current.values.lastname,
            email: editEmpFormRef.current.values.email,
            designation: editEmpFormRef.current.values.designation,
            contactNumber: editEmpFormRef.current.values.phone,
            gender: editEmpFormRef.current.values.gender,
            joiningDate: editEmpFormRef.current.values.joiningDate,
            roleId: 2
        }
        axios.put((baseUrl + "api/users/edit"), editEmp)
            .then(() => {
                setNum(num + 1);
                setEditModal(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // deleting existing employee
    const deleteEmployee = () => {
        console.log("delete", emp.email);
        axios.delete(baseUrl + "api/users/delete?" + emp.email)
            .then((response) => {
                setNum(num + 1);
                console.log("res", response);
                setDeleteModal(false);
            })
            .catch((err) => {
                console.log("error", err)
            })

        setDeleteModal(false);
    }

    const initialValuesAdd = {
        firstname: '',
        lastname: '',
        email: '',
        designation: '',
        phone: '',
        gender: '',
        joiningDate: ''
    }

    const initialValuesEdit = {
        firstname: emp && emp.firstName,
        lastname: emp && emp.lastName,
        email: emp && emp.email,
        designation: emp && emp.designation,
        phone: emp && emp.contactNumber,
        gender: emp && emp.gender,
        joiningDate: emp && emp.joiningDate
    }

    const tableColumns = [
        { title: "SN", field: "tableData.id", filtering: false, render: row => (row.tableData.id + 1) },
        { title: "Name", field: "firstName", render: row => (row.firstName + " " + row.lastName) },
        { title: "Designation", field: "designation" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "contactNumber" },
        { title: "Joining Date", field: "joiningDate" },
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
                        // onSubmit={onSubmit}
                        innerRef={addEmpFormRef}
                    >
                        <FormView />
                    </Formik>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => addEmployee()}>Save</Button>
                    <span></span>
                    <Button className="btn-outline-danger" variant="" onClick={() => setAddModal(false)}>Cancel</Button>
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
                        // onSubmit={onSubmit}
                        innerRef={editEmpFormRef}
                    >
                        <FormView />
                    </Formik>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => editEmployee()}>Save</Button>
                    <span></span>
                    <Button className="btn-outline-danger" variant="" onClick={() => setEditModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Employee Modal */}
            <Modal show={deleteModal} onHide={() => setDeleteModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>Are you sure you want to delete this employee's details?</Modal.Title>
                    <CloseIcon onClick={() => setDeleteModal(false)} style={{ cursor: 'pointer' }} />
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Button variant='danger' style={{ marginRight: '20px' }} onClick={() => deleteEmployee()}>Yes</Button>
                    <Button variant='success' onClick={() => setDeleteModal(false)}>No</Button>
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
                            <Button variant="primary" className="m-3 p-1 px-2" onClick={() => setAddModal(true)}>Add Employee</Button>
                        </div>
                    )
                }}
            />
        </div>
    );
}

export default Dashboard;


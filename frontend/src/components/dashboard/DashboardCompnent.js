import React from 'react';
import axios from 'axios';
import MaterialTable, { MTableToolbar, MTablePagination, MTableBody, MTableCell, Paper, MTableBodyRow } from "material-table";

import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { Modal } from 'react-bootstrap'

import { images, getUser } from '../../common/CommonUtils';
import { tableIcons } from '../../common/TableIcons';

import { Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';



import CloseIcon from '@material-ui/icons/Close';


import FormView from './FormComponent';

import { baseUrl } from '../../common/baseUrl';

import OrganizationForm from './OrganizationForm';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import BeatLoader from "react-spinners/BeatLoader";


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

const validationSchemaOrg = Yup.object({
    tenantName: Yup.string()
        .required('Rwquired!'),

    country: Yup.string()
        .required('Required!'),

    firstname: Yup.string()
        .required('Required!'),

    lastname: Yup.string()
        .required('Required!'),

    email: Yup.string()
        .required('Required')
        .email('Invalid email format'),

    adminPhone: Yup.string()
        .validatePhone(),
})

function Dashboard() {

    const [loader, setLoader] = React.useState(false);

    const [allEmployees, setAllEmployees] = React.useState([]);
    const [addModal, setAddModal] = React.useState();
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [orgModal, setOrgModal] = React.useState(false);
    const [emp, setEmp] = React.useState()
    const [num, setNum] = React.useState(0);

    const addEmpFormRef = React.useRef();
    const editEmpFormRef = React.useRef();
    const editOrgFormRef = React.useState();

    // console.log("aaa", getUser());

    // using localstorage created while admin login to access the tenantName
    React.useEffect(() => {
        const getUsers = async (values) => {
            setLoader(true);
            axios.get(baseUrl + "api/users/tenant/" + getUser().tenantDto.tenantName)
                .then((response) => {
                    console.log("aa", response.data);
                    setAllEmployees(response.data);
                    setLoader(false);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getUsers();
    }, [num])

    // editing company info
    const editOrg = () => {
        // console.log("called");
        const editOrg = {
            tenantName: editOrgFormRef.current.values.tenantName,
            country: editOrgFormRef.current.values.country,
            websiteUrl: editOrgFormRef.current.values.websiteUrl,
            contact: editOrgFormRef.current.values.contact
        }

        const editAdmin = {
            firstName: editOrgFormRef.current.values.firstname,
            lastName: editOrgFormRef.current.values.lastname,
            email: editOrgFormRef.current.values.email,
            contactNumber: editOrgFormRef.current.values.adminPhone,
            gender: editOrgFormRef.current.values.gender,
            roleId: 1,
        }

        axios.put((baseUrl + "api/tenants/edit"), editOrg)
            .then(() => {
                console.log("abc");
                setNum(num + 1);
                var user = getUser();
                user.tenantDto = editOrg;
                localStorage.setItem("user", JSON.stringify(user));
                setOrgModal(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // saving new employee from modal
    const addEmployee = () => {
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
        // console.log("delete", emp.email);
        axios.delete(baseUrl + "api/users/delete?email=" + emp.userDto.email)
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

    const initialValuesOrgEdit = {
        tenantName: getUser().tenantDto.tenantName,
        country: getUser().tenantDto.country,
        websiteUrl: getUser().tenantDto.websiteUrl,
        contact: getUser().tenantDto.contact
    }

    const tableColumns = [
        { title: "Employee ID", field: "userId", filtering: false },
        { title: "Name", field: "userDto.firstName", render: row => (row.userDto.firstName + " " + row.userDto.lastName) },
        { title: "Role", field: "userDto.roleId", render: row => (row.userDto.roleId == 1 ? 'Admin' : 'User') },
        { title: "Designation", field: "userDto.designation" },
        { title: "Email", field: "userDto.email" },
        // { title: "Phone", field: "contactNumber" },
        { title: "Joining Date", field: "userDto.joiningDate" },
        {
            title: "Actions", field: "email", filtering: false, render: row =>
                <>
                    <div className="d-flex justify-content-between" style={{ width: '150px' }}>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Edit</Tooltip>}>
                                <tableIcons.Edit style={{ cursor: 'pointer' }} onClick={() => { setEditModal(true); console.log("ab", row); setEmp(row.userDto) }} />
                            </OverlayTrigger>
                        </div>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Delete</Tooltip>}>
                                <tableIcons.Delete style={{ cursor: 'pointer' }} onClick={() => { setDeleteModal(true); setEmp(row) }} />
                            </OverlayTrigger>
                        </div>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">View Report</Tooltip>}>
                                <img src={images['report.png'].default} alt="download report icon" style={{ width: '25px', cursor: 'pointer' }} onClick={() => console.log(row)} />
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

    const Loader = () => {
        return (
            <BeatLoader speedMultiplier="1" color="#000" loading={loader} size={30} />
        )
    }

    return (
        <div className="container">
            <div className="mt-1 text-center d-flex justify-content-between align-items-center bg-white">
                {/* <img className="col-2" src={images['logo.png'].default} alt="Company logo" style={{ width: '' }} /> */}
                <div className="ms-4" style={{ margni: 'auto 0' }}>
                    <h2 className="" style={{ fontSize: '20px', margin: '0' }}>{getUser().tenantDto.tenantName}</h2>
                    <p className="" style={{ fontSize: '15px', margin: '0' }}>Company Dashboard</p>
                </div>
                <h3 className="display-6" style={{ color: 'blue' }}>Welcome {getUser().userDto.firstName}</h3>

                <div className="me-4" style={{}}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="admin">Company Profile</Tooltip>}>
                        <tableIcons.Business style={{ cursor: 'pointer', fontSize: '50px' }} onClick={() => setOrgModal(true)} />
                    </OverlayTrigger>
                </div>
            </div>

            <div className="mt-5 d-flex justify-content-between">
                <div className="display-6">
                    Employees
                </div>
                <div className="">
                    <Button variant="primary" className="p-3" onClick={() => setAddModal(true)}>
                        <tableIcons.AddIcon style={{ marginTop: '-4px' }} />
                        {' '}ADD EMPLOYEE
                    </Button>
                </div>
            </div>

            {/* original dashboard */}
            <div className="row">
                <div className="col-12">

                    {/* Edit Organization */}
                    <Modal show={orgModal} onHide={() => setOrgModal(false)} centered>
                        <Modal.Header>
                            <Modal.Title>Company Details</Modal.Title>
                            <CloseIcon onClick={() => setOrgModal(false)} style={{ cursor: 'pointer' }} />
                        </Modal.Header>

                        <Modal.Body>
                            <Formik
                                initialValues={initialValuesOrgEdit}
                                validationSchema={validationSchemaOrg}
                                onSubmit={() => editOrg()}
                                innerRef={editOrgFormRef}
                            >
                                <OrganizationForm />
                            </Formik>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={() => editOrgFormRef.current.submitForm()}>Save</Button>
                            <span></span>
                            <Button className="btn-outline-danger" variant="" onClick={() => setOrgModal(false)}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>

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
                                onSubmit={() => addEmployee()}
                                innerRef={addEmpFormRef}
                            >
                                <FormView />
                            </Formik>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={() => addEmpFormRef.current.submitForm()}>Save</Button>
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

                        <Modal.Body className="modal-body-scroll" >
                            <Formik
                                initialValues={initialValuesEdit}
                                validationSchema={validationSchema}
                                onSubmit={() => editEmployee()}
                                innerRef={editEmpFormRef}
                            >
                                <FormView />
                            </Formik>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={() => editEmpFormRef.current.submitForm()}>Save</Button>
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
                            <Button variant='success' style={{ marginRight: '20px' }} onClick={() => deleteEmployee()}>Yes</Button>
                            <Button variant='danger' onClick={() => setDeleteModal(false)}>No</Button>
                        </Modal.Body>
                    </Modal>


                    <MaterialTable
                        localization={{
                            body: {
                                emptyDataSourceMessage:
                                    <>
                                        <Loader />
                                        <p>Fetching Employess...</p>
                                    </>
                            }
                        }}
                        icons={tableIcons}
                        // title="Employee Details"
                        columns={tableColumns}
                        // columns={[{ title: "Name", field: "firstName" },
                        // { title: "Designation", field: "designation" }]}
                        data={allEmployees}
                        options={{
                            showTitle: false,
                            search: true,
                            // selection: true,
                            // paging: true,
                            // pageSize: 10
                            // filtering: true,
                            // grouping: false,
                            // paging: false,
                            // searchFieldAlignment: 'left',

                        }}
                        components={{
                            // Body: (props) => {
                            //     return (
                            //         // <div className="bg-warning" style={{width: '100vw'}}>
                            //             // {/* abc */}
                            //         // {/* </div> */}
                            //         // <>
                            //         //     {
                            //         //         loader ?
                            //         //             <Loader />
                            //         //             :
                            //                     <MTableBody {...props} />
                            //         //     }
                            //         // </>
                            //     )
                            // },
                            Toolbar: (props) => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <MTableToolbar {...props} />
                                    </div>
                                );

                            },
                            Pagination: props => {
                                return (
                                    <div className="" style={{ margin: '0 auto', width: '250px' }}>
                                        <div>
                                            <MTablePagination {...props} />
                                            {/* <MTableBodyRow {...props} /> */}
                                        </div>
                                    </div>
                                );
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


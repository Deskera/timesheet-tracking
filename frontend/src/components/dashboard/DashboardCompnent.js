import React from 'react';
import axios from 'axios';
import MaterialTable, { MTableToolbar, MTablePagination, MTableBodyRow } from "material-table";

import { OverlayTrigger, Tooltip, Button, Modal } from "react-bootstrap";

import { images, getUser } from '../../common/CommonUtils';
import { tableIcons } from '../../common/TableIcons';

import { useHistory } from 'react-router-dom';


import { Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import CloseIcon from '@material-ui/icons/Close';


import UserForm from './UserForm';

import { baseUrl } from '../../common/baseUrl';

import OrganizationForm from './OrganizationForm';


import { BeatLoader, PulseLoader } from "react-spinners";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TablePagination } from '@material-ui/core';




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
        .required('Required!')
})

function Dashboard() {

    const [tableLoader, setTableLoader] = React.useState(false);
    const [saveLoader, setSaveLoader] = React.useState(false);

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

    const [companyMenu, setCompanyMenu] = React.useState(null);

    const handleClick = (event) => {
        setCompanyMenu(event.currentTarget);
    };

    const handleClose = () => {
        setCompanyMenu(null);
    };

    const history = useHistory();

    const logOut = () => {
        setCompanyMenu(null);
        localStorage.clear();
        history.push("/login");
    }

    // const notify = () => toast("Wow so easy!");

    // using localstorage created while admin login to access the tenantName
    React.useEffect(() => {
        const getUsers = async (values) => {
            setTableLoader(true);
            axios.get(baseUrl + "api/users/tenant/" + getUser().tenantDto.tenantName)
                .then((response) => {
                    console.log("aa", response.data);
                    setAllEmployees(response.data);
                    setTableLoader(false);
                })
                .catch((err) => {
                    setTableLoader(false);
                    console.log(err)
                })
        }
        getUsers();
    }, [num])

    // editing company info
    const editOrg = () => {
        console.log("hello");
        console.log("abcc", editOrgFormRef);
        const editOrg = {
            tenantName: getUser().tenantDto.tenantName,
            country: editOrgFormRef.current.values.country,
            websiteUrl: editOrgFormRef.current.values.websiteUrl,
            contact: editOrgFormRef.current.values.contact
        }

        setSaveLoader(true);


        console.log("gobar", editOrg);

        axios.put((baseUrl + "api/tenants/edit"), editOrg)
            .then(() => {
                setNum(num + 1);
                var user = getUser();
                user.tenantDto = editOrg;
                localStorage.setItem("user", JSON.stringify(user));
                setSaveLoader(false);
                setOrgModal(false);
                toast.success("Company updated successfully!");
            })
            .catch((err) => {
                setSaveLoader(false);
                console.log(err)
            })
    }

    // saving new employee from modal
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
                setNum(num + 1);
                setSaveLoader(false);
                setAddModal(false);
                toast.success("Employee added successfully!");
            })
            .catch((err) => {
                setSaveLoader(false);
                if (err.response.data === "user already exists") {
                    console.log("a", addEmpFormRef);
                    addEmpFormRef.current.setFieldError("email", "Email already taken!")
                }
                console.log(err.response)
            })
    }

    // editing existing employee from modal
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

        axios.put((baseUrl + "api/users/edit"), editEmp)
            .then(() => {
                setNum(num + 1);
                toast.success("Employee updated successfully!");
                setSaveLoader(false);
                setEditModal(false);
            })
            .catch((err) => {
                setSaveLoader(false);
                if (err.response.data === "email already exists") {
                    editEmpFormRef.current.setFieldError("email", "Email already taken!")
                }
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
                toast.success("Employee deleted successfully!");
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
        firstname: emp && emp.userDto.firstName,
        lastname: emp && emp.userDto.lastName,
        email: emp && emp.userDto.email,
        designation: emp && emp.userDto.designation,
        phone: emp && emp.userDto.contactNumber,
        gender: emp && emp.userDto.gender,
        joiningDate: emp && emp.userDto.joiningDate,
        roleId: emp && emp.userDto.roleId
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
        { title: "Role", field: "userDto.roleId", render: row => (row.userDto.roleId === 1 ? 'Admin' : 'Employee') },
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
                                <tableIcons.Edit style={{ cursor: 'pointer' }} onClick={() => { setEditModal(true); console.log("ab", row); setEmp(row) }} />
                            </OverlayTrigger>
                        </div>
                        {
                            row.userDto.roleId === 2 ?
                                <>
                                    <div>
                                        <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Delete</Tooltip>}>
                                            <tableIcons.Delete style={{ cursor: 'pointer' }} onClick={() => { setDeleteModal(true); setEmp(row) }} />
                                        </OverlayTrigger>
                                    </div>
                                    <div>
                                        <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">View Report</Tooltip>}>
                                            <img src={images['report.png'].default} alt="download report icon" style={{ width: '25px', cursor: 'pointer' }} onClick={() => { alert("This feature is currently not available!"); console.log(row) }} />
                                        </OverlayTrigger>
                                    </div>
                                    <div>
                                        <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Download Report</Tooltip>}>
                                            <tableIcons.Export style={{ width: '25px', cursor: 'pointer' }} onClick={() => { alert("This feature is currently not available!"); console.log(row) }} />
                                        </OverlayTrigger>
                                    </div>
                                </>
                                :
                                null
                        }
                    </div>
                </>
        }
    ]

    const TableLoader = () => {
        return (
            <BeatLoader speedMultiplier="1" color="#000" loading={tableLoader} size={30} />
        )
    }

    const SaveLoader = () => {
        return (
            <PulseLoader speedMultiplier="1" color="#fff" loading={saveLoader} size={8} />
        )
    }

    return (
        <div className="container">
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
            <Menu

                anchorEl={companyMenu}
                keepMounted
                open={Boolean(companyMenu)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { setOrgModal(true); setCompanyMenu(null) }}>Company Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>




            <div className="mt-1 text-center d-flex justify-content-between align-items-center bg-white">
                {/* <img className="col-2" src={images['logo.png'].default} alt="Company logo" style={{ width: '' }} /> */}
                <div className="ms-4" style={{ margni: 'auto 0' }}>
                    <h2 className="" style={{ fontSize: '20px', margin: '0' }}>{getUser().tenantDto.tenantName}</h2>
                    <p className="" style={{ fontSize: '15px', margin: '0' }}>Company Dashboard</p>
                </div>
                <h3 className="display-6" style={{ color: 'blue' }}>Welcome {getUser().userDto.firstName}</h3>

                <div className="me-4" style={{}}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="admin">Company</Tooltip>}>
                        <tableIcons.Business style={{ cursor: 'pointer', fontSize: '50px' }} onClick={handleClick} />
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
                            <Modal.Title>{getUser().tenantDto.tenantName}: Company Details</Modal.Title>
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
                            <Button variant="primary" onClick={() => editOrgFormRef.current.submitForm()}>{saveLoader ? <SaveLoader /> : "Save"}</Button>
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

                        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                            <Formik
                                initialValues={initialValuesAdd}
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
                            <Button className="btn-outline-danger" variant="" onClick={() => setAddModal(false)}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Edit Employee Modal */}
                    <Modal show={editModal} onHide={() => setEditModal(false)} centered>
                        <Modal.Header>
                            <Modal.Title>{emp && (emp.userDto.firstName + " " + emp.userDto.lastName)}</Modal.Title>
                            <CloseIcon onClick={() => setEditModal(false)} style={{ cursor: 'pointer' }} />
                        </Modal.Header>

                        <Modal.Body className="modal-body-scroll" style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                            <Formik
                                initialValues={initialValuesEdit}
                                validationSchema={validationSchema}
                                onSubmit={() => editEmployee()}
                                innerRef={editEmpFormRef}
                            >
                                <UserForm />
                            </Formik>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button style={{ width: "80px" }} variant="primary" onClick={() => editEmpFormRef.current.submitForm()}>{saveLoader ? <SaveLoader /> : "Save"}</Button>
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
                                        <TableLoader />
                                        <p>Fetching Employess...</p>
                                    </>
                            }
                        }}
                        icons={tableIcons}
                        columns={tableColumns}

                        data={allEmployees}
                        options={{
                            showTitle: false,
                            search: true,
                            rowStyle: rowData => ({
                                backgroundColor: rowData.userDto.roleId === 1 ? '#e3dedc' : ''
                            })
                        }}
                        components={{
                            // Container: (props) => {
                            //     return (
                            //         // <div className="bg-info">
                            //             <Paper {...props} />
                            //         // {/* </div> */}
                            //     )
                            // },
                            Toolbar: (props) => {
                                return (
                                    <div style={{ display: "flex", justifyContent: "flex-start" }} >
                                        <MTableToolbar {...props} />
                                    </div>
                                );

                            },
                            Pagination: props => {
                                return (
                                    <div style={{ margin: '0 auto', width: '320px' }}>
                                        <TablePagination {...props} />
                                    </div>
                                );
                            },
                            Row: props => {
                                return (
                                    <>
                                        {/* {console.log("mmm", props)} */}
                                        {/* {props.data.userDto.roleId === 1 ?
                                        <button>abc</button>
                                        : null} */}
                                        <MTableBodyRow {...props} />
                                    </>
                                )
                            },
                            // Container: props => {
                            //     return (
                            //         <span className="bg-warning">
                            //             <Paper {...props} />
                            //         </span>
                            //     )
                            // }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


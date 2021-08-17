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
import { baseUrl } from '../../common/baseUrl';
import { BeatLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';
import { TablePagination } from '@material-ui/core';
import EditOrgModal from './Organization/EditOrgModal';
import AddModal from './User/AddModal';
import EditModal from './User/EditModal';
import DeleteModal from './User/DeleteModal';

function Dashboard() {

    const [tableLoader, setTableLoader] = React.useState(false);

    const [allEmployees, setAllEmployees] = React.useState([]);
    const [addModal, setAddModal] = React.useState();
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [orgModal, setOrgModal] = React.useState(false);
    const [emp, setEmp] = React.useState()
    const [num, setNum] = React.useState(0);

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


    // using localstorage created while admin login to access the tenantName
    React.useEffect(() => {
        const getUsers = async (values) => {
            setTableLoader(true);
            axios.get(baseUrl + "api/users/tenant/" + getUser().tenantDto.tenantName, {
                params: {
                    page: 0,
                    size: 20
                }
            })
                .then((response) => {
                    // console.log("aa", response.data);
                    setAllEmployees(response.data.users);
                    setTableLoader(false);
                })
                .catch((err) => {
                    setTableLoader(false);
                    console.log(err)
                })
        }
        getUsers();
    }, [num])

    const tableColumns = [
        { title: "Employee ID", field: "userId", filtering: false },
        {
            title: "Name",
            field: "userDto.firstName",
            render: row => (row.userDto.firstName + " " + row.userDto.lastName)
            // customFilterAndSearch: (term, rowData) => 
        },
        // { title: "Role", field: "userDto.roleId", render: row => (row.userDto.roleId === 1 ? 'Admin' : 'Employee') },
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
                                <tableIcons.Edit style={{ cursor: 'pointer' }} onClick={() => { setEditModal(true); setEmp(row) }} />
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

    const handleSearch = (value) => {
        console.log("mmmm", value)
    }

    return (
        <div className="container">
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

                <h3 className="display-6 ms-4" style={{ color: 'blue', fontSize: '28px' }}>Welcome {getUser().userDto.firstName}</h3>

                <div className="me-4 d-flex justify-content-between" style={{ width: '200px' }}>
                    <div>
                        <h2 className="" style={{ fontSize: '20px', margin: '0' }}>{getUser().tenantDto.tenantName}</h2>
                        <p className="" style={{ fontSize: '15px', margin: '0' }}>Company Dashboard</p>
                    </div>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="admin">Company</Tooltip>}>
                        <tableIcons.Business style={{ cursor: 'pointer', fontSize: '50px' }} onClick={handleClick} />
                    </OverlayTrigger>
                </div>
            </div>

            <div>
                <input type="text" onChange={(v) => handleSearch(v)} />
            </div>

            <div className="mt-5 d-flex justify-content-end">
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
                    <EditOrgModal
                        show={orgModal}
                        handleClose={() => setOrgModal(false)}
                        renderAgain={() => setNum(num + 1)}
                    />

                    {/* Add Employee Modal */}
                    <AddModal
                        show={addModal}
                        handleClose={() => setAddModal(false)}
                        renderAgain={() => setNum(num + 1)}
                    />

                    {/* Edit Employee Modal */}
                    <EditModal
                        show={editModal}
                        emp={emp}
                        handleClose={() => setEditModal(false)}
                        renderAgain={() => setNum(num + 1)}
                    />

                    {/* Delete Employee Modal */}
                    <DeleteModal
                        show={deleteModal}
                        emp={emp}
                        handleClose={() => setDeleteModal(false)}
                        renderAgain={() => setNum(num + 1)}
                    />

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
                            Toolbar: (props) => {
                                return (
                                    <div className="d-flex justify-content-between px-3">
                                        <div className="display-6">
                                            Employees
                                        </div>
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


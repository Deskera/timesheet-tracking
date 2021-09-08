import React from 'react';
import { OverlayTrigger, Tooltip, Button, Modal } from "react-bootstrap";
import { images, getUser } from '../../common/CommonUtils';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import BusinessIcon from '@material-ui/icons/Business';
import 'react-toastify/dist/ReactToastify.css';
import EditOrgModal from './Organization/EditOrgModal';
import AddModal from './User/AddModal';
import EditModal from './User/EditModal';
import DeleteModal from './User/DeleteModal';
import EmployeeTable from './Table/EmployeeTable';
import { baseUrl } from '../../common/baseUrl';
import axios from 'axios';

function Dashboard() {

    // const [allEmployees, setAllEmployees] = React.useState([]);
    const [addModal, setAddModal] = React.useState();
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [orgModal, setOrgModal] = React.useState(false);
    const [emp, setEmp] = React.useState()
    const [num, setNum] = React.useState(0);

    const [companyMenu, setCompanyMenu] = React.useState(null);


    const abc = React.useRef();
    const handleClick = (event) => {
        setCompanyMenu(event.currentTarget);
    };

    const handleClose = () => {
        setCompanyMenu(null);
    };

    const history = useHistory();

    const logOut = () => {
        setCompanyMenu(null);
        axios.get(baseUrl + "api/users/logout?uid=" + getUser().userId)
            .then((response) => {
                console.log("a", response);
                localStorage.clear();
                history.push("/login");
            })
            .catch((err) => {
                console.log(err.response)
            })
    }


    // using localstorage created while admin login to access the tenantName
    // React.useEffect(() => {
    //     const getUsers = async (values) => {
    //         setTableLoader(true);
    //         axios.get(baseUrl + "api/users/tenant/" + getUser().tenantDto.tenantName, {
    //             params: {
    //                 page: 0,
    //                 size: 10
    //             }
    //         })
    //             .then((response) => {
    //                 console.log("aa", response);
    //                 setAllEmployees(response.data.users);
    //                 setTableLoader(false);
    //             })
    //             .catch((err) => {
    //                 setTableLoader(false);
    //                 console.log(err)
    //             })
    //     }
    //     getUsers();
    // }, [num])
    const tableRef = React.createRef();


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

                <h3 className="display-6 ms-4" style={{ color: 'blue', fontSize: '28px' }}>Welcome {getUser().user.userDto.firstName}</h3>

                <div className="me-4 d-flex justify-content-between" style={{ width: '200px' }}>
                    <div>
                        <h2 className="" style={{ fontSize: '20px', margin: '0' }}>{getUser().user.tenantDto.tenantName}</h2>
                        <p className="" style={{ fontSize: '15px', margin: '0' }}>Company Dashboard</p>
                    </div>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="admin">Company</Tooltip>}>
                        <BusinessIcon style={{ cursor: 'pointer', fontSize: '50px' }} onClick={handleClick} />
                    </OverlayTrigger>
                </div>
            </div>

            <div className="mt-5 d-flex justify-content-end">
                <div className="">
                    <Button variant="primary" className="p-3" onClick={() => setAddModal(true)}>
                        <AddIcon style={{ marginTop: '-4px' }} />
                        {' '}ADD EMPLOYEE
                    </Button>
                </div>
            </div>

            {/* original dashboard */}
            <div className="row">
                <div className="col-12">

                    {/* Edit Organization */}
                    <EditOrgModal
                        tableRef={tableRef}
                        show={orgModal}
                        handleClose={() => setOrgModal(false)}
                        renderAgain={() => setNum(num + 1)}
                    />

                    {/* Add Employee Modal */}
                    <AddModal
                        tableRef={tableRef}
                        show={addModal}
                        handleClose={() => setAddModal(false)}
                        renderAgain={() => setNum(num + 1)}
                    />

                    {/* Edit Employee Modal */}
                    <EditModal
                        tableRef={tableRef}
                        show={editModal}
                        emp={emp}
                        handleClose={() => setEditModal(false)}
                    // renderAgain={() => setNum(num + 1)}
                    />

                    {/* Delete Employee Modal */}
                    <DeleteModal
                        tableRef={tableRef}
                        show={deleteModal}
                        emp={emp}
                        handleClose={() => setDeleteModal(false)}
                        renderAgain={() => setNum(num + 1)}
                    />

                    {/* Employee Table using Material Table */}
                    <EmployeeTable
                        tableRef={tableRef}
                        setEmp={setEmp}
                        openEditOrgModal={() => setOrgModal(true)}
                        openAddModal={() => setDeleteModal(true)}
                        openEditModal={() => setEditModal(true)}
                        openDeleteModal={() => setDeleteModal(true)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


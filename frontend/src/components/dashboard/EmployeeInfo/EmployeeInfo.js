import React from 'react';
import { OverlayTrigger, Tooltip, Button, Modal } from "react-bootstrap";

import 'react-toastify/dist/ReactToastify.css';
// import EditOrgModal from '../Organization/EditOrgModal';
import EditModal from '../User/EditModal';
import AddModal from '../User/AddModal';
import DeleteModal from '../User/DeleteModal';
import EmployeeTable from './EmployeeTable';

function Dashboard() {

    // const [allEmployees, setAllEmployees] = React.useState([]);
    const [addModal, setAddModal] = React.useState();
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    // const [orgModal, setOrgModal] = React.useState(false);
    const [emp, setEmp] = React.useState()
    const [num, setNum] = React.useState(0);

    // const [companyMenu, setCompanyMenu] = React.useState(null);


    // const handleClick = (event) => {
    //     setCompanyMenu(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setCompanyMenu(null);
    // };

    // const history = useHistory();

    // const logOut = () => {
    //     console.log("manu out");
    //     setCompanyMenu(null);
    //     localStorage.clear();
    //     history.push("/login");
    // }

    const tableRef = React.createRef();

    return (
        <>
            {/* <div className="container"> */}
            {/* <Menu
                anchorEl={companyMenu}
                keepMounted
                open={Boolean(companyMenu)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { setOrgModal(true); setCompanyMenu(null) }}>Company Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu> */}

            {/* <div className="mt-4 text-center d-flex justify-content-center align-items-center bg-white"> */}
            {/* <div> */}
            {/* <h2 className="" style={{ fontSize: '40px', margin: '0' }}>{getUser().user.tenantDto.tenantName}</h2> */}
            {/* <p className="" style={{ fontSize: '20px', margin: '0' }}>Company Dashboard</p> */}
            {/* </div> */}
            {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="admin">Company</Tooltip>}> */}
            {/* <BusinessIcon style={{ cursor: 'pointer', fontSize: '50px' }} onClick={handleClick} /> */}
            {/* </OverlayTrigger> */}
            {/* </div> */}

            {/* original dashboard */}
            <div className="mt-3" style={{ backgroundColor: '#f0ede6', height: '100vh' }}>
                <div className="pt-3 ps-3" style={{ fontSize: '25px' }}>Employee Table</div>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80px' }}>
                    <Button variant="primary" className="p-3 d-flex justify-content-center align-items-center" style={{ width: '200px', height: '50px' }} onClick={() => setAddModal(true)}>
                        {/* <AddIcon /> */}
                        {' '}ADD EMPLOYEE
                    </Button>
                </div>
                <div className="col-12">

                    {/* Edit Organization */}
                    {/* <EditOrgModal
                        tableRef={tableRef}
                        show={orgModal}
                        handleClose={() => setOrgModal(false)}
                        renderAgain={() => setNum(num + 1)}
                    /> */}

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
                        // openEditOrgModal={() => setOrgModal(true)}
                        openAddModal={() => setDeleteModal(true)}
                        openEditModal={() => setEditModal(true)}
                        openDeleteModal={() => setDeleteModal(true)}
                    />
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export default Dashboard;


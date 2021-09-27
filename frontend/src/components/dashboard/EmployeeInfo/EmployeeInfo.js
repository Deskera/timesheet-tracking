import React from 'react';
import { Button } from "react-bootstrap";

import 'react-toastify/dist/ReactToastify.css';
import EditModal from './user/EditModal';
import AddModal from './user/AddModal';
import DeleteModal from './user/DeleteModal';
import EmployeeTable from './EmployeeTable';

function EmployeeInfo() {

    const [addModal, setAddModal] = React.useState();
    const [editModal, setEditModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [emp, setEmp] = React.useState()

    const tableRef = React.createRef();

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div style={{ fontSize: '25px' }}>Employee Table</div>
            </div>
            <div className="d-flex justify-content-start align-items-center" style={{ height: '80px' }}>
                <Button variant="primary" className="p-3 d-flex justify-content-center align-items-center" style={{ width: '200px', height: '50px' }} onClick={() => setAddModal(true)}>
                    {/* <AddIcon /> */}
                    {' '}ADD EMPLOYEE
                </Button>
            </div>
            <div className="col-12">

                {/* Add Employee Modal */}
                <AddModal
                    tableRef={tableRef}
                    show={addModal}
                    handleClose={() => setAddModal(false)}
                />

                {/* Edit Employee Modal */}
                <EditModal
                    tableRef={tableRef}
                    show={editModal}
                    emp={emp}
                    handleClose={() => setEditModal(false)}
                />

                {/* Delete Employee Modal */}
                <DeleteModal
                    tableRef={tableRef}
                    show={deleteModal}
                    emp={emp}
                    handleClose={() => setDeleteModal(false)}
                />

                {/* Employee Table using Material Table */}
                <EmployeeTable
                    tableRef={tableRef}
                    setEmp={setEmp}
                    openAddModal={() => setDeleteModal(true)}
                    openEditModal={() => setEditModal(true)}
                    openDeleteModal={() => setDeleteModal(true)}
                />
            </div>
        </>
    );
}

export default EmployeeInfo;


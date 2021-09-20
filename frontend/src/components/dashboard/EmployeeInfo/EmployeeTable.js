import React from 'react';
import MaterialTable, { MTableToolbar, MTableBodyRow, Paper } from "material-table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { tableIcons } from './TableIcons';
import { TablePagination } from '@material-ui/core';
import { baseUrl } from '../../../common/baseUrl';
import { BeatLoader } from "react-spinners";
import { images, getUser } from '../../../common/CommonUtils';
import axios from 'axios';

function EmployeeTable(props) {

    const { tableRef, setEmp, openEditModal, openDeleteModal } = props;

    const [tableLoader, setTableLoader] = React.useState(false);

    const tableColumns = [
        {
            title: "Employee ID", field: "userId", filtering: false
        },
        {
            title: "Name",
            field: "userDto.firstName",
            render: row => (row.userDto.firstName + " " + row.userDto.lastName),
            customFilterAndSearch: (term, rowData) => {
                console.log("aaab", term, rowData)
            }
        },
        // { title: "Role", field: "userDto.roleId", render: row => (row.userDto.roleId === 1 ? 'Admin' : 'Employee') },
        { title: "Designation", field: "userDto.designation" },
        { title: "Email", field: "userDto.email" },
        // { title: "Phone", field: "userDto.contactNumber" },
        { title: "Joining Date", field: "userDto.joiningDate" },
        {
            title: "Actions", field: "email", filtering: false, render: row =>
                <>
                    <div className="d-flex justify-content-between" style={{ width: '150px' }}>
                        <div>
                            <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Edit</Tooltip>}>
                                <tableIcons.Edit style={{ cursor: 'pointer' }} onClick={() => { openEditModal(); setEmp(row) }} />
                            </OverlayTrigger>
                        </div>
                        {
                            row.userDto.roleId === 2 ?
                                <>
                                    <div>
                                        <OverlayTrigger overlay={<Tooltip id="profile-edit-tooltip">Delete</Tooltip>}>
                                            <tableIcons.Delete style={{ cursor: 'pointer' }} onClick={() => { openDeleteModal(); setEmp(row) }} />
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

    return (
        <>
            <MaterialTable
                tableRef={tableRef}
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

                data={query =>
                    new Promise((resolve, reject) => {
                        console.log("rrrr", query);

                        let filters = {};
                        if (query.filters) {
                            query.filters.map((filter) => {
                                filters[`${filter.column.field}`.split(".")[1]] = filter.value;
                            })
                        }

                        axios.get(baseUrl + "api/users/tenant/" + getUser().user.tenantDto.tenantName + "?", {
                            params: {
                                page: query.page,
                                size: query.pageSize,
                                sort: query.orderBy && (`${query.orderBy.field}`.split(".")[1] + "," + query.orderDirection.toUpperCase()),
                                name: filters.firstName && filters.firstName,
                                email: filters.email && filters.email,
                                contactnumber: filters.contactnumber && filters.contactnumber,
                                designation: filters.designation && filters.designation,
                                joiningDate: filters.joiningDate && filters.joiningDate,
                                gender: filters.gender && filters.gender,
                            }
                        })
                            .then((response) => {
                                console.log("abcd", response.data.users);
                                resolve({
                                    data: response.data.users,
                                    page: response.data.currentPage,
                                    totalCount: response.data.totalItems,
                                });
                            })
                            .catch((err) => {
                                setTableLoader(false);
                                console.log(err)
                            })
                    })
                }
                options={{
                    showTitle: false,
                    search: false,
                    filtering: true,
                    debounceInterval: 700,
                    padding: "dense",
                    rowStyle:
                        rowData => ({
                            fontSize: 14,
                            fontFamily: 'Cursive',
                            backgroundColor: rowData.userDto.roleId === 1 ? '#e3dedc' : ''
                        }),
                    headerStyle: {
                        fontWeight: 'bold',
                        fontSize: 16,
                    }
                }}
                components={{
                    Toolbar: (props) => {
                        return (
                            <div className="d-flex justify-content-between px-3">
                                {/* <div className="display-6">
                                    Employees
                                </div> */}
                                {/* <MTableToolbar {...props} /> */}
                            </div>
                        );
                    },
                    Pagination: props => {
                        return (
                            <div style={{ margin: '0 auto', width: '330px' }}>
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
        </>
    )
}

export default EmployeeTable;
import React from 'react';
import MaterialTable, { MTableToolbar, MTableBodyRow, Paper } from "material-table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { tableIcons } from '../employeeInfo/TableIcons';
import { TablePagination } from '@material-ui/core';
import { baseUrl } from '../../../common/baseUrl';
import { BeatLoader } from "react-spinners";
import { images, getUser } from '../../../common/CommonUtils';
import axios from 'axios';

function MyReport() {

    // const { tableRef, setEmp, openEditModal, openDeleteModal } = props;

    const [tableLoader, setTableLoader] = React.useState(false);

    const tableColumns = [
        { title: "First Login", field: "firstLogin", filtering: false },
        { title: "Last Login", field: "lastLogout", filtering: false },
        { title: "Total Work Hours", field: "workHours", filtering: false },
    ]

    const TableLoader = () => {
        return (
            <BeatLoader speedMultiplier="1" color="#000" loading={tableLoader} size={30} />
        )
    }

    return (
        <div>
            <div className="mb-5" style={{ fontSize: '20px' }}>
                My Attendance Report
            </div>
            <MaterialTable
                // tableRef={tableRef}
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

                        axios.get(baseUrl + "api/users/worktimehistory" + "?", {
                            params: {
                                uid: 2,
                                // page: 1,
                                // size: 10,
                                // sort: query.orderBy && (`${query.orderBy.field}`.split(".")[1] + "," + query.orderDirection.toUpperCase()),
                            }
                        })
                            .then((response) => {
                                console.log("abcd", response);
                                resolve({
                                    data: response.data.worktimehistory,
                                    page: response.data.currentPage,
                                    totalCount: response.data.totalItems,
                                });
                            })
                            .catch((err) => {
                                setTableLoader(false);
                                console.log("error", err)
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
                            // backgroundColor: rowData.userDto.roleId === 1 ? '#e3dedc' : ''
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
                                <MTableBodyRow {...props} />
                            </>
                        )
                    },
                }}
            />
        </div>
    )
}

export default MyReport;
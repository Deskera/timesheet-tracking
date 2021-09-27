import React from 'react';
import { getUser } from '../../../common/CommonUtils';
import ReportSchema from '../../dashboard/attendance/ReportSchema';

function EmpReport() {

    const emp = window.viewEmp;

    return (
        <>
            <div className="d-flex justify-content-center text-center mb-5">
                {emp && emp.userDto.firstName + " " + emp.userDto.lastName}
                <br />
                Employee Id: {emp && emp.userId}
                <br />
                Designation: {emp && emp.userDto.designation}
                <br />
                Email: {emp && emp.userDto.email}
            </div>
            <ReportSchema userId={emp && emp.userId} />
        </>
    )
}

export default EmpReport;
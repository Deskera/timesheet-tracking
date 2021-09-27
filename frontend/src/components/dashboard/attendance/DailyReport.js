import React from 'react';

function DailyReport(props) {
    const { item } = props;

    return (
        <div className="d-flex justify-content-between">
            <div>
                <div style={{ fontSize: 20, marginBottom: 10 }}>{item.date}</div>

                <div>First Login - {item.firstLogin}</div>
                <div>Last Logout - {item.lastLogout}</div>
            </div>
            <div className="d-flex align-items-center">
                <div style={{ fontSize: 25, color: 'green', fontWeight: 'bold', padding: 5, borderRadius: 5 }}>{item.workHours}</div>
            </div>
        </div>
    )
}

export default DailyReport;
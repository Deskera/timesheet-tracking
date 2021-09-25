import React from 'react';

function DailyReport(props) {
    const { item } = props;

    return (
        <div className="bg-white p-3 mb-5" style={{ width: '31%', marginRight: '2%', borderRadius: '10px' }}>
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
        </div>
    )
}

export default DailyReport;
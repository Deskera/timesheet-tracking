import React from 'react';
import { baseUrl } from '../../../common/baseUrl';
import axios from 'axios';
import DailyReport from './DailyReport';
import FromToPicker from './FromToPicker';

function MyReport() {

    const [reportData, setReportData] = React.useState([]);
    const [fromDate, setFromDate] = React.useState(new Date());
    const [toDate, setToDate] = React.useState(new Date());

    React.useEffect(() => {
        console.log("wwww", fromDate, toDate);
        axios.get(baseUrl + "api/users/worktimehistory?", {
            params: {
                uid: 2,
                from: fromDate,
                to: toDate,
            }
        })
            .then((response) => {
                var arr = []
                response.data.worktimehistory.map((val, index) => {
                    var a = Object.values(val);
                    var b = a[0].split("T");
                    var b1 = a[1].split("T");
                    var hours = Math.floor(a[2] / 60);
                    var minutes = a[2] % 60;

                    var d = { key: JSON.stringify(index), date: b[0], firstLogin: b[1].slice(0, 8), lastLogout: b1[1].slice(0, 8), workHours: hours + " hr " + minutes + " min" };
                    arr.push(d);
                })
                setReportData(arr);
            })
            .catch((err) => {
                console.log("a", err)
            })
    }, [fromDate, toDate]);

    return (
        <div>
            <div className="mb-5" style={{ fontSize: '20px' }}>
                My Attendance Report
            </div>
            <div className="">
                <FromToPicker
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
            <div className="row" style={{ paddingLeft: '3%' }}>
                {
                    reportData.map(item => <DailyReport item={item} />)
                }
            </div>
        </div>
    )
}

export default MyReport;
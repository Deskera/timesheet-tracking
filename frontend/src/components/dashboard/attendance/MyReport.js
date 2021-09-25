import React from 'react';
import { baseUrl } from '../../../common/baseUrl';
import axios from 'axios';
import DailyReport from './DailyReport';
import FromToPicker from './FromToPicker';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

function MyReport() {

    const [reportData, setReportData] = React.useState([]);
    const [fromDate, setFromDate] = React.useState(new Date());
    const [toDate, setToDate] = React.useState(new Date());
    const [currPage, setCurrPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalItems, setTotalItems] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(20);

    React.useEffect(() => {
        axios.get(baseUrl + "api/users/worktimehistory?", {
            params: {
                uid: 2,
                from: fromDate,
                to: toDate,
                page: currPage,
                size: pageSize,
            }
        })
            .then((response) => {
                setCurrPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
                setTotalItems(response.data.totalItems);
                var arr = []
                response.data.worktimehistory.map((val, index) => {
                    var a = Object.values(val);
                    var b = a[0].split("T");
                    var b1 = a[1].split("T");
                    var hours = Math.floor(a[2] / 60);
                    var minutes = a[2] % 60;

                    var d = { key: JSON.stringify(index), date: b[0], firstLogin: b[1].slice(0, 8), lastLogout: b1[1].slice(0, 8), workHours: hours + " hr " + minutes + " min" };
                    // for (var i = 0; i < 21; i++) {
                    arr.push(d);
                    // }
                })
                setReportData(arr);
            })
            .catch((err) => {
                console.log("a", err)
            })
    }, [fromDate, toDate, currPage]);

    return (
        <div>
            <div className="mb-5" style={{ fontSize: '20px' }}>
                My Attendance Report
            </div>
            <div className="mb-5">
                <FromToPicker
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
            <div className="mb-3 d-flex justify-content-center">
                <FirstPageIcon
                    className="hoverEffect"
                    onClick={() => { if (currPage != 0) { setCurrPage(currPage - 1) } }}
                />
                <KeyboardArrowLeftIcon
                    className="hoverEffect"
                    onClick={() => { if (currPage != 0) { setCurrPage(currPage - 1) } }}
                />
                {
                    currPage == totalPages - 1 ?
                        <>
                            {(pageSize * (currPage + 1) - pageSize + 1) + " - " + totalItems + " of " + totalItems}
                        </>
                        :
                        <>
                            {(pageSize * (currPage + 1) - pageSize + 1) + " - " + (pageSize * (currPage + 1)) + " of " + totalItems}
                        </>
                }
                <KeyboardArrowRightIcon
                    className="hoverEffect"
                    onClick={() => { if (currPage != pageSize - 1) { setCurrPage(currPage + 1) } }}

                />
                <LastPageIcon
                    className="hoverEffect"
                    onClick={() => { if (currPage != pageSize - 1) { setCurrPage(currPage + 1) } }}

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
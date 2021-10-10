import React from 'react';
import { baseUrl } from '../../../common/baseUrl';
import axios from 'axios';
import DailyReport from './DailyReport';
import FromToPicker from './FromToPicker';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { ScaleLoader } from 'react-spinners';

function ReportSchema(props) {

    const [reportData, setReportData] = React.useState([]);
    const [fromDate, setFromDate] = React.useState(new Date());
    const [toDate, setToDate] = React.useState(new Date());
    const [currPage, setCurrPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalItems, setTotalItems] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(20);
    const [sortOrder, setSortOrder] = React.useState();
    const [loader, setLoader] = React.useState(true);

    React.useEffect(() => {
        setLoader(true);
        axios.get(baseUrl + "api/users/worktimehistory?", {
            params: {
                uid: props.userId,
                from: fromDate,
                to: toDate,
                page: currPage,
                size: pageSize,
                sort: sortOrder && "workingHours," + sortOrder
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
                setLoader(false);
            })
            .catch((err) => {
                console.log("a", err)
            })
    }, [fromDate, toDate, currPage, sortOrder]);

    return (
        <div>
            <div className="mb-4">
                <FromToPicker
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
            </div>
            <div className="mb-3 d-flex justify-content-center">
                {
                    loader ?
                        <ScaleLoader color="#000" loading={loader} height={30} />
                        :
                        totalItems == 0 ?
                            <div>
                                No Entries Found!
                            </div>
                            :
                            <>
                                <FirstPageIcon
                                    className="hoverEffect"
                                    onClick={() => { if (currPage !== 0) { setCurrPage(0) } }}
                                />
                                <KeyboardArrowLeftIcon
                                    className="hoverEffect"
                                    onClick={() => { if (currPage !== 0) { setCurrPage(currPage - 1) } }}
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
                                    onClick={() => { if (currPage !== totalPages - 1) { setCurrPage(currPage + 1) } }}

                                />
                                <LastPageIcon
                                    className="hoverEffect"
                                    onClick={() => { if (currPage !== totalPages - 1) { setCurrPage(totalPages - 1) } }}

                                />
                            </>
                }
            </div>


            <div className="row" style={{ paddingLeft: '3%' }}>
                {
                    reportData.map(item => (
                        <div className="bg-white p-3 mb-5" style={{ width: '31%', marginRight: '2%', borderRadius: '10px' }}>
                            <DailyReport item={item} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ReportSchema;
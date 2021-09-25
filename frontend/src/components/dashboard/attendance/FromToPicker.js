import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function FromToPicker(props) {

    const { fromDate, setFromDate, toDate, setToDate } = props;

    // console.log("rrrr", fromDate, fromDate.getMonth(), toDate);

    // const [fromShow, setFromShow] = useState(false);
    // const [toShow, setToShow] = useState(false);

    // const onFromChange = (event, selectedDate) => {
    //     setFromShow(false);
    //     if (selectedDate) {
    //         setFromDate(selectedDate);
    //     }
    //     else {
    //         setFromDate(fromDate);
    //     }
    // };

    // const onToChange = (event, selectedDate) => {
    //     setToShow(false);
    //     if (selectedDate) {
    //         setToDate(selectedDate);
    //     }
    //     else {
    //         setToDate(toDate);
    //     }
    // };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="row mb-5">
                <div className="col-6 d-flex justify-content-between">
                    <KeyboardDatePicker
                        showTodayButton
                        label="From Date"
                        format="dd/MM/yyyy"
                        value={fromDate}
                        onChange={date => setFromDate(date)}
                    // maxDate={toDate}
                    // maxDateMessage="Should be smaller than To Date!"
                    />

                    <span>-</span>

                    <KeyboardDatePicker
                        showTodayButton
                        label="To Date"
                        format="dd/MM/yyyy"
                        value={toDate}
                        onChange={date => setToDate(date)}
                    // minDate={fromDate}
                    // minDateMessage="Should be greater than From Date!"
                    />
                </div>

                <span className="offset-1 col-2">
                    Sort by Wrok Hour
                </span>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default FromToPicker;
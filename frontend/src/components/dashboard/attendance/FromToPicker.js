import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function FromToPicker(props) {

    const { fromDate, setFromDate, toDate, setToDate } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="row">
                <div className="col-12 d-flex justify-content-evenly">
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
                        minDate={fromDate}
                        minDateMessage="Should be greater than From Date!"
                    />

                    <span className="offset-1 col-2">
                        Sort by Wrok Hour
                    </span>
                </div>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default FromToPicker;
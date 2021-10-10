import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function FromToPicker(props) {

    const { fromDate, setFromDate, toDate, setToDate, sortOrder, setSortOrder } = props;

    const handleChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="row">
                <div className="col-12 d-flex justify-content-evenly align-items-center">
                    <KeyboardDatePicker
                        style={{ width: '150px' }}
                        showTodayButton
                        label="From Date"
                        format="dd/MM/yyyy"
                        value={fromDate}
                        onChange={date => setFromDate(date)}
                    // maxDate={toDate}
                    // maxDateMessage="Should be smaller than To Date!"
                    />

                    <span style={{ fontSize: '40px', fontWeight: 'bold' }}>-</span>

                    <KeyboardDatePicker
                        style={{ width: '150px' }}
                        showTodayButton
                        label="To Date"
                        format="dd/MM/yyyy"
                        value={toDate}
                        onChange={date => setToDate(date)}
                        minDate={fromDate}
                        minDateMessage="Should be greater than From Date!"
                    />

                    <span className="offset-1 col-2">
                        <InputLabel id="demo-simple-select-standard-label">Sort By WorkHours</InputLabel>
                        <Select
                            style={{ width: '140px' }}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={sortOrder}
                            onChange={handleChange}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="ASC">
                                Ascending <ArrowUpwardIcon fontSize="small" />
                            </MenuItem>
                            <MenuItem value="DESC">
                                Descending <ArrowDownwardIcon fontSize="small" />
                            </MenuItem>
                        </Select>
                    </span>
                </div>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default FromToPicker;
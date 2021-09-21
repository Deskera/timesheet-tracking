import React from 'react';
import { Card, Button } from 'reactstrap';
import { getUser } from '../../../common/CommonUtils';
import axios from 'axios';

function Overview() {
    console.log("aaa", getUser())

    const clockIn = () => {
        console.log("clock in");

    }

    return (
        <>
            <div className="p-2" style={{ backgroundColor: 'snow' }}>
                <div className="" style={{ fontSize: '20px' }}>
                    {getUser().user.userDto.firstName + " " + getUser().user.userDto.lastName}
                </div>

                You can clock-in anytime into the system, once you are clocked in; a countdown will automatically start and will note your time until you are clocked-out.
            </div>


            <div className="d-flex justify-content-start">
                <Button color="success" onClick={clockIn}>Clock In</Button>
            </div>

        </>
    )
}

export default Overview;
import React from 'react';
import { baseUrl } from '../../../common/baseUrl';
import { getUser } from '../../../common/CommonUtils';
import axios from 'axios';
import DailyReport from './DailyReport';
import FromToPicker from './FromToPicker';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ReportSchema from './ReportSchema';

function MyReport() {

    return (
        <div>
            <div className="mb-5" style={{ fontSize: '20px' }}>
                My Attendance Reports
            </div>
            <ReportSchema userId={getUser().userId} />
        </div>
    )
}

export default MyReport;
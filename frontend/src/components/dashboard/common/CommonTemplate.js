import React from 'react';
import { OverlayTrigger, Tooltip, Button, Modal } from "react-bootstrap";
import { images, getUser } from '../../../common/CommonUtils';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import BusinessIcon from '@material-ui/icons/Business';
import 'react-toastify/dist/ReactToastify.css';
import EditOrgModal from './organization/EditOrgModal';

function Common() {

    const [orgModal, setOrgModal] = React.useState(false);
    const [num, setNum] = React.useState(0);

    return (
        <>
            {/* Edit Organization */}
            <EditOrgModal
                show={orgModal}
                handleClose={() => setOrgModal(false)}
                renderAgain={() => setNum(num + 1)}
            />

            <div className="mt-4 mb-3 text-center d-flex justify-content-between align-items-center bg-white">
                <h2 style={{ fontSize: '40px', margin: '0' }}>{getUser().user.tenantDto.tenantName}</h2>

                <div>
                    <Button style={{ backgroundColor: 'green' }} onClick={() => setOrgModal(true)}>Company Profile</Button>
                </div>
            </div>
        </>
    )
}

export default Common;
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

    const [companyMenu, setCompanyMenu] = React.useState(null);
    const [orgModal, setOrgModal] = React.useState(false);
    const [num, setNum] = React.useState(0);

    const handleClick = (event) => {
        setCompanyMenu(event.currentTarget);
    };

    const handleClose = () => {
        setCompanyMenu(null);
    };

    const history = useHistory();

    const logOut = () => {
        console.log("manu out");
        setCompanyMenu(null);
        localStorage.clear();
        history.push("/login");
    }

    return (
        <>
            {/* Menu */}
            <Menu
                anchorEl={companyMenu}
                keepMounted
                open={Boolean(companyMenu)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { setOrgModal(true); setCompanyMenu(null) }}>Company Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>

            {/* Edit Organization */}
            <EditOrgModal
                // tableRef={tableRef}
                show={orgModal}
                handleClose={() => setOrgModal(false)}
                renderAgain={() => setNum(num + 1)}
            />

            <div className="mt-4 text-center d-flex justify-content-center align-items-center bg-white">
                {/* <div> */}
                <h2 className="" style={{ fontSize: '40px', margin: '0' }}>{getUser().user.tenantDto.tenantName}</h2>
                {/* <p className="" style={{ fontSize: '20px', margin: '0' }}>Company Dashboard</p> */}
                {/* </div> */}
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="admin">Company</Tooltip>}>
                    <BusinessIcon style={{ cursor: 'pointer', fontSize: '50px' }} onClick={handleClick} />
                </OverlayTrigger>
            </div>
        </>
    )
}

export default Common;
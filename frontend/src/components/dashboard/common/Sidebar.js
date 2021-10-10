import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { getUser } from "../../../common/CommonUtils";
import { useHistory } from 'react-router-dom';

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 30px;
  position: fixed;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 11;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {

    const history = useHistory();

    const logOut = () => {
        console.log("manu out");
        localStorage.clear();
        history.push("/login");
    }

    return (
        <>
            <SidebarNav sidebar={true}>
                <h3 className="text-center mb-5" style={{ color: 'white' }}>Welcome {getUser().user.userDto.firstName}</h3>

                <SidebarWrap>
                    {SidebarData.map((item, index) => {
                        return (<SubMenu item={item} key={index} />);
                    })}
                </SidebarWrap>

                <div className="mt-4 d-flex justify-content-center" style={{ padding: '20px' }}>
                    <Button style={{ width: '100%' }} color="primary" onClick={logOut}>Logout</Button>
                </div>
            </SidebarNav>
        </>
    );
};

export default Sidebar;



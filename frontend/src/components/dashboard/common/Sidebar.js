// import React from "react";
// import { NavItem, NavLink, Nav, Collapse, Button } from "reactstrap";
// import { Link } from "react-router-dom";

// function Sidebar() {

//     const [isOpen, setIsOpen] = React.useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     return (
//         <Nav vertical className="mt-4">
//             <h3 className="text-center" style={{ padding: '20px' }} style={{ color: 'white' }}>Welcome {getUser().user.userDto.firstName}</h3>
//             <NavItem>
//                 <NavLink href="/dashboard/overview">Overview</NavLink>
//             </NavItem>
//             <NavItem>
//                 <NavLink href="/dashboard/employee-info">Employee Table</NavLink>
//             </NavItem>
//             <NavItem>
//                 <NavLink onClick={toggle} style={{ cursor: 'pointer' }}>Attendance</NavLink>
//                 <Collapse isOpen={isOpen}>
//                     <NavItem style={{ width: "90%", marginLeft: '10%' }}>
//                         <NavLink href="/dashboard/my-report">My Report</NavLink>
//                     </NavItem>
//                     <NavItem style={{ width: "90%", marginLeft: '10%' }}>
//                         <NavLink href="/dashboard/team-report">Team Report</NavLink>
//                     </NavItem>
//                 </Collapse>
//             </NavItem>
//             <NavItem>
//                 <NavLink href="logout">Logout</NavLink>
//             </NavItem>
//         </Nav>
//     );
// }

// export default Sidebar;

import React, { useState } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { getUser } from "../../../common/CommonUtils";
import { useHistory } from 'react-router-dom';

// const Nav = styled.div`
//   background: #15171c;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const NavIcon = styled.div`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   cursor: pointer;
// `;

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
                <h3 className="text-center" style={{ color: 'white' }}>Welcome {getUser().user.userDto.firstName}</h3>
                <SidebarWrap>
                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
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



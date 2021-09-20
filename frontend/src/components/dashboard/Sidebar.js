import React from "react";
import { NavItem, NavLink, Nav, Collapse, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { getUser } from '../../common/CommonUtils';

function Sidebar() {

    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Nav vertical className="mt-4">
            <h3 className="text-center" style={{ color: 'white' }}>Welcome {getUser().user.userDto.firstName}</h3>
            <NavItem>
                <NavLink href="/dashboard/overview">Overview</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/dashboard/employee-info">Employe Table</NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={toggle} style={{ cursor: 'pointer' }}>Attendance</NavLink>
                <Collapse isOpen={isOpen}>
                    <NavItem style={{ width: "90%", marginLeft: '10%' }}>
                        <NavLink href="/dashboard/my-report">My Report</NavLink>
                    </NavItem>
                    <NavItem style={{ width: "90%", marginLeft: '10%' }}>
                        <NavLink href="/dashboard/team-report">Team Report</NavLink>
                    </NavItem>
                </Collapse>
            </NavItem>
            <NavItem>
                <NavLink href="logout">Logout</NavLink>
            </NavItem>
        </Nav>
    );
}

export default Sidebar;


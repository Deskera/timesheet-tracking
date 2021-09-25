import React from 'react';

import Login from './admin-login/LoginComponent';

import Register from './admin-register/RegisterComponent';
import OrganizationInfo from './admin-register/OrganizationInfoComponent';
import PersonalInfo from './admin-register/PersonalInfoComponent';


import Dashboard from './dashboard/DashboardCompnent';

import { useHistory } from 'react-router-dom';

import { Switch, Route, Redirect } from 'react-router-dom';

import HashLoader from "react-spinners/HashLoader";

import Sidebar from './dashboard/common/Sidebar';
import EmployeeInfo from './dashboard/employeeInfo/EmployeeInfo';
import EmpReport from './dashboard/employeeInfo/EmpReport';
import MyReport from './dashboard/attendance/MyReport';
import TeamReport from './dashboard/attendance/TeamReport';
import Common from './dashboard/common/CommonTemplate';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <HashLoader speedMultiplier="1" color="#9cdaf8" className="bg-info" loading={true} size={100} />
        </div>
    )
}

const RouteWithLoader = ({ component: Component, loadTime: time, ...rest }) => {
    const [load, setLoaded] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoaded(false), time * 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Route {...rest} component={() => (
            <>
                {load ? <Loader /> : <Component />}
            </>
        )} />
    );
};

const RouteWithSidebar = ({ component: Component, loadTime: time, ...rest }) => {
    // const [load, setLoaded] = React.useState(true);

    // React.useEffect(() => {
    //     const timer = setTimeout(() => setLoaded(false), time * 1000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <Route {...rest} component={() => (
            <div className="row bg-white m-0 p-0" style={{ minHeight: '100vh', height: 'auto' }}>
                <div className="col-2 m-0">
                    <Sidebar />
                </div>
                <div className="col-10 m-0">
                    <div className="container">
                        <Common />
                        <div className="p-3" style={{ backgroundColor: '#f0ede6' }}>
                            <Component />
                        </div>
                    </div>
                </div>
            </div>
        )} />
    );
};

function Main() {

    const history = useHistory();

    return (
        <Switch>
            <RouteWithLoader exact path="/login" component={Login} loadTime="1" />
            <RouteWithLoader exact path="/register" component={Register} loadTime="1" />
            <RouteWithLoader exact path="/register/personal-info" component={PersonalInfo} loadTime="3" />
            <RouteWithLoader exact path="/register/organization-info" component={OrganizationInfo} loadTime="0.5" />

            {/* <RouteWithSidebar exact path="/dashboard/overview" component={Overview} /> */}
            <RouteWithSidebar exact path="/dashboard/employee-info" component={EmployeeInfo} />
            <RouteWithSidebar exact path="/dashboard/employee-info/view-report" component={EmpReport} />
            <RouteWithSidebar exact path="/dashboard/my-report" component={MyReport} />
            <RouteWithSidebar exact path="/dashboard/team-report" component={TeamReport} />

            {/* <RouteWithSidebar exact path="/dashboard" component={() => (
                <>
                    {
                        localStorage.getItem("user") === null ?
                            <>
                                {alert("Sign In first!")}
                                {history.push("/login")}

                            </>
                            :
                            <Dashboard />
                    }
                </>
            )} /> */}

            <Redirect to="/login" />
        </Switch>
    );
}

export default Main;
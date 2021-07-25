import React from 'react';

import Login from './admin-login/LoginComponent';

import Register from './admin-register/RegisterComponent';
import OrganizationInfo from './admin-register/OrganizationInfoComponent';
import PersonalInfo from './admin-register/PersonalInfoComponent';

import Dashboard from './dashboard/DashboardCompnent';
import EditAdmin from './dashboard/EditAdminInfo';
import Add from './dashboard/AddEmployee';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// const mapStateToProps = state => {
//     return {

//     }
// }

// const mapDispatchToProps = (dispatch) => ({

// })

function Main() {

    // componentDidMount() {

    // }

    return (
        <Switch>
            <Route path="/login" component={() => <Login />} />
            <Route exact path="/register" component={() => <Register />} />
            <Route path="/register/personal-info" component={() => <PersonalInfo />} />
            <Route path="/register/organization-info" component={() => <OrganizationInfo />} />
            <Route exact path="/dashboard" component={() => <Dashboard />} />
            <Route path="/dashboard/edit-info" component={() => <EditAdmin />} />
            <Route path="/dashboard/add-employee" component={() => <Add />} />
            <Redirect to="/login" />
        </Switch>
    );
}

export default Main;
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
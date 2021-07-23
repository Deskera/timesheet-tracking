import React from 'react';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import OrganizationInfo from './OrganizationInfoComponent';
import PersonalInfo from './PersonalInfoComponent';
import Dashboard from './DashboardCompnent';
import EditAdmin from './EditAdminInfo';
import Add from './AddEmployee';
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
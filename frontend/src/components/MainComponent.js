import React from 'react';

import Login from './admin-login/LoginComponent';

import Register from './admin-register/RegisterComponent';
import OrganizationInfo from './admin-register/OrganizationInfoComponent';
import PersonalInfo from './admin-register/PersonalInfoComponent';

import Dashboard from './dashboard/DashboardCompnent';
import EditAdmin from './dashboard/EditAdminInfo';
import Add from './dashboard/AddEmployee';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import styled from 'styled-components';

import { images } from '../common/CommonUtils';

// import { connect } from 'react-redux';

// const mapStateToProps = state => {
//     return {

//     }
// }

// const mapDispatchToProps = (dispatch) => ({

// })



const Mains = styled.main`
    overflow: visible;
	padding: 0 $spacer 0 $spacer;
	@include transition(all .3s);

	@include media-breakpoint-up(md) {
		margin-left: 260px;
	}
`

function Main() {

    // componentDidMount() {

    // }

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Switch>
            <Route path="/login" component={() => <Login />} />
            <Route exact path="/register" component={() => <Register />} />
            <Route path="/register/personal-info" component={() => <PersonalInfo />} />
            <Route path="/register/organization-info" component={() => <OrganizationInfo />} />
            <Route exact path="/dashboard" component={() => (
                <div className="container">
                    <div className="row">
                        {/* <img className="col-2" src={images['logo.png'].default} alt="Company logo" style={{ width: '' }} /> */}
                        <h2 className="col-3 display-5">{user.tenantName}</h2>
                        <h3 className="col-8 text-center display-6">Hi {user.firstName}</h3>

                        <div className="col-1">
                            User Profile
                        </div>
                    </div>
                    <div className="row mt-5">
                        <Dashboard />
                    </div>
                </div>
            )} />


            <Route path="/dashboard/edit-info" component={() => <EditAdmin />} />
            <Route path="/dashboard/add-employee" component={() => <Add />} />




            {/* <Route path="/dashboard/navbar" component={() => <Navbar />} /> */}




            <Redirect to="/login" />
        </Switch>
    );
}

export default Main;
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
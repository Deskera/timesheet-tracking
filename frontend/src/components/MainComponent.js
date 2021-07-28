import React from 'react';

import Login from './admin-login/LoginComponent';

import Register from './admin-register/RegisterComponent';
import OrganizationInfo from './admin-register/OrganizationInfoComponent';
import PersonalInfo from './admin-register/PersonalInfoComponent';

import Dashboard from './dashboard/DashboardCompnent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import styled from 'styled-components';

import { images, getUser } from '../common/CommonUtils';

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
            <Route exact path="/dashboard" component={() => (
                < div className="container">
                    <div className="row">
                        {/* <img className="col-2" src={images['logo.png'].default} alt="Company logo" style={{ width: '' }} /> */}
                        <h2 className="col-3 display-5">{getUser().tenantName}</h2>
                        <h3 className="col-8 text-center display-6">Hi {getUser().firstName}</h3>

                        <div className="col-1">
                            User Profile
                        </div>
                    </div>
                    <div className="row mt-5">
                        <Dashboard />
                    </div>
                </div>
            )} />






            {/* <Route path="/dashboard/navbar" component={() => <Navbar />} /> */}




            <Redirect to="/login" />
        </Switch>
    );
}

export default Main;
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
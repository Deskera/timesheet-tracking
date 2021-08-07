import React from 'react';

import Login from './admin-login/LoginComponent';

import Register from './admin-register/RegisterComponent';
import OrganizationInfo from './admin-register/OrganizationInfoComponent';
import PersonalInfo from './admin-register/PersonalInfoComponent';

import Learn from './Learn';

import Dashboard from './dashboard/DashboardCompnent';

// import Loader from '../common/Loader';

import { Switch, Route, Redirect } from 'react-router-dom';

// import { connect } from 'react-redux';

// const mapStateToProps = state => {
//     return {

//     }
// }

// const mapDispatchToProps = (dispatch) => ({

// })

import Loader from '../common/Loader';



const RouteWithLoader = ({ component: Component, loadTime: time, ...rest }) => {
    const [load, setLoaded] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoaded(false), time*1000);
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

function Main() {

    // componentDidMount() {

    // }

    return (
        <Switch>
            <RouteWithLoader exact path="/login" component={Login} loadTime="1" />
            <RouteWithLoader exact path="/register" component={Register} loadTime="1" />
            <RouteWithLoader exact path="/register/personal-info" component={PersonalInfo} loadTime="3" />
            <RouteWithLoader exact path="/register/organization-info" component={OrganizationInfo} loadTime="0.5" />

            <RouteWithLoader exact path="/learn" component={Learn} />

            <Route exact path="/dashboard" component={() => (
                // <div className="container">
                //     <div className="row text-center">
                //         {/* <img className="col-2" src={images['logo.png'].default} alt="Company logo" style={{ width: '' }} /> */}
                //         <h2 className="col-3 display-5">{getUser().tenantName}</h2>
                //         <h3 className="col-6 display-6" style={{color: 'blue'}}>Welcome {getUser().firstName}</h3>

                //         <div className="col-3">
                //             <OverlayTrigger placement="bottom" overlay={<Tooltip id="admin">Company Profile</Tooltip>}>
                //                 <AccountCircleIcon style={{ cursor: 'pointer', fontSize: '50px' }} />
                //             </OverlayTrigger>
                //         </div>
                //     </div>
                // <div className="row mt-5">
                <Dashboard />
                // </div>
                // </div>
            )} />

            {/* <Route exact path="" */}






            {/* <Route path="/dashboard/navbar" component={() => <Navbar />} /> */}




            <Redirect to="/login" />
        </Switch>
    );
}

export default Main;
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
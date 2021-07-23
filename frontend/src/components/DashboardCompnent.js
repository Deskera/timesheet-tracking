import React from 'react';
// import {useHistory} from 'react-router-dom';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

function Dashboard() {
    // const history = useHistory();
    // console.log("hist", history);
    // const User = history.location.state;
    // console.log("dash", User)
    const [allEmployees, setAllEmployees] = React.useState();

    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("mn", user);
    const getUsers = (values) => {
        fetch("http://localhost:8080/api/users/tenant/"+user.tenantName, {
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error(response.status + ': ' + response.statusText);
                    error.response = response;
                    // if(response.status === 404) {
                    //     alert("Whoops! This email isn't registered :(");
                    // }
                    // else {
                    //     alert("Incorrect password for this email.");
                    // }
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(response => {console.log(response); setAllEmployees(response)})
            .catch(error => console.log(error))
    }

    return(
        <div className="container">
            <div className="row mt-3 mb-5">
                <div className="col-8 text-center display-4">
                    Welcome to Deskera {user.firstName}
                </div>
                <Link to="/dashboard/edit-info" className="offset-1 col-1">
                    <Button className=" bg-primary">
                        Edit
                    </Button>
                </Link>
            </div>
            <div className="row">
                <Link to="/dashboard/add-employee" className="col-4">
                    <Button className="">
                        Add Employee
                    </Button>
                </Link>
                <Button className="offset-4 col-4" onClick={getUsers()}>
                    Get All Employees
                </Button>
            </div>
            {/* <div className="row">
                {allEmployees && allEmployees[0].firstName}
            </div> */}
            <pre>
                {allEmployees && JSON.stringify(allEmployees,undefined,2)}
            </pre>
        </div>
    );
}

export default Dashboard;
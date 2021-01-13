
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// import SignUp from "../Components/SignUp";
// import DashBoard from "../Components/DashBoard";
// import PrivateRoute from "./PrivateRoute";
// import Admin from "../Components/Admin";
// import UserEnding from "../Components/UserEnding";
// import LogInDashBoardForm from "../Components/DashBoard/LogInDashboard/LogInDashBoardForm";
// import ManagerRoutes_0 from "./ManagerRoute_0";
// import ManagerRoutes_2 from "./ManagerRoute_2";
import Court from '../../src/Component/Court';
class RouterURL extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={Court} />
                </Switch>
            </div>
        );
    }
}
export default RouterURL;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { fakeAuth } from "./auth";

//console.log(`:${fakeAuth.isAuthenticated} `);
fakeAuth.getLocalStorage_IsAuthenticated();
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            fakeAuth.isAuthenticated !== "0" ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login-dashboard" />
            )
        }
    />
);

export default PrivateRoute;
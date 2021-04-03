import {useRecoilValue} from "recoil";
import {authenticationState} from "../Store/atom";
import {Redirect, Route} from "react-router-dom";
import React from "react";

const CustomerRoute = ({ component: Component, ...rest }) => {
    const authentication = useRecoilValue(authenticationState);
    return (
        <Route
            {...rest}
            render={(props) =>
                (authentication.isAuthenticated === true && authentication.role === 'customer') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login-page/login"/>
                )
            }
        />
    );
}

export default CustomerRoute;
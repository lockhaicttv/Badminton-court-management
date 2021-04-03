import {useRecoilState} from "recoil";
import {authenticationState} from "../Store/atom";
import {Redirect, Route} from "react-router-dom";
import React from "react";
import ls from '../Utils/localStorage'
const LoginRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = ls.getAuthenticate().isAuthenticated;
    const [authentication, setAuthentication] = useRecoilState(authenticationState);

    if (isAuthenticated) {
        setAuthentication(ls.getAuthenticate())
    }

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

export default LoginRoute;
import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useRecoilValue} from "recoil";
import {authenticationState} from "../Store/atom";



const OwnerRoute = ({ component: Component, ...rest }) => {
    const authentication = useRecoilValue(authenticationState);
    return (
        <Route
            {...rest}
            render={(props) =>
                (authentication.isAuthenticated === true && authentication.role === 'owner') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login-page/login"/>
                )
            }
        />
    );
}

export default OwnerRoute;
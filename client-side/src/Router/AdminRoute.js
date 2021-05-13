import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useRecoilValue} from "recoil";
import {authenticationState} from "../Store/atom";



const AdminRoute = ({ component: Component, ...rest }) => {
    const authentication = useRecoilValue(authenticationState);
    return (
        <Route
            {...rest}
            render={(props) =>
                (authentication.isAuthenticated === true && authentication.role === 'admin') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login-page/admin"/>
                )
            }
        />
    );
}

export default AdminRoute;
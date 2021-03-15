import React, {Component} from "react";
import {Route} from "react-router-dom";
import Login from '../LoginPage/Login/index'
import Switch from "react-bootstrap/Switch";
import HeaderLogin from "../HeadFoot/HeaderLogin";

function LoginPage() {
        return (
            <div>
                <HeaderLogin/>
                <Route exact path="/login-page/login" component={Login}/>
            </div>
        )
}

export default LoginPage;
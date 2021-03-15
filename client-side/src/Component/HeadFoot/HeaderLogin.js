import React from "react";
import {Form, FormControl, Nav} from "react-bootstrap";
import {NavLink, Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faUserAlt,
    faInfoCircle,
    faSignInAlt,
    faUsersCog,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {fakeAuth} from "../../Router/auth";
import {withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const HeaderLogin = () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/login-page/login">BCM</Navbar.Brand>
        <Nav className="mr-auto">

        </Nav>
        <Form inline>
            <Button variant="outline-info">Đăng nhập</Button>
        </Form>
    </Navbar>
);
export default HeaderLogin;
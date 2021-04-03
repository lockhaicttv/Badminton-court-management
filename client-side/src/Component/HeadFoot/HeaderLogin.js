import React from "react";
import { Form, FormControl, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faUserAlt,
  faInfoCircle,
  faSignInAlt,
  faUsersCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { fakeAuth } from "../../Router/auth";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const HeaderLogin = () => (
  <div>
    <Navbar bg="white" variant="white" className="shadow">
      <Navbar.Brand href="/login-page/login">
        <img
          src="/image/logo.png"
          width="35"
          height="35"
          className="d-inline-block align-top"
        />
        <span className="font-weight-bold mx-3 text-dark">BCM</span>
      </Navbar.Brand>
    </Navbar>
    <div className="header-border" />
  </div>
);
export default HeaderLogin;

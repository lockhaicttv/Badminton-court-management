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
import { accountIdState, courtIdState } from "../../Store/atom";
import { useRecoilValue } from "recoil";

const HeaderCourtMangement = withRouter(({ history }) => {
  const username = useRecoilValue(accountIdState);
  console.log(username);
  const shopPageRoute = `/home/shop-page/${username}`;
  return (
    <div>
      <Navbar bg="" variant="" className="shadow">
        <Navbar.Brand href="/home">
          <img
            src="/image/logo.png"
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">
            <Link
              to="/"
              className="text-decoration-none text-primary font-weight-bold px-3 header-customer-item"
            >
              Home
            </Link>
          </Nav.Link>
          <Nav.Link href="">
            <Link
              to="/home/court"
              className="header-customer-item text-decoration-none text-primary font-weight-bold px-3"
            >
              Quản lý Sân
            </Link>
          </Nav.Link>
          <Nav.Link href="">
            <Link
              to="/home/admin"
              className="header-customer-item text-decoration-none text-primary font-weight-bold px-3"
            >
              Admin
            </Link>
          </Nav.Link>
          <Nav.Link href="">
            <Link
              to={shopPageRoute}
              className="header-customer-item text-decoration-none text-primary font-weight-bold px-3"
            >
              Đăng bán
            </Link>
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <div className="header-border" />
    </div>
  );
});
export default HeaderCourtMangement;

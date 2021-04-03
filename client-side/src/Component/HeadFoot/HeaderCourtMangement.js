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
import {accountIdState, courtIdState} from "../../Store/atom";
import {useRecoilValue} from "recoil";

const HeaderCourtMangement = withRouter(({history}) => {
    const username = useRecoilValue(accountIdState);
    console.log(username)
    const shopPageRoute = `/home/shop-page/${username}`;
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">
                    <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link href="">
                    <Link to="/home/court">Quản lý Sân</Link>
                </Nav.Link>
                <Nav.Link href="">
                    <Link to="/home/admin">Admin</Link>
                </Nav.Link>
                <Nav.Link href="">
                    <Link to={shopPageRoute}>Đăng bán</Link>
                </Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
    )
});
export default HeaderCourtMangement;
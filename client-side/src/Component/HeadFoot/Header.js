import React from "react";
import { Nav } from "react-bootstrap";
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

const Header = withRouter(({ history }) => (
    <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
        <Nav.Item>
            <Nav.Link href="/home">Trang chủ</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/home/court" >Quản lý sân</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
                Disabled
            </Nav.Link>
        </Nav.Item>
    </Nav>
));
export default Header;
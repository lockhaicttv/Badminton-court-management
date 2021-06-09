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
    faSignOutAlt, faDoorClosed,
} from "@fortawesome/free-solid-svg-icons";
import {fakeAuth} from "../../Router/auth";
import {withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {accountIdState, authenticationState, courtIdState} from "../../Store/atom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import ls from '../../Utils/localStorage';
import NavDropdown from "react-bootstrap/NavDropdown";

const HeaderCourtManagement = withRouter(({history}) => {
    const username = useRecoilValue(accountIdState);
    const setCourtInfo = useSetRecoilState(courtIdState);
    const setAccountId = useSetRecoilState(accountIdState);
    const setAuthentication = useSetRecoilState(authenticationState);

    const shopPageRoute = `/home/shop-page/${username}`;

    const handleLogout = () => {
        setAccountId('');
        setAuthentication({
            isAuthenticated: false,
            role: ''
        });
        setCourtInfo('');
        ls.logOut();
    }

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
                    <span className="font-weight-bold mx-3 text-dark">BCM</span>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Item className='p-0'>
                        <Link
                            to="/home"
                            className="text-decoration-none text-primary font-weight-bold px-3 header-customer-item"
                        >
                            Home
                        </Link>
                    </Nav.Item>
                    <NavDropdown
                        title="Sân"
                        id="basic-nav-dropdown"
                        className="header-customer-item text-decoration-none text-primary font-weight-bold p-0-important mx-2"
                    >
                        <NavDropdown.Item>
                            <Link
                                to="/home/court"
                                className="header-customer-item text-decoration-none text-primary font-weight-bold px-3"
                            >
                                Quản lý Sân
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item>
                            <Link
                                to="/home/court-booking"
                                className="header-customer-item text-decoration-none text-primary font-weight-bold px-3"
                            >
                                Đặt lịch
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item className='p-0'>
                        <Link
                            to="/home/admin/category"
                            className="header-customer-item text-decoration-none text-primary font-weight-bold px-3"
                        >
                            Admin
                        </Link>
                    </Nav.Item>
                    <Nav.Item className='p-0'>
                        <Link
                            to='/home/statistic/order'
                            className="header-customer-item text-decoration-none text-primary font-weight-bold px-3"
                        >
                            Thống kê
                        </Link>
                    </Nav.Item>
                    <Nav.Item className='p-0'>
                        <Link
                            to={shopPageRoute}
                            className="header-customer-item text-decoration-none text-primary font-weight-bold px-3"
                        >
                            Đăng bán
                        </Link>
                    </Nav.Item>
                </Nav>
                <Form inline>
                    <button className='row btn btn-primary' onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                        <span className='ml-1'>Đăng xuất</span>
                    </button>
                </Form>
            </Navbar>
            <div className="header-border"/>
        </div>
    );
});
export default HeaderCourtManagement;

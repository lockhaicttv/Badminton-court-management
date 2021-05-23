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
    faSignOutAlt, faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import {fakeAuth} from "../../Router/auth";
import {withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ls from "../../Utils/localStorage";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {accountIdState, authenticationState, courtIdState} from "../../Store/atom";


const HeaderAdmin = () => {
    const setCourtInfo = useSetRecoilState(courtIdState);
    const setAccountId = useSetRecoilState(accountIdState);
    const setAuthentication = useSetRecoilState(authenticationState);

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
            <Navbar bg="white" variant="white" className="shadow">
                <Navbar.Brand>
                    <img
                        src="/image/logo.png"
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                    />
                    <span className="font-weight-bold mx-3 text-dark">BCM</span>
                </Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Item>
                        <Link
                            to="/admin/database"
                            className="text-decoration-none text-primary font-weight-bold px-3 header-customer-item"
                        >
                            Database
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link
                            to="/admin/chatbot"
                            className="text-decoration-none text-primary font-weight-bold px-3 header-customer-item"
                        >
                            Chatbot
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
}
export default HeaderAdmin;

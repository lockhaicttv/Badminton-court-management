import React, {useState, useEffect} from "react";
import {Form, FormControl, Nav} from "react-bootstrap";
import {useRecoilState, useRecoilValue} from "recoil";
import {NavLink, Link, useHistory, Redirect} from "react-router-dom";
import {withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {
    accountIdState,
    authenticationState,
    courtIdState,
} from "../../Store/atom";
import NavDropdown from "react-bootstrap/NavDropdown";
import {totalCartState} from "../../Store/selector";
import Login from "../Customer/Login";
import callApi from "../../Utils/apiCaller";
import Media from "react-bootstrap/Media";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import ls from '../../Utils/localStorage';

const HeaderCustomer = () => {
    const [account_id, setAccountId] = useRecoilState(accountIdState);
    const totalCart = useRecoilValue(totalCartState);
    const [isShow, setIsShow] = useState(false);
    const [authentication, setAuthentication] = useRecoilState(
        authenticationState
    );
    const [userInfo, setUserInfo] = useState({});
    const history = useHistory();

    const loadUserInfo = () => {
        callApi(`user/?_id=${account_id}`, "get", null)
            .then((res) => {
                setUserInfo(res.data[0]);
            })
            .catch(() => {
                setUserInfo({});
            });
    };

    useEffect(() => {
        if (ls.getAuthenticate() !== null) {
            setAuthentication(ls.getAuthenticate())
            setAccountId(ls.getAuthenticate().account_id);
        }
    }, [])

    useEffect(() => {
        if (account_id !== '') {
            loadUserInfo()
        }
    }, [account_id]);


    const handleClose = () => {
        setIsShow(!isShow);
    };


    const setAuthenticationForm = (role) => {
        setAuthentication({
            isAuthenticated: true,
            role: role,
        });
    };

    const handleLogOut = () => {
        setAuthentication({
            isAuthenticated: false,
            role: "",
        });
        setAccountId("");
        ls.logOut();
        Redirect('/login-page/login');
    };

    return (
        <div className="header-customer shadow">
            <Login
                isShow={isShow}
                handleClose={handleClose}
                setAuthentication={setAuthenticationForm}
            />

            <Navbar bg="" variant="" className="py-4">
                <div className="container">
                    <Nav className="col-2">
                        <Link to='/customer'>
                        <Navbar.Brand>
                            <img
                                src="/image/logo.png"
                                width="35"
                                height="35"
                                className="d-inline-block align-top"
                            />
                            <span className="font-weight-bold mx-3 text-dark">BCM</span>
                        </Navbar.Brand>
                        </Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Tìm sản phẩm, loại sản phẩm mong muốn"
                                className="mr-sm-2"
                            />
                            <Button variant="outline-info">Tìm kiếm</Button>
                        </Form>
                    </Nav>

                    {authentication.role !=='' ? (
                        <Nav className="mr-3 row">
                            <img
                                width={40}
                                height={40}
                                className=""
                                src="/image/logon.jpg"
                            />
                            <NavDropdown
                                title={
                                    userInfo.full_name || ''
                                }
                            >
                                <NavDropdown.Item>
                                    <Link to={`/customer/info/bill`} className="text-dark">
                                        Đơn hàng của tôi
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item>
                                    <Link to={`/customer/info/edit`} className="text-dark">
                                        Tài khoản của tôi
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        block
                                        onClick={handleLogOut}
                                    >
                                        Thoát tài khoản
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav className='mr-3'>
                            <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleClose}>
                                    Đăng nhập
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={handleClose}>
                                    Đăng ký
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}

                    <Nav>
                        <Nav.Item>
                            <Link
                                to="/customer/shopping-cart"
                                className="text-decoration-none"
                            >
                                <FontAwesomeIcon icon={faShoppingCart} className="mr-2"/>
                                ({totalCart.quantity})
                            </Link>
                        </Nav.Item>
                    </Nav>

                </div>
            </Navbar>

            <div className="header-border"/>
        </div>
    );
}
export default HeaderCustomer;

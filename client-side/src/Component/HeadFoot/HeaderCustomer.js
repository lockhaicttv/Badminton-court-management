import React, {useState, useEffect} from "react";
import {Form, FormControl, Nav} from "react-bootstrap";
import {useRecoilState, useRecoilValue} from "recoil";
import {NavLink, Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {accountIdState, authenticationState, courtIdState} from "../../Store/atom";
import NavDropdown from "react-bootstrap/NavDropdown";
import {totalCartState} from "../../Store/selector";
import Login from "../Customer/Login";
import callApi from "../../Utils/apiCaller";
import Media from "react-bootstrap/Media";


const HeaderCustomer = withRouter(({history}) => {
    const [account_id, setAccountId] = useRecoilState(accountIdState);
    const totalCart = useRecoilValue(totalCartState);
    const [isShow, setIsShow] = useState(false);
    const [authentication, setAuthentication] = useRecoilState(authenticationState);
    const [userInfo, setUserInfo] = useState({});
    console.log(account_id)

    const loadUserInfo = () => {
        callApi(`user/?_id=${account_id}`, 'get', null)
            .then(res => {
                setUserInfo(res.data[0])
            })
            .catch(() => {
                setUserInfo({})
            })
    }

    useEffect(
        loadUserInfo
    , [authentication.isAuthenticated])


    const handleClose = () => {
        setIsShow(!isShow)
    }

    const setAuthenticationForm = (role) => {
        setAuthentication({
            isAuthenticated: true,
            role: role
        })
    }

    const handleLogOut = () =>{
        setAuthentication({
            isAuthenticated: false,
            role: ''
        })
        setAccountId('');
    }
    // console.log(authentication)
    return (
        <div>
            <Login isShow={isShow} handleClose={handleClose} setAuthentication={setAuthenticationForm}/>

            <Navbar bg="dark" variant="dark" className='py-4'>
                <div className='container'>
                    <Nav className='col-2'>
                        <Navbar.Brand href="/customer"><h2>BCM</h2></Navbar.Brand>
                    </Nav>
                    <Nav className="mr-auto">
                        <Form inline>
                            <FormControl type="text" placeholder="Tìm sản phẩm, loại sản phẩm mong muốn" className="mr-sm-2" />
                            <Button variant="outline-info">Tìm kiếm</Button>
                        </Form>
                        {
                            (authentication.isAuthenticated === true && authentication.role === 'customer') ?
                                <NavDropdown
                                    title={
                                        <Media className='pt-3'>
                                            <img
                                                width={25}
                                                height={25}
                                                className="mr-3"
                                                src="/image/logon.jpg"
                                            />
                                            <Media.Body>
                                                <div>
                                                    {userInfo.full_name}
                                                </div>
                                            </Media.Body>
                                        </Media>
                                    }
                                >
                                    <NavDropdown.Item>
                                        <NavLink to={`/customer/info/bill`} className='text-dark'>Đơn hàng của
                                            tôi</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item>
                                        <NavLink to={`/customer/info/edit`} className='text-dark'>Tài khoản của
                                            tôi</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Button variant='danger' size='sm' block
                                                onClick={handleLogOut}
                                        >
                                            Thoát tài khoản
                                        </Button>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                :
                                <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={handleClose}
                                    >
                                        Đăng nhập
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item
                                        onClick={handleClose}
                                    >
                                        Đăng ký
                                    </NavDropdown.Item>
                                </NavDropdown>
                        }
                    </Nav>
                    <Nav>
                        <Nav.Link href="">
                            <Link to='/customer/shopping-cart'>Giỏ hàng ({totalCart.quantity})</Link>
                        </Nav.Link>
                    </Nav>
                </div>
            </Navbar>
        </div>
    )
});
export default HeaderCustomer;
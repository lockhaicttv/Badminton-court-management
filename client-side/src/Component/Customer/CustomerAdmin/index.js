import React, {useEffect} from "react";
import {Route, Switch,} from "react-router-dom";
import {Button, Nav, NavLink, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import EditInfo from "./EditInfo";
import Bill from "./Bill";
import EditAddress from "./EditAddress";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faMoneyBill, faUserTie} from "@fortawesome/free-solid-svg-icons";


const CustomerAdmin = () => {

    return (
        <div className='container-fluid background-silver'>
            <Row>
                <Col className='m-4 mr-0 bg-white m-0' sm={2}  style={{backgroundImage: 'linear-gradient(to left, #71dbf8 0%, #538eec 100%)', minHeight: '464px'}}>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <NavLink>
                            <Link to='/customer/info/edit' className='text-white'>
                                 <span className='mr-2'>
                                    <FontAwesomeIcon icon={faUserTie}/>
                                 </span>
                                Thông tin cá nhân
                            </Link>
                        </NavLink>
                        <Nav.Link>
                            <Link to='/customer/info/bill' className='text-white'>
                                <span className='mr-2'>
                                    <FontAwesomeIcon icon={faMoneyBill}/>
                                </span>
                                Quản lý dơn hàng
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to='/customer/info/address' className='text-white'>
                                <span className='mr-2'>
                                    <FontAwesomeIcon icon={faAddressBook}/>
                                </span>
                                Địa chỉ
                            </Link>
                        </Nav.Link>

                    </Nav>
                </Col>
                <Col sm={9} className='m-4 ml-0 bg-white'>
                    <Route exact path='/customer/info/edit' component={EditInfo}/>
                    <Route exact path='/customer/info/bill' component={Bill}/>
                    <Route exact path='/customer/info/address' component={EditAddress}/>
                </Col>
            </Row>
        </div>
    )
}

export default CustomerAdmin;
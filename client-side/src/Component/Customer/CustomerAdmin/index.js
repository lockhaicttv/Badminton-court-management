import React, {useEffect} from "react";
import {Route, Switch,} from "react-router-dom";
import {Button, Nav, NavLink, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import EditInfo from "./EditInfo";
import Bill from "./Bill";
import EditAddress from "./EditAddress";



const CustomerAdmin = () => {

    return (
        <div className='container background-silver'>
            <Row>
                <Col className='m-4 mr-0 bg-white'>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <NavLink>
                            <Link to='/customer/info/edit'>
                                Thông tin cá nhân
                            </Link>
                        </NavLink>
                        <Nav.Link>
                            <Link to='/customer/info/bill'>
                                Quản lý dơn hàng
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to='/customer/info/address'>
                                Địa chỉ
                            </Link>
                        </Nav.Link>

                    </Nav>
                </Col>
                <Col sm={8} className='m-4 ml-0 bg-white'>
                    <Route exact path='/customer/info/edit' component={EditInfo}/>
                    <Route exact path='/customer/info/bill' component={Bill}/>
                    <Route exact path='/customer/info/address' component={EditAddress}/>
                </Col>
            </Row>
        </div>
    )
}

export default CustomerAdmin;
import HeaderCourtMangement from '../../HeadFoot/HeaderCourtMangement'
import React, {Component} from "react";
import { Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-bootstrap";
import Category from "./Category/Category";
import Bills from "./Bills/Bills";
import Area from "./Area/Area";
import Promotion from './Promotion/Promotion';
import Product from './Product/Product';


const Panel = <Nav defaultActiveKey="/home" className="flex-lg-column">
    <Nav.Link href="/home/admin/category">
        <Link to="/home/admin/category">Loại sản phẩm</Link>
    </Nav.Link>
    <Nav.Link >
        <Link to="/home/admin/product">Sản phẩm</Link>
    </Nav.Link>
    <Nav.Link>
        <Link to="/home/admin/bill">Hoá đơn</Link>
    </Nav.Link>
    <Nav.Link>
        <Link to="/home/admin/area">Sân</Link>
    </Nav.Link>
    <Nav.Link>
        <Link to="/home/admin/promotion">Khuyến mãi</Link>
    </Nav.Link>
</Nav>

function CourtAdmin() {
    return(
        <div className="row">
            <div className="col-lg-1">
                {Panel}
            </div>
            <div className="col-lg">
                <Route exact path="/home/admin/category" component={Category}/>
                <Route exact path="/home/admin/product" component={Product}/>
                <Route exact path="/home/admin/bill" component={Bills}/>
                <Route exact path="/home/admin/area" component={Area}/>
                <Route exact path="/home/admin/promotion" component={Promotion}/>
            </div>
        </div>
    )

}
export default CourtAdmin;
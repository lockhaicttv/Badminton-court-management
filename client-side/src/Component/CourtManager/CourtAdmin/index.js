import HeaderCourtMangement from "../../HeadFoot/HeaderCourtMangement";
import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-bootstrap";
import Category from "./Category/Category";
import Bills from "./Bills/Bills";
import Area from "./Area/Area";
import Promotion from "./Promotion/Promotion";
import Product from "./Product/Product";
import Order from './Order/Order';


const Panel = (
    <div>
        <div className="p-2 border">
            <Link to="/home/admin/category">Loại sản phẩm</Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/product">Sản phẩm</Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/bill">Hoá đơn</Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/order">Đơn hàng</Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/area">Sân</Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/promotion">Khuyến mãi</Link>
        </div>
    </div>
);

function CourtAdmin() {
    return (
        <div className="row mr-0">
            <div className="col-lg-2" style={{minHeight: "90vh"}}>
                {Panel}
            </div>
            <div className="col-lg-10">
                <Route exact path="/home/admin/category" component={Category}/>
                <Route exact path="/home/admin/product" component={Product}/>
                <Route exact path="/home/admin/bill" component={Bills}/>
                <Route exact path="/home/admin/area" component={Area}/>
                <Route exact path="/home/admin/promotion" component={Promotion}/>
                <Route exact path='/home/admin/order' component={Order} />
            </div>
        </div>
    );
}

export default CourtAdmin;

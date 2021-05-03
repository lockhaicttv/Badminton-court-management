import React, {useState, useEffect} from 'react'
import {Link, Route} from 'react-router-dom'
import Area from "./Admin/Area/Area";
import Bill from "./Admin/Bills/Bills";
import Category from "./Admin/Category/Category";
import Order from "./Admin/Order/Order";
import Product from "./Admin/Product/Product";
import Promotion from "./Admin/Promotion/Promotion";
import Bills from "../CourtManager/CourtAdmin/Bills/Bills";
import Customer from "./Admin/Customer/Customer";
import Owner from "./Admin/Owner/Owner";
import CourtInfo from "./Admin/CourtInfo/CourtInfo";
import OrderDetail from "./Admin/Orderdetail/OrderDetail";

const Panel = (
    <div>
        <div className="p-2 border">
            <Link to="/admin/owner">Chủ sân</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/court-info">Thông tin sân</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/category">Loại sản phẩm</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/product">Sản phẩm</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/bill">Hoá đơn</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/bill-detail">Chi tiết hoá đơn</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/customer">Khách hàng</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/order">Đơn hàng</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/order-detail">Chi tiết đơn</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/area">Sân</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/promotion">Khuyến mãi</Link>
        </div>
    </div>
);


const Admin = () => {

    return (
        <div className="row mr-0">
            <div className="col-lg-2" style={{minHeight: "90vh"}}>
                {Panel}
            </div>
            <div className="col-lg-10">
                <Route exact path='/admin/owner' component={Owner} />
                <Route exact path='/admin/court-info' component={CourtInfo} />
                <Route exact path="/admin/category" component={Category}/>
                <Route exact path="/admin/product" component={Product}/>
                <Route exact path="/admin/bill" component={Bills}/>
                <Route exact path="/admin/area" component={Area}/>
                <Route exact path="/admin/promotion" component={Promotion}/>
                <Route exact path='/admin/customer' component={Customer} />
                <Route exact path='/admin/order' component={Order} />
                <Route exact path='/admin/order-detail' component={OrderDetail}/>
            </div>
        </div>
    );
}

export default Admin;
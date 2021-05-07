import React, {useState, useEffect} from 'react'
import {Link, Route} from 'react-router-dom'
import Database from "./Database";
import HeaderAdmin from "../HeadFoot/HeaderAdmin";

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
        <div>
            <HeaderAdmin/>
            <Route path='/admin/database' component={Database}/>
        </div>
    );
}

export default Admin;
import React, {useState, useEffect} from 'react'
import {Link, Route} from 'react-router-dom'
import Area from "./Area/Area";
import Bill from "./Bills/Bills";
import Category from "./Category/Category";
import Order from "./Order/Order";
import Product from "./Product/Product";
import Promotion from "./Promotion/Promotion";
import Bills from "./Bills/Bills";
import Customer from "./Customer/Customer";
import Owner from "./Owner/Owner";
import CourtInfo from "./CourtInfo/CourtInfo";
import OrderDetail from "./Orderdetail/OrderDetail";
import BillDetail from "./BillDetail/BillDetail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHockeyPuck,
    faLayerGroup,
    faCube,
    faMoneyBill,
    faShippingFast,
    faSquare,
    faUser,
    faFileContract,
    faUserTie,
    faScroll
} from "@fortawesome/free-solid-svg-icons";

const Panel = (
    <div>
        <div className="p-2 border">
            <Link to="/admin/database/owner">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faUserTie}/>
                </span>
                Chủ sân
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/court-info">
            <span className='mr-2'>
                    <FontAwesomeIcon icon={faFileContract}/>
                </span>
                Thông tin sân
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/category">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faLayerGroup}/>
                </span>
                Loại sản phẩm</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/product">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faCube}/>
                </span>
                Sản phẩm
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/bill">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faMoneyBill}/>
                </span>
                Hoá đơn
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/bill-detail">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faScroll}/>
                </span>
                Chi tiết hoá đơn
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/customer">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faUser}/>
                </span>
                Khách hàng
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/order">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faShippingFast}/>
                </span>
                Đơn hàng
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/order-detail">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faScroll}/>
                </span>
                Chi tiết đơn hàng
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/area">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faSquare}/>
                </span>
                Sân
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/database/promotion">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faHockeyPuck}/>
                </span>
                Khuyến mãi
            </Link>
        </div>
    </div>
);


const Database = () => {

    return (
        <div className="row mr-0">
            <div className="col-lg-2" style={{minHeight: "90vh"}}>
                {Panel}
            </div>
            <div className="col-lg-10">
                <Route exact path='/admin/database/owner' component={Owner}/>
                <Route exact path='/admin/database/court-info' component={CourtInfo}/>
                <Route exact path="/admin/database/category" component={Category}/>
                <Route exact path="/admin/database/product" component={Product}/>
                <Route exact path="/admin/database/bill" component={Bills}/>
                <Route exact path='/admin/database/bill-detail' component={BillDetail}/>
                <Route exact path="/admin/database/area" component={Area}/>
                <Route exact path="/admin/database/promotion" component={Promotion}/>
                <Route exact path='/admin/database/customer' component={Customer}/>
                <Route exact path='/admin/database/order' component={Order}/>
                <Route exact path='/admin/database/order-detail' component={OrderDetail}/>
            </div>
        </div>
    );
}

export default Database;
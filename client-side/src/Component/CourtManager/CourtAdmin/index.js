import HeaderCourtMangement from "../../HeadFoot/HeaderCourtMangement";
import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHockeyPuck, faLayerGroup, faCube, faMoneyBill, faShippingFast, faSquare} from "@fortawesome/free-solid-svg-icons";

import Category from "./Category/Category";
import Bills from "./Bills/Bills";
import Area from "./Area/Area";
import Promotion from "./Promotion/Promotion";
import Product from "./Product/Product";
import Order from './Order/Order';


const Panel = (
    <div style={{backgroundImage: 'linear-gradient(to left, #71dbf8 0%, #538eec 100%)', minHeight:'115vh'}}>
        <div className="p-2 border">
            <Link to="/home/admin/category" className="text-white">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faLayerGroup} />
                </span>
                Loại sản phẩm
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/product" className="text-white">
                 <span className='mr-2'>
                    <FontAwesomeIcon icon={faCube} />
                </span>
                Sản phẩm
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/bill" className="text-white">
                 <span className='mr-2'>
                    <FontAwesomeIcon icon={faMoneyBill} />
                </span>
                Hoá đơn
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/order" className="text-white">
                 <span className='mr-2'>
                    <FontAwesomeIcon icon={faShippingFast} />
                </span>
                Đơn hàng
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/area" className="text-white">
                 <span className='mr-2'>
                    <FontAwesomeIcon icon={faSquare} />
                </span>
                Sân
            </Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/admin/promotion" className="text-white">
                <span className='mr-2'>
                    <FontAwesomeIcon icon={faHockeyPuck} />
                </span>
                Khuyến mãi
            </Link>
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

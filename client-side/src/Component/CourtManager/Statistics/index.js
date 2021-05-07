import HeaderCourtMangement from "../../HeadFoot/HeaderCourtMangement";
import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import BillStatistic from "./BillStatistic";
import OrderStatistic from "./OrderStatistic";

const Panel = (
    <div>
        <div className="p-2 border">
            <Link to="/home/statistic/order">Doanh thu bán hàng</Link>
        </div>
        <div className="p-2 border">
            <Link to="/home/statistic/bill">Doanh thu sân</Link>
        </div>
    </div>
);

function Statistics() {
    return (
        <div className="row mr-0">
            <div className="col-lg-2" style={{minHeight: "90vh"}}>
                {Panel}
            </div>
            <div className="col-lg-10">
               <Route exact path='/home/statistic/order' component={OrderStatistic} />
                <Route exact path='/home/statistic/bill' component={BillStatistic} />
            </div>
        </div>
    );
}

export default Statistics;

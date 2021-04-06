import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import OwnerStore from "./OwnerStore";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import NavLink from "react-bootstrap/NavLink";
import Nav from "react-bootstrap/Nav";
import ProductDetails from "./Product-Details";
import HeaderCustomer from "../HeadFoot/HeaderCustomer";
import HomePage from "./HomePage";
import ShoppingCart from "./ShoppingCart/";
import ls from "../../Utils/localStorage";
import {cartState} from "../../Store/atom";
import {useSetRecoilState} from "recoil";
import CustomerAdmin from "./CustomerAdmin";

const Customer = () => {
    const setCart = useSetRecoilState(cartState);
    useEffect(() => {
        if (ls.getItem("cart") !== null) {
            setCart(ls.getItem("cart"));
        }
    }, []);

    return (
        <div className="background-silver" style={{minHeight: "100vh"}}>
            <HeaderCustomer/>
            <Route
                exact
                path="/customer/product-detail/:product_id"
                component={ProductDetails}
            />
            <Route exact path="/customer" component={HomePage}/>
            <Route exact path="/customer/store/:shop_id" component={OwnerStore}/>
            <Route exact path="/customer/shopping-cart" component={ShoppingCart}/>
            <Route path="/customer/info/" component={CustomerAdmin}/>
        </div>
    );
};

export default Customer;

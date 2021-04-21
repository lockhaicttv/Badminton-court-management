import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
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
import {accountIdState, authenticationState, cartState} from "../../Store/atom";
import {useSetRecoilState, useRecoilState, useRecoilValue} from "recoil";
import CustomerAdmin from "./CustomerAdmin";
import {totalCartState} from "../../Store/selector";
import callApi from "../../Utils/apiCaller";

const Customer = () => {
    const setCart = useSetRecoilState(cartState);
    const [account_id, setAccountId] = useRecoilState(accountIdState);
    const totalCart = useRecoilValue(totalCartState);
    const [isShow, setIsShow] = useState(false);
    const [authentication, setAuthentication] = useRecoilState(
        authenticationState
    );
    const [userInfo, setUserInfo] = useState({});
    const history = useHistory();

    const loadUserInfo = () => {
        callApi(`user/?_id=${account_id}`, "get", null)
            .then((res) => {
                setUserInfo(res.data[0]);
            })
            .catch(() => {
                setUserInfo({});
            });
    };

    useEffect(()=>{
        if (ls.getAuthenticate()!==null) {
            setAuthentication(ls.getAuthenticate())
            setAccountId(ls.getAuthenticate().account_id);
        }
    },[])

    // useEffect(() => {
    //     loadUserInfo();
    // }, [account_id]);

    useEffect(() => {
        if (ls.getItem("cart") !== null) {
            setCart(ls.getItem("cart"));
        }
    }, []);

    return (
        <div className="background-silver" style={{minHeight: "100vh"}}>
            <HeaderCustomer authentication={authentication} userInfo={userInfo}/>
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

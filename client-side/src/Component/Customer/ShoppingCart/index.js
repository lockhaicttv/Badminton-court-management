import {Route} from "react-router-dom";
import callApi from "../../../Utils/apiCaller";
import React, {useState, useEffect} from "react";
import Banner from "../Banner-Logo";
import ProductCard from "../ProductCard";
import {
    Badge,
    Card,
    CardColumns,
    CardDeck,
    CardGroup,
    Button,
} from "react-bootstrap";
import {cartState} from "../../../Store/atom";
import {useRecoilValue} from "recoil";
import CartItem from "./CartItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PriceTotal from "./PriceTotal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const ShoppingCart = () => {
    const cart = useRecoilValue(cartState)
    console.log('Hello cart',cart);

    const listCartItem = cart.length > 0 ?
        (
            cart.map((item, key) => {
                return <CartItem item={item} key={item.productId}/>;
            })
        )
        :
        (
            <div>Giỏ hàng rỗng</div>
        )
    return (
        <div className="container bg-white p-4">
            <h5 className="text-primary">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2"/>
                Giỏ hàng
            </h5>

            <Row>
                <Col sm={8}>
                    {listCartItem}
                </Col>
                <Col>
                    <PriceTotal/>
                </Col>
            </Row>
        </div>
    );
};

export default ShoppingCart;

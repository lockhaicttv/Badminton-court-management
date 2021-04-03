import {Route} from "react-router-dom";
import callApi from "../../../Utils/apiCaller";
import React, {useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import Banner from "../Banner-Logo";
import ProductCard from "../ProductCard";
import {Card, CardColumns, CardDeck, CardGroup} from "react-bootstrap";
import {cartState} from "../../../Store/atom";
import {useRecoilState} from "recoil";
import CartItem from './CartItem'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PriceTotal from './PriceTotal'

const ShoppingCart = () => {
    const [cart, setCart] = useRecoilState(cartState);
    console.log(cart)

    return (
        <div className='container'>
            <h3>
                Giỏ hàng
            </h3>
            <Row>
                <Col sm={8}>
                    {
                        cart.length > 0 ?
                            cart.map((item, key) => {
                                return <CartItem item={item} key={key}/>
                            })
                            :
                            <div>Giỏ hàng rỗng</div>
                    }
                </Col>
                <Col>
                    <PriceTotal />
                </Col>
            </Row>
        </div>
    )

}

export default ShoppingCart;
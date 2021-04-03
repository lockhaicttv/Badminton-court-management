import React, {useState, useEffect} from 'react';
import {useRecoilState} from "recoil";
import callApi from "../../../Utils/apiCaller";
import {FormControl, InputGroup, Media} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {cartState} from "../../../Store/atom";
import ls from '../../../Utils/localStorage';
import {Link, NavLink} from "react-router-dom";

const CartItem = (props) => {
    const item = props.item;
    const [cartDetail, setCartDetail] = useState();
    const [cart, setCart] = useRecoilState(cartState);
    const loadCartDetail = () => {
        callApi(`product/?_id=${item.productId}`, 'get', null)
            .then(res =>
                setCartDetail(res.data[0])
            )
    }

    useEffect(() => {
        loadCartDetail();
    }, []);

    const increaseQuantity = () =>{
        console.log(item.quantity)
        let index = cart.findIndex(cartItem=>cartItem.productId===item.productId);
        let newQuantity = item.quantity*1+1;
        let newCartItem = {
            productId: item.productId,
            quantity: newQuantity,
            price: item.price
        }
        let newCart = [...cart];
        newCart[index] = newCartItem;
        setCart(newCart);

        ls.setItem('cart', JSON.stringify(newCart));
    }

    const decreaseQuantity = () =>{
        let index = cart.findIndex(cartItem=>cartItem.productId===item.productId);
        let newQuantity = item.quantity*1-1;
        let newCartItem = {
            productId: item.productId,
            quantity: newQuantity,
            price: item.price
        }
        let newCart = [...cart];
        newCart[index] = newCartItem;
        setCart(newCart);
        ls.setItem('cart', JSON.stringify(newCart));
    }

    const handleDeleteCart = () => {
        let newCart = [...cart];
        let index = newCart.findIndex(x=>x.productId===item.productId);
        newCart.splice(index, 1);
        setCart(newCart);
        ls.setItem('cart', JSON.stringify(newCart));
    }

    let elementRender = <div></div>;
    if (cartDetail !== undefined) {
        elementRender = <Row>
            <Col>
                <Media>
                    <img
                        width={120}
                        height={120}
                        className="mr-3"
                        src={cartDetail.image.base64}
                        alt={cartDetail.image.name}
                    />
                    <Media.Body>
                        <NavLink
                            to={`/customer/product-detail/${item.productId}`}
                            className='display-5 text-decoration-none text-dark '
                        >
                            {cartDetail.name}
                        </NavLink>
                        <p>
                            {cartDetail.description}
                        </p>
                        <Button
                            onClick={handleDeleteCart}
                        >
                            Xoá
                        </Button>
                    </Media.Body>
                </Media>
            </Col>
            <Col>
                <h4>
                    {item.quantity * cartDetail.price} VND
                </h4>
                <InputGroup>
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary"
                            onClick={decreaseQuantity}
                        >
                            -
                        </Button>
                    </InputGroup.Prepend>
                    <input
                        type='text'
                        className='form-control'
                        value={item.quantity}

                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary"
                            onClick={increaseQuantity}
                        >
                            +
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        </Row>
    }

    return (
        <div>
            {elementRender}
        </div>
    )
}

export default CartItem;
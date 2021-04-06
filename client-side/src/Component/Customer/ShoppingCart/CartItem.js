import React, {useState, useEffect} from "react";
import {useRecoilState} from "recoil";
import callApi from "../../../Utils/apiCaller";
import {FormControl, InputGroup, Media} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {cartState} from "../../../Store/atom";
import ls from "../../../Utils/localStorage";
import {Link, NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const CartItem = (props) => {
    const item = props.item;
    console.log(item)
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

    const increaseQuantity = () => {
        console.log(item.quantity)
        let index = cart.findIndex(cartItem => cartItem.productId === item.productId);
        let newCartItem = {...item}
        newCartItem['quantity'] = newCartItem['quantity'] * 1 + 1;
        let newCart = [...cart];
        newCart[index] = newCartItem;
        setCart(newCart);

        ls.setItem("cart", JSON.stringify(newCart));
    };

    const decreaseQuantity = () => {
        let index = cart.findIndex(cartItem => cartItem.productId === item.productId);
        let newCartItem = {...item}
        newCartItem['quantity'] = newCartItem['quantity'] * 1 - 1;
        let newCart = [...cart];
        newCart[index] = newCartItem;
        setCart(newCart);
        ls.setItem('cart', JSON.stringify(newCart));
    }

    const handleDeleteCart = () => {
        console.log(item.productId)
        let newCart = [...cart];
        newCart = newCart.filter((cart) => cart.productId !== item.productId);
        setCart(newCart);
        ls.setItem("cart", JSON.stringify(newCart));
    };

    let elementRender = <div></div>;
    if (cartDetail !== undefined) {
        elementRender = (
            <Row>
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
                                className="display-5 text-decoration-none text-dark h5"
                            >
                                {cartDetail.name}
                            </NavLink>
                            <p>{cartDetail.description}</p>
                            <Button onClick={handleDeleteCart} variant="danger">
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </Media.Body>
                    </Media>
                </Col>
                <Col>
                    <h4>{item.quantity * cartDetail.price} VND</h4>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <Button variant="outline-secondary" onClick={decreaseQuantity}>
                                -
                            </Button>
                        </InputGroup.Prepend>
                        <input type="text" className="form-control" value={item.quantity}/>
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={increaseQuantity}>
                                +
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
        );
    }

    return <div className="my-3">{elementRender}</div>;
};

export default CartItem;

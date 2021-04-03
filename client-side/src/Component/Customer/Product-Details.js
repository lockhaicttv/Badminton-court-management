import React, {useState, useEffect} from 'react'
import {Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'
import callApi from "../../Utils/apiCaller";
import ReactImageZoom from "react-image-zoom";
import {useHistory, useParams} from "react-router";
import {Media} from "react-bootstrap";
import {Link} from "react-router-dom";
import {cleanup} from "@testing-library/react";
import {useIsMounted} from "react-tidy";
import {cartState} from "../../Store/atom";
import {useSetRecoilState, useRecoilState} from "recoil";
import ls from '../../Utils/localStorage';

const ProductDetails = () => {
    const product_id = useParams().product_id;
    const [productDetails, setProductDetails] = useState({});
    const [owner, setOwner] = useState();
    const [cartItem, setCartItem] = useState({
        productId: product_id,
        quantity: 0,
        price: productDetails.price
    })
    const [cart, setCart] = useRecoilState(cartState);

    const [props, setProps] = useState({
        width: 200,
        height: 350,
        zoomWidth: 500,
        scale: 1.8,
        // zoomPosition: 'original',
        img: '/image/logon'
    });


    const loadProductDetails = () => {
        callApi(`product/?_id=${product_id}`, 'get', null)
            .then(res => {
                setProductDetails(res.data[0])
                setCartItem(prevState => {
                    return {
                        ...prevState,
                        price: res.data[0].price
                    }
                })
                setProps(prevState => {
                    return {
                        ...prevState,
                        img: res.data[0].image.base64
                    }
                })
            })
    }

    const loadOwner = () => {
        callApi(`product/get-court-by-product/${product_id}`, 'get', null)
            .then(res => {
                    setOwner(res.data)
                }
            )
    }

    useEffect(() => {
        loadOwner();
        loadProductDetails();
    }, [product_id])


    const handleChangeQuantity = (e) => {
        let value = e.target.value;
        setCartItem(prevState => {
            return {
                ...prevState,
                quantity: value
            }
        })
    }

    const handleAddCart = () => {
        let newCart = [...cart];
        let index = newCart.findIndex(x => x.productId === cartItem.productId)

        if (index === -1) {
            newCart.push(cartItem)
            setCart(newCart)
        } else {
            let oldQuantity = newCart[index].quantity;
            setCartItem(prevState => {
                return {
                    ...prevState,
                    quantity: prevState.quantity + oldQuantity
                }
            });
            newCart[index] = cartItem;
            setCart(newCart);
        }
        ls.setItem('cart', JSON.stringify(newCart));
    }


    let eleRender = <div></div>;
    if (productDetails !== undefined) {
        eleRender = <Row>
            <Col sm={4}>
                <div className='border-right border-dark'>
                    <div className='p-4'>
                        <ReactImageZoom {...props}/>
                    </div>
                </div>
            </Col>
            <Col sm={8}>
                {/*<h4>{productDetails.name} </h4>*/}
            </Col>
        </Row>
    }

    let ownerInfoEle = <div></div>;
    if (owner !== undefined) {
        ownerInfoEle =
            <div>
                <Media>
                    <img src={owner.logo.base64}
                         width={64}
                         height={64}
                         className="align-self-start mr-3 rounded-circle"
                         alt="Logo shop"
                    />
                    <Media.Body>
                        {owner.name}
                    </Media.Body>
                </Media>
                <Button
                    variant='outline-secondary'
                    className='m-2'
                    size='sm'
                    // onClick={handleDirectToShop}
                >
                    <Link to={`/customer/store/${owner._id}`}>
                        Xem shop
                    </Link>
                </Button>
                <div className='m-2'>
                    {owner.description}
                </div>
                <div className='border-bottom border-dark mt-3 pb-2'>
                    Số điện thoại: {owner.phone_number}
                </div>
                <div className='mt-3'>
                    Địa chỉ: {owner.address}
                </div>
            </div>
    }
    console.log(cart)
    return (
        <div className='container pt-5 '>
            <Row className='bg-white border'>
                <Col sm={4}>
                    <div className='border-right border-dark'>
                        <div className='p-4'>
                            <ReactImageZoom {...props}/>
                        </div>
                    </div>
                </Col>
                <Col sm={8} className='pt-2'>
                    <h1>{productDetails.name} </h1> {/*Tên sản phẩm*/}
                    <Row>
                        <Col xs={7}>
                            <div className='my-2 background-silver border-dark border-bottom'> {/*Giá*/}
                                <h3 className='p-2'>{productDetails.price}đ</h3>
                            </div>

                            <div className='my-3 border-bottom border-dark'>
                                Bạn hãy NHẬP ĐỊA CHỈ nhận hàng để được dự báo thời gian & chi phí giao hàng một cách
                                chính xác nhất.
                            </div>
                            <div className='mt-3 col-8'>
                                <h4>Số lượng:</h4>
                                <InputGroup className="mb-3">
                                    <input type='number' className='form-control'
                                           values={cartItem.quantity}
                                           name='quantity'
                                           onChange={handleChangeQuantity}
                                    />
                                </InputGroup>
                                <Button variant='danger' size='lg' block
                                        onClick={handleAddCart}
                                >
                                    Thêm vào giỏ
                                </Button>
                            </div>
                        </Col>
                        <Col>
                            {ownerInfoEle}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetails
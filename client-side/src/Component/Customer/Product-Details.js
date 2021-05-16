import React, {useState, useEffect} from 'react'
import {Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'
import callApi from "../../Utils/apiCaller";
import ReactImageZoom from "react-image-zoom";
import {useHistory, useParams} from "react-router";
import {Media} from "react-bootstrap";
import {Link} from "react-router-dom";
import {cartState} from "../../Store/atom";
import {useSetRecoilState, useRecoilState} from "recoil";
import ls from '../../Utils/localStorage';
import ReactImageMagnify from 'react-image-magnify';
import Chat from "./Chat";

const ProductDetails = () => {
    const product_id = useParams().product_id;
    const [productDetails, setProductDetails] = useState({});
    const [owner, setOwner] = useState();
    const [cartItem, setCartItem] = useState({
        productId: product_id,
        quantity: 1,
        price: productDetails.price,
        shop_id: '',
    })
    const [cart, setCart] = useRecoilState(cartState);
    const shop = ls.getItem('court_id')
    const [props, setProps] = useState({
        imageSrc: '',
        imageAlt: "Example",
        largeImageSrc: "./large-image.jpg",
    });

    useEffect(() => {
        loadProductDetails();

    }, [])

    useEffect(() => {
        loadOwner();
    }, [])

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
                        imageSrc: res.data[0].image.base64,
                        largeImageSrc: res.data[0].image.base64
                    }
                })
            })
    }

    const loadOwner = () => {
        callApi(`product/get-court-by-product/${product_id}`, 'get', null)
            .then(res => {
                    setOwner(res.data);
                    setCartItem(prevState => {
                        return {
                            ...prevState,
                            shop_id: res.data._id
                        }
                    })
                }
            )
    }


    const handleChangeQuantity = (e) => {
        let value = e.target.value;
        callApi(`product/check-quantity-remain/${product_id}`)
            .then(res => {
                if (res.data.quantity < value) {
                    alert('Sản phẩm hiện không đủ số lượgn cung cấp!')
                    return
                } else {
                    setCartItem(prevState => {
                        return {
                            ...prevState,
                            quantity: value
                        }
                    })
                }
            })
    }

    const handleAddCart = () => {
        let newCart = ls.getItem('cart');
        let shop = ls.getItem('court_id')
        let index = newCart.findIndex(x => x.productId === cartItem.productId)

        if (index === -1) {
            newCart.push(cartItem)
            setCart(newCart)
        } else {
            let check_shop = owner._id !== shop;
            if (check_shop) {
                if (window.confirm('Thêm đơn hàng từ cửa hàng khác sẽ xoá hết hàng trong giỏ!!!')) {
                    let newCartItem = {...cartItem}
                    newCartItem['price'] = newCartItem.price * promotionValue
                    newCart = [];
                    newCart.push(newCartItem)
                    setCart(newCart);
                }
            } else {
                console.log(owner._id, shop)
                let oldQuantity = newCart[index].quantity;
                let newCartItem = {...cartItem};
                newCartItem['quantity'] = newCartItem.quantity*1 + oldQuantity * 1;
                newCartItem['price'] = newCartItem.price * promotionValue
                newCart[index] = newCartItem;
                setCart(newCart);
            }
        }
        ls.setItem('court_id', JSON.stringify(cartItem.shop_id));
        ls.setItem('cart', JSON.stringify(newCart));
    }

    const checkPromotionTime = (day) => {
        let endTime = new Date(day).getTime();
        return endTime > new Date().getTime();
    }


    let eleRender = <div/>;
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

    let promotionEndday = ''
    let promotionValue = 0

    if (productDetails.promotion_id !== null && productDetails.promotion_id!==undefined) {
        promotionEndday = productDetails.promotion_id.end
        if (checkPromotionTime(promotionEndday)) {
            promotionValue = (100 - productDetails.promotion_id.value) / 100
        }
    }

    return (
        <div className='container pt-5 '>
            <Row className='bg-white border'>
                <Col sm={4}>
                    <div className='border-right border-dark'>
                        <div className='ml-0 p-2'>
                            {/*<ReactImageZoom {...props}/>*/}
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    // isFluidWidth: true,
                                    src: props.imageSrc,
                                    isHintEnabled: true,
                                    width: 260,
                                    height: 350,
                                },
                                largeImage: {
                                    src: props.largeImageSrc,
                                    width: 1000,
                                    height: 1000,
                                    className: 'zindex-modal'
                                },
                                isHintEnabled: true,
                                shouldHideHintAfterFirstActivation: false,
                                enlargedImageContainerClassName: 'z-index-1',
                                imageClassName: ''
                            }} />
                        </div>
                    </div>
                </Col>
                <Col sm={8} className='pt-2 pb-2'>
                    <h1>{productDetails.name} </h1> {/*Tên sản phẩm*/}
                    <Row>
                        <Col xs={7}>
                            {promotionEndday !== '' && promotionValue !== 0
                                ?
                                <div className='my-2 background-silver border-dark border-bottom'> {/*Giá*/}
                                    <div className='my-2 background-silver border-dark border-bottom'> {/*Giá*/}
                                        <h5 className='p-2 card-title'>
                                            Giá gốc: {Number(productDetails.price).toLocaleString()}đ
                                        </h5>
                                    </div>
                                    <h5 className='p-2 card-title text-danger'>
                                        Khuyến mãi: {Number(productDetails.price * promotionValue).toLocaleString()}đ
                                    </h5>
                                </div>
                                :
                                <div className='my-2 background-silver border-dark border-bottom'> {/*Giá*/}
                                    <h5 className='p-2 card-title'>{Number(productDetails.price).toLocaleString()} đ</h5>
                                </div>
                            }

                            <div className='my-3 border-bottom border-dark'>
                                Bạn hãy NHẬP ĐỊA CHỈ nhận hàng để được dự báo thời gian & chi phí giao hàng một cách
                                chính xác nhất.
                            </div>
                            <div className='mt-3 col-8'>
                                <h4>Số lượng:</h4>
                                <InputGroup className="mb-3">
                                    <input type='number' min="1" className='form-control'
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
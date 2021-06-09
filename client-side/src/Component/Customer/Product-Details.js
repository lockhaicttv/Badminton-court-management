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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGifts} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";

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
    // const [newCart, setNewCart] = useState([]);
    const [productRelated, setProductRelated] = useState([]);

    useEffect(() => {
        loadProductDetails();
    }, [])

    useEffect(() => {
        loadOwner();
    }, [])

    useEffect(() => {
        loadProductDetails();
    }, [product_id])

    useEffect(() => {
        loadOwner();
    }, [product_id])

    // useEffect(()=>{
    //     let courtId = ls.getItem('court_id');
    //     let cart = ls.getItem('cart');
    //     setShopId(courtId);
    //     setNewCart(cart)
    // }, [cart])

    const loadProductDetails = () => {
        callApi(`product/?_id=${product_id}`, 'get', null)
            .then(res => {
                console.log(res.data[0])
                setProductDetails(res.data[0])
                setCartItem(prevState => {
                        return {
                            ...prevState,
                            price: res.data[0].price
                        }
                    }
                )
                setProps(prevState => {
                    return {
                        ...prevState,
                        imageSrc: res.data[0].image.base64,
                        largeImageSrc: res.data[0].image.base64
                    }
                })
                let relateStr = res.data[0].name.substring(0, res.data[0].name.indexOf(' ')) || res.data[0].name;
                console.log(relateStr)
                callApi(`product/search/${relateStr}`, 'get', null)
                    .then(res1 => {
                        setProductRelated(res1.data)
                    })
                    .catch(() => {
                        setProductRelated([])
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
        let check_shop = owner._id !== shop;
        if (check_shop) {
            if (window.confirm('Thêm đơn hàng từ cửa hàng khác sẽ xoá hết hàng trong giỏ!!!')) {
                let newCartItem = {...cartItem}
                newCartItem['price'] = (newCartItem.price*1) * promotionValue;
                newCartItem['quantity'] *= 1;
                newCart = [];
                newCart.push(newCartItem)
                console.log(newCart)
                setCart(newCart);
            }
        } else {
            if (index === -1) {
                newCart.push(cartItem)
                setCart(newCart)
            } else {
                let oldQuantity = newCart[index].quantity;
                let newCartItem = {...cartItem};
                newCartItem['quantity'] = newCartItem.quantity * 1 + oldQuantity * 1;
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

    const listProductRelate = productRelated.map((item, key) => {
        return <ProductCard item={item} key={key}/>;
    });

    let
        eleRender = <div/>;
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
    let promotionValue = 1

    if (productDetails.promotion_id !== null && productDetails.promotion_id !== undefined) {
        promotionEndday = productDetails.promotion_id.end
        if (checkPromotionTime(promotionEndday)) {
            promotionValue = (100 - productDetails.promotion_id.value) / 100
        }
    }

    return (
        <div className='container pt-3 '>
            <Row className='bg-white border'>
                <Col sm={4} className='border-right border-dark'>
                    <div>
                        <div className='ml-0 p-2'>
                            {/*<ReactImageZoom {...props}/>*/}
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    // isFluidWidth: true,
                                    src: props.imageSrc,
                                    isHintEnabled: true,
                                    width: 340,
                                    height: 350,
                                },
                                largeImage: {
                                    src: props.largeImageSrc,
                                    width: 1000,
                                    height: 1000,
                                    className: 'z-index-modal'
                                },
                                isHintEnabled: true,
                                shouldHideHintAfterFirstActivation: false,
                                enlargedImageContainerClassName: 'z-index-1',
                                imageClassName: 'm-auto'
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
                                <div className='my-2 border-dark border-bottom'> {/*Giá*/}
                                    <div className='my-2 border-dark border-bottom'> {/*Giá*/}
                                        <div className='p-2'>
                                            <span className='h5'>Giá gốc: </span>
                                            <span className='light-through-text'>{Number(productDetails.price).toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                    <h4 className='p-2 text-danger'>
                                        Khuyến mãi: {Number(productDetails.price * promotionValue).toLocaleString()}đ
                                    </h4>
                                </div>
                                :
                                <div className='my-2 border-dark border-bottom'> {/*Giá*/}
                                    <h4 className='p-2'>{Number(productDetails.price).toLocaleString()} đ</h4>
                                </div>
                            }

                            <div className='my-3 border-bottom border-dark pb-2'>
                                Thêm sản phẩm và vào giỏ hàng để xác kiểm tra và thanh toán
                            </div>
                            <div className='mt-3 col-8 p-0'>
                                <h4>Số lượng:</h4>
                                <InputGroup className="mb-3">
                                    <input type='number' min="1" className='form-control'
                                           value={cartItem.quantity}
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
            <div className='bg-white row'>
                <div className="bg-white ml-2 mt-2" style={{minHeight:'200px'}}>
                    <div className='h3'>Mô tả</div>
                    <p className='ml-4'>{productDetails.description}</p>
                    <div className='h4 text-danger'>Lưu ý: Giá ship đã bao gồm trong giá sản phẩm</div>
                </div>
            </div>
            <div className='bg-white'>
                <div className='border border-bottom border-left-0 border-right-0 row bg-white row'>
                    <img src='/image/related-product.png' className=' p-0' height={"55px"}/>
                </div>
                <div className="row bg-white">
                    {listProductRelate}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
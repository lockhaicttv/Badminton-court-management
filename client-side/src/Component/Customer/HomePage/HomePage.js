import {Route} from "react-router-dom";
import callApi from "../../../Utils/apiCaller";
import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Banner from "../Banner-Logo";
import ProductCard from "../ProductCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGifts, faLightbulb, faSearch} from "@fortawesome/free-solid-svg-icons";
import CarouselHomePage from "./CarouselHomePage";
import {useRecoilValue} from "recoil";
import {searchProductState} from "../../../Store/atom";

const HomePage = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [productSale, setProductSale] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const searchProduct = useRecoilValue(searchProductState)

    useEffect(() => {
        loadShopPage();
        getProductSale();
    }, []);

    const getProductSale = () => {
        callApi(`product/get-product-sale`, "get", null)
            .then(res => {
                setProductSale(res.data)
            })
            .catch(err => {
                setProductSale([])
            })
    }

    const loadShopPage = () => {
        callApi(`product/on-shop-page`, "get", null)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                setProduct([]);
            });
    }

    const listProductSale = productSale.map((item, key) => {
        return <ProductCard item={item} key={key}/>;
    });

    const listProduct = product.map((item, key) => {
        return <ProductCard item={item} key={key}/>;
    });

    const listSearchProduct = searchProduct.map((item, key) => {
        return <ProductCard item={item} key={key}/>;
    });

    return (
        <div className="container mt-2">
            <CarouselHomePage/>
            {(searchProduct.length === 0) ?
                (
                    <div>
                        <div className='bg-white'>
                            <div className='border border-bottom border-left-0 border-right-0 row bg-white row'>
                                <FontAwesomeIcon icon={faGifts} size='lg' color='#3399FF' className='my-auto col-lg-1'/>
                                <div className='p-2 sale-title'><i>Giảm giá</i></div>
                            </div>
                            <div className="row bg-white">
                                {listProductSale}
                            </div>
                        </div>
                        <div className='bg-white'>
                            <div className='border border-bottom border-left-0 border-right-0 row bg-white row'>
                                <FontAwesomeIcon icon={faLightbulb} size='lg' color='#3399FF'
                                                 className='my-auto col-lg-1'/>
                                <div className='p-2 sale-title'><i>Gợi ý</i></div>
                            </div>
                            <div className="row bg-white">
                                {listProduct}
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div>
                        <div className='bg-white'>
                            <div className='border border-bottom border-left-0 border-right-0 row bg-white row'>
                                <FontAwesomeIcon icon={faSearch} size='lg' color='#3399FF' className='my-auto col-lg-1'/>
                                <div className='p-2 sale-title'><i>Tìm kiếm</i></div>
                            </div>
                            <div className="row bg-white">
                                {listSearchProduct}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default HomePage;

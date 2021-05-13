import {Route} from "react-router-dom";
import callApi from "../../../Utils/apiCaller";
import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Banner from "../Banner-Logo";
import ProductCard from "../ProductCard";
import {Card, CardColumns, CardDeck, CardGroup} from "react-bootstrap";
import CarouselBanner from "./CarouselHomePage";
import CarouselHomePage from "./CarouselHomePage";

const HomePage = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [productSale, setProductSale] = useState([]);
    useEffect(() => {
        loadShopPage();
        getProductSale();
    }, []);

    const getProductSale = () => {
        callApi(`product/get-product-sale`, "get", null)
            .then(res=>{
                setProductSale(res.data)
            })
            .catch(err=>{
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

    const listProduct = product.map((item, key) => {
        return <ProductCard item={item} key={key}/>;
    });

    return (
        <div className="container mt-2">
            <CarouselHomePage/>
            <div className='bg-white'>
                <div className='border border-bottom row bg-white'>
                    Giá sốc
                </div>
                <div className="row bg-white">
                    {listProduct}
                </div>
            </div>
            <div className="row bg-white">
                {listProduct}
            </div>
        </div>
    );
};

export default HomePage;

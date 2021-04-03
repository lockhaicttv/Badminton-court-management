import {Route} from "react-router-dom";
import callApi from "../../Utils/apiCaller";
import React, {useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import Banner from "./Banner-Logo";
import ProductCard from "./ProductCard";
import {Card, CardColumns, CardDeck, CardGroup} from "react-bootstrap";

const HomePage = () => {
    const href = window.location.href;
    const shopNamePosition = href.lastIndexOf('/');
    const shopName = href.substr(shopNamePosition+1, href.length-shopNamePosition)
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(()=>{
        callApi(`product/on-shop-page`,'get',null)
            .then(res=>{
                setProduct(res.data);
            })
            .catch(err=>{
                setProduct([])
            })

    }, [])

    const listProduct = product.map((item, key)=>{
        return <ProductCard  item={item} key={key}/>
    })
    return (
        <div className='flex-wrap container'>
            <CardColumns>
                {listProduct}
            </CardColumns>
        </div>
    )

}

export default HomePage;
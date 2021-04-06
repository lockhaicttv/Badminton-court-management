import {Route, useParams} from "react-router-dom";
import callApi from "../../Utils/apiCaller";
import React, {useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import Banner from "./Banner-Logo";
import ProductCard from "./ProductCard";
import {Card, CardColumns, CardDeck, CardGroup} from "react-bootstrap";

const OwnerStore = () => {
    const shop_id = useParams().shop_id;
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    const loadProductCategory = () => {
        callApi(`product_category/get-by-court/${shop_id}`, 'get', null)
            .then(res => {
                console.log(res.data)
                setCategory(res.data);
            })
            .catch(err => {
                setCategory([])
            })
    }

    const loadProduct = () => {
        callApi(`product//get-product-by-court-on-shoppage/${shop_id}`, 'get', null)
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => {
                setProduct([])
            })
    }

    useEffect(() => {
        loadProductCategory();
    }, [])
    useEffect(() => {
        loadProduct();
    }, [])

    const handleGetProduct = (product_category_id) => {
        callApi(`product/get-by-category/${product_category_id}`, 'get', null)
            .then(res => {
                setProduct(res.data)
            })
    }

    const listCategoryButton = category.map((item, key) => {
        return <Button key={key} onClick={() => handleGetProduct(item._id)}>{item.name}</Button>
    })

    const listProduct = product.map((item, key) => {
        return <ProductCard item={item} key={key}/>
    })

    return (
        <div className='container'>
            <div><Banner _id={shop_id}/></div>
            {listCategoryButton}
            <CardColumns>
                {listProduct}
            </CardColumns>
        </div>
    )

}

export default OwnerStore;
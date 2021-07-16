import {Route, useParams} from "react-router-dom";
import callApi from "../../Utils/apiCaller";
import React, {useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import Banner from "./Banner-Logo";
import ProductCard from "./ProductCard";
import {Card, CardColumns, CardDeck, CardGroup, ListGroup} from "react-bootstrap";
import Chat from "./Chat";
import Nav from "react-bootstrap/Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListAlt} from "@fortawesome/free-solid-svg-icons";

const OwnerStore = () => {
    const shop_id = useParams().shop_id;
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [itemSelect, setItemSelect] = useState('');

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
        setItemSelect(product_category_id)

        callApi(`product/get-by-category/${product_category_id}`, 'get', null)
            .then(res => {
                setProduct(res.data)
            })
    }

    const listCategoryButton = category.map((item, key) => {
        return <div className={(itemSelect===item._id)?"item-list-select p-2 border-bottom":"item-list p-2 border-bottom" } key={key} onClick={() => handleGetProduct(item._id)}>{item.name}</div>
    })

    const listProduct = product.map((item, key) => {
        return <ProductCard item={item} key={key}/>
    })

    return (
        <div className='container col-10'>
            <div className='mb-2'>
                <Banner _id={shop_id}/></div>
            <div className='row'>
                <div className='col-2 ' >
                    <div vertical>
                        <div className="p-2 border-bottom bg-dark text-white font-weight-bold">
                            <FontAwesomeIcon icon={faListAlt} className="mr-2"/>
                            DANH MỤC
                        </div>
                        <div>
                            {listCategoryButton}
                        </div>
                    </div>
                </div>
                <div className='row col'>
                    {listProduct}
                </div>
            </div>
            <Chat court_id={shop_id}/>
        </div>
    )

}

export default OwnerStore;
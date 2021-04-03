import React, {useEffect, useState} from "react";
import {accountIdState, courtIdState} from "../../../Store/atom";
import {useRecoilValue} from "recoil";
import Banner from "./Banner"
import {Button, CardDeck} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import ProductCard from "./ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AddProduct from "../CourtAdmin/Product/AddProduct";
import AddCategory from "../CourtAdmin/Category/AddCategory";

const Shoppage = () => {
    const account_id = useRecoilValue(accountIdState);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [isAddCategory, setIsAddCategory] = useState(false);
    const [isAddProduct, setIsAddProduct] = useState(false);

    const loadCategory = () => {
        callApi(`product_category/get-by-account-id/${account_id}`, 'get', null)
            .then((res) => {
                setCategory(res.data)
            })
    }

    useEffect(() => {
        loadCategory();
    }, [])

    const handleLoadProduct = (_id) => {
        callApi(`product/get-product-on-shop-page/${_id}`, 'get', null)
            .then((res) => {
                setProduct(res.data);
            })
    }

    const handleCloseAddProduct = () => {
        setIsAddProduct(!isAddProduct);
    }

    const handleCloseAddCategory = () => {
        setIsAddCategory(!isAddCategory);
    }

    const listCategoryButton = category.map((item, key) => {
        return <Button key={key} onClick={() => handleLoadProduct(item._id)}>{item.name}</Button>
    })
    const listProduct = product.map((item, key) => {
        return <ProductCard key={item._id} item={item}/>
    })

    return (
        <div className='container'>
            <AddProduct isShow={isAddProduct} handleClose={handleCloseAddProduct}/>
            <AddCategory isShow={isAddCategory} handleClose={handleCloseAddCategory}/>
            <Banner/>
            <Row>
                <Col md={4}>{listCategoryButton}</Col>
                <Col md={{span: 4, offset: 4}}>
                    <Button onClick={handleCloseAddProduct}>Thêm sản phẩm</Button>
                    <Button onClick={handleCloseAddCategory}>Thêm loại sản phẩm</Button>
                </Col>
            </Row>

            <CardDeck>
                {listProduct}
            </CardDeck>
        </div>
    )
}

export default Shoppage;
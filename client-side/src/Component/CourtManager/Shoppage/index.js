import React, {useEffect, useState} from "react";
import {accountIdState, courtIdState} from "../../../Store/atom";
import {useRecoilValue} from "recoil";
import Banner from "./Banner";
import {Button, CardColumns, CardDeck} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import ProductCard from "./ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AddProduct from "./AddProduct";
import AddCategory from "../CourtAdmin/Category/AddCategory";
import AddPromotion from "../CourtAdmin/Promotion/AddPromotion";
import {faListAlt, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Shoppage = () => {
    const account_id = useRecoilValue(accountIdState);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [isAddCategory, setIsAddCategory] = useState(false);
    const [isAddProduct, setIsAddProduct] = useState(false);
    const [isAddPromotion, setIsAddPromotion] = useState(false)
    const [styleCategory, setStyleCategory] = useState('');
    const loadCategory = () => {
        callApi(
            `product_category/get-by-account-id/${account_id}`,
            "get",
            null
        ).then((res) => {
            setCategory(res.data);
        });
    };


    useEffect(() => {
        loadCategory();
    }, []);

    const handleLoadProduct = (_id) => {
        setStyleCategory(_id);

        callApi(`product/get-product-on-shop-page/${_id}`, "get", null).then(
            (res) => {
                setProduct(res.data);
            }
        );
    };

    const handleCloseAddProduct = () => {
        loadCategory();
        setIsAddProduct(!isAddProduct);
    };

    const handleCloseAddCategory = () => {
        setIsAddCategory(!isAddCategory);
    };

    const handleCloseAddPromotion = () => {
        setIsAddPromotion(!isAddPromotion)
    }

    const listCategoryButton = category.map((item, key) => {
        return (
            <div
                key={key}
                onClick={() => handleLoadProduct(item._id)}
                className={styleCategory === item._id ? 'item-list-select p-2 border-bottom' : 'item-list p-2 border-bottom'}
                variant="outline-dark"
            >
                {item.name}
            </div>
        );
    });
    const listProduct = product.map((item, key) => {
        return <ProductCard key={item._id} item={item} reload={handleLoadProduct}/>;
    });

    return (
        <div className="container">
            <AddProduct
                isShow={isAddProduct}
                handleClose={handleCloseAddProduct}
                category={category}
            />
            <AddCategory
                isShow={isAddCategory}
                handleClose={handleCloseAddCategory}
                reload={loadCategory}
            />
            <AddPromotion
                isShow={isAddPromotion}
                handleClose={handleCloseAddPromotion}
            />

            <Banner/>
            <Row className={"p-3"}>

            </Row>
            <Row className="my-3">

                <Col md={2}>
                    <div className="p-2 border-bottom bg-dark text-white font-weight-bold">
                        <FontAwesomeIcon icon={faListAlt} className="mr-2"/>
                        DANH MỤC
                    </div>
                    <div>
                        {listCategoryButton}
                    </div>
                    <div className="">
                        <div className="p-2 border-bottom bg-dark text-white font-weight-bold">
                            <FontAwesomeIcon
                                icon={faPlusSquare} className="mr-2"/> THÊM MỚI
                        </div>
                        <div onClick={handleCloseAddProduct} className="p-2 border-bottom item-list">
                            Sản phẩm
                        </div>
                        <div onClick={handleCloseAddCategory} className="p-2 border-bottom item-list">
                            Loại sản phẩm
                        </div>
                        <div onClick={handleCloseAddPromotion} className="p-2 border-bottom item-list">
                            Khuyến mãi
                        </div>
                    </div>
                </Col>
                <Col>
                    <CardColumns>{listProduct}</CardColumns>
                </Col>


            </Row>


        </div>
    );
};

export default Shoppage;

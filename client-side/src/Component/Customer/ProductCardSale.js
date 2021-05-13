import React, {useState, useEffect} from 'react';
import {CardDeck, Card, InputGroup, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileBase64 from "react-file-base64";
import Modal from "react-bootstrap/Modal";
import callApi from "../../Utils/apiCaller";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

const ProductCard = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [itemEdit, setItemEdit] = useState({
        image: props.item.image
    });
    const history = useHistory();


    const handleDirectToDetail = () => {
        let url = `/customer/product-detail/${props.item._id}`;
        history.push(url)
    }

    const handleChange = (e) => {
        console.log(e.target.name)
        const value = e.target.value;
        setItemEdit({
            ...itemEdit,
            [e.target.name]: value,
        });
        console.log(itemEdit)
    }

    let price = props.item.price
    let priceElement =
        <h5 className='card-title mt-3 mb-3'>
            Giá: {price} đ
        </h5>

    if (props.item.promotion_id !== null && (new Date(props.item.promotion_id.end).getTime() > new Date().getTime())) {
        price = price * (100-props.item.promotion_id.value)/100;
        priceElement =  <h5 className='card-title mt-3 mb-3 text-danger'>
            Khuyến mãi: {price} đ
        </h5>
    }

    let cardRender =
        <div className="col-md-3 col-sm-6 mt-1" onClick={handleDirectToDetail}>
            <div className="card card-block p-3">
                <img src={props.item.image.base64} alt="Photo of sunset" style={{height: '150px', width: '100%'}}/>
                <h5 className="card-title mt-3 mb-3">{props.item.name}</h5>
                <p className="card-text">
                    {props.item.description}
                </p>
                {priceElement}
            </div>
        </div>
    return (
        cardRender
    )
}

export default ProductCard;
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
        let url=`/customer/product-detail/${props.item._id}`;
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

    const getFileBase64 = (image) => {
        setItemEdit(prevState => {
            return {
                ...prevState,
                image: image
            }
        })
    }

    const handleChangeEditState = () => {
        setIsEdit(!isEdit);
    }

    const updateProductInfo = () => {
        callApi(`product/${props.item._id}`, 'put', itemEdit)
            .then(alert('Cập nhật thông tin sản phẩm thành công!'));
    }

    let cardRender =
        <Card onClick={handleDirectToDetail} className='product-mouse-over'>
            <Card.Img variant="top" src={props.item.image.base64} className='card-size'/>
            <Card.Body>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Text>
                    Mô tả: {props.item.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Giá: {props.item.price} đ</small>
            </Card.Footer>
        </Card>


    return (
        cardRender
    )
}

export default ProductCard;
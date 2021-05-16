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

    let price = props.item.price
    let priceElement =
        <h5 className='card-title my-0'>
            Giá: {Number(price).toLocaleString('eu')}đ
        </h5>

    if (props.item.promotion_id !== null && (new Date(props.item.promotion_id.end).getTime() > new Date().getTime())) {
        price = price * (100-props.item.promotion_id.value)/100;
        priceElement =  <h5 className='card-title mt-0 mb-3 text-danger'>
            Khuyến mãi: {Number(price).toLocaleString('eu')}đ
        </h5>
    }

    let cardRender =
        // <Card onClick={handleDirectToDetail} className='product-mouse-over'>
        //     <Card.Img variant="top" src={props.item.image.base64} className='card-size'/>
        //     <Card.Body>
        //         <Card.Title>{props.item.name}</Card.Title>
        //         <Card.Text>
        //             Mô tả: {props.item.description}
        //         </Card.Text>
        //     </Card.Body>
        //     <Card.Footer>
        //         <small className="text-muted">Giá: {props.item.price} đ</small>
        //     </Card.Footer>
        <div className="col-md-3 col-sm-6 mt-1" onClick={handleDirectToDetail}>
            <div className="card card-block p-3 border-0">
                <img src={props.item.image.base64} alt="Photo of sunset" style={{height: '200px', width: '100%'}}/>
                <h5 className="card-title mt-2 mb-2">{props.item.name}</h5>
                {/*<p className="card-text">*/}
                {/*    {props.item.description}*/}
                {/*</p>*/}
                {priceElement}
            </div>
        </div>
    // </Card>


    return (
        cardRender
    )
}

export default ProductCard;
import React, {useState, useEffect} from 'react';
import {CardDeck, Card, InputGroup, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileBase64 from "react-file-base64";
import Modal from "react-bootstrap/Modal";
import callApi from "../../../Utils/apiCaller";


const ProductCard = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [itemEdit, setItemEdit] = useState({
        image: props.item.image
    });


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

    let cardRender = !isEdit ?
        <Card>
            <Card.Img variant="top" src={props.item.image.base64}/>
            <Card.Body>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Text>
                    Mô tả: {props.item.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Giá: {props.item.price}đ
                    <Button variant='btn primary' onClick={handleChangeEditState}>
                        Chỉnh sửa
                    </Button>
                </small>
            </Card.Footer>
        </Card>
        :
        <Card>
            {/*<FileBase64*/}
            {/*    // onDone={getFileBase64}*/}
            {/*/>*/}
            <Card.Img variant="top" src={itemEdit.image.base64}/>
            <FileBase64 className='btn' onDone={getFileBase64}/>
            <Card.Body>
                <Card.Title>
                    <FormControl
                        placeholder="Tên"
                        name='name'
                        value={itemEdit.name}
                        onChange={handleChange}
                    />
                </Card.Title>
                <Card.Text>
                    <FormControl as="textarea"
                                 placeholder='Mô tả'
                                 name='description'
                                 value={itemEdit.description}
                                 onChange={handleChange}
                    />
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <FormControl
                    placeholder="Giá"
                    aria-label="Giá"
                    name='price'
                    value={itemEdit.price}
                    onChange={handleChange}
                />
                <Button variant='btn secondary' onClick={()=>{handleChangeEditState(); updateProductInfo()}}>
                    Lưu
                </Button>
            </Card.Footer>
        </Card>


    return (
        cardRender
    )
}

export default ProductCard;
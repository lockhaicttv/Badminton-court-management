import React, {useState, useEffect} from 'react';
import {CardDeck, Card, InputGroup, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileBase64 from "react-file-base64";
import {Modal, Form} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";


const ProductCard = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [promotion, setPromotion] = useState([]);
    const [itemEdit, setItemEdit] = useState({
        image: props.item.image
    });

    useEffect(()=>{
        loadPromotion();
    }, [])

    const loadPromotion = () => {
        callApi('promotion','get', null)
            .then(res=>{
                setPromotion(res.data)
            })
            .catch(()=>{
                console.log('Load promotion fail')
            })
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

    const listPromotion = promotion.map((promotion, key) => {
        return <option key={promotion._id} value={promotion._id}>{promotion.name}</option>
    })

    let cardRender = !isEdit ?
        <Card>
            {/*<Card.Title>*/}
            {/*    <h4 className="card-title text-right"><i className="material-icons">settings</i></h4>*/}
            {/*</Card.Title>*/}
            <Card.Img
                variant="top"
                src={props.item.image.base64}
                className='p-3'
            />
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
            <Card.Img
                variant="top"
                src={itemEdit.image.base64}
                className='p-3'
            />
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
                <FormControl
                    as="select"
                    name='promotion_id'
                    value={itemEdit.promotion_id}
                    onChange={handleChange}
                >
                    {/*<option className='text-muted'>Khuyến mãi</option>*/}
                    {listPromotion}
                </FormControl>
            </Card.Body>
            <Card.Footer>
                <FormControl
                    placeholder="Giá"
                    aria-label="Giá"
                    name='price'
                    value={itemEdit.price}
                    onChange={handleChange}
                />
                <Button variant='btn secondary' onClick={() => {
                    handleChangeEditState();
                    updateProductInfo()
                }}>
                    Lưu
                </Button>
            </Card.Footer>
        </Card>


    return (
        cardRender
    )
}

export default ProductCard;
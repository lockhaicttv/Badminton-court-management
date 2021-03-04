import {Button, InputGroup} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {Modal, Form} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import {categoryState} from "../../../Store/atom";
import {useRecoilState} from "recoil";
import NumericInput, {number} from 'react-numeric-input';

function AddService(props) {
    const [category, setCategory] = useRecoilState(categoryState);
    const [product, setProduct] = useState([]);
    const [billDetail, setBillDetail] = useState({
        quantity: 1,
        court_bill_id: props?.idBill,
        product_id: ''
    })

    useEffect(() => {
        callApi('product_category/get-by-account/6019f135b7409a239c8564e7', 'get', null)
            .then((res) => {
                let item = res.data;
                setCategory(item);
            })
            .catch(() => {
                console.log('fail to load category');
            })
    }, [])

    function handleChangeBillDetail(e) {
        const value = e.target.value;
        setBillDetail({
            ...billDetail,
            [e.target.name]: value,
            court_bill_id: props.idBill
        });
    }

    function handleChangeCategory(e) {
        console.log(e.target.value);
        callApi(`product/get-by-category/${e.target.value}`, 'get', null)
            .then((res) => {
                setProduct(res.data);
            })
    }

    function handleSaveBillDetail() {
        setBillDetail({...billDetail, court_bill_id: props.idBill})
        console.log(props.idBill, billDetail)
        callApi('court_bill_detail', 'post', billDetail).then(
            (res) => {
                console.log(res.data);
            }
        )
    }

    const productCategory = category.map((item, key) => {
        return <option value={item._id} key={key}>{item.name}</option>
    })

    const products = product.map((item, key) => {
        return <option key={key}
                       value={item._id}
        >
            {item.name}
        </option>
    })

    return (
        <Modal show={props.isShow} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control as="select" placeholder="Loại" onChange={handleChangeCategory}>
                        {productCategory}
                    </Form.Control>
                    <br/>
                    <InputGroup>
                        <Form.Control as="select" placeholder="Sản phẩm" value={billDetail.product_id} name='product_id'
                                      onChange={handleChangeBillDetail}>
                            {products}
                        </Form.Control>
                        {/*<NumericInput className="form-control" name='quantity' value={billDetail.quantity} onChange={handleChangeBillDetail}/>*/}
                        <input type='number' name='quantity' value={billDetail.quantity}
                               onChange={handleChangeBillDetail}/>
                    </InputGroup>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={(event) => {
                    props.handleClose();
                    handleSaveBillDetail()
                }}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddService;
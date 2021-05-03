import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {accountIdState, areasState, courtIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";
import callApi from "../../../../Utils/apiCaller";
import FileBase64 from "react-file-base64";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

function AddOrderDetail(props) {
    const [item, setItem] = useState({
        product_id: '',
        quantity: 0,
        user_bill_id: ''
    })
    const [order, setOrder] = useState([])
    const [product, setProduct] = useState([])

    const getAccount = () => {
        callApi('user_bill', 'get', null)
            .then(res => {
                setOrder(res.data)
            })
            .catch(() => {
                setOrder([])
            })
    }

    const getProduct = () => {
        callApi('product', 'get', null)
            .then(res => {
                setProduct(res.data)
            })
            .catch(() => {
                setProduct([])
            })
    }

    useEffect(() => {
        getAccount();
        getProduct();
    }, [])


    const handleSave = () => {
        console.log(item)
        callApi('user_bill_detail', 'post', item)
            .then((res) => {
                props.loadData();
                alert('Thêm thành công')
            })
            .catch(() => alert('Thêm thất bại'))
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
        });
    }

    const listOrder = order.map((order, key) => {
        return <option value={order._id} key={order._id}>{order._id}</option>
    })
    const listProduct = product.map((product, key)=>{
        return <option value={product._id} key={product._id}>{product.name}</option>
    })

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thông tin sân</Modal.Title>
                    <input type='file'/>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Sản phẩm</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as='select'
                            name='product_id'
                            value={item.product_id}
                            onChange={handleChange}
                        >
                            <option>Chọn sản phẩm</option>
                            {listProduct}
                        </FormControl>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mã đơn hàng</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as='select'
                            name='user_bill_id'
                            value={item.user_bill_id}
                            onChange={handleChange}
                        >
                            <option>Chọn mã hoá đơn</option>
                            {listOrder}
                        </FormControl>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Số lượng</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='number'
                            name='quantity'
                            value={item.quantity}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => {
                        props.handleClose();
                        handleSave()
                    }}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddOrderDetail;
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {accountIdState, areasState, courtIdState, realTimeState} from "../../../../Store/atom";
import {useRecoilValue, useRecoilState} from "recoil";
import callApi from "../../../../Utils/apiCaller";
import FileBase64 from "react-file-base64";

function AddProduct(props) {
    const account_id = useRecoilValue(accountIdState);
    const [category, setCategory] = useState([]);
    const [item, setItem] = useState({
        name: '',
        price:'',
        description:'',
        quantity: 0,
        image: [],
        product_category_id: ''
    })
    const [realTime, setRealTime] = useRecoilState(realTimeState);

    const handleSave = () => {
        console.log(item);
        callApi('product', 'post', item)
            .then((res=>{
                alert('Thêm thành công');;
                setRealTime(preventDefault=>preventDefault++);
                console.log(res.data);
            }))
    }

    const loadCategory = () => {
        callApi(`product_category/get-by-account/${account_id}`, 'get',null)
            .then((res)=>{
                setCategory(res.data);
            })
    }

    useEffect(()=>{
        loadCategory();
    },[realTime])

    const handleChange = (e) =>{
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
        });
    }

    const getBase64image = (image) =>{
        setItem({
            ...item,
            image: image
        })
    }

    const listCategory = category.map((item, key)=>{
        return <option value={item._id} key={key}>{item.name}</option>
    })

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm loại sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='name'
                            value={item.name}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Giá</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='price'
                            value={item.price}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='description'
                            value={item.description}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Số lượng</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='quantity'
                            value={item.quantity}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Hình ảnh</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FileBase64 onDone={getBase64image}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Loại sản phẩm</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="select"
                                     placeholder="Sản phẩm"
                                     name='product_category_id'
                                     value={item.product_category_id}
                                     onChange={handleChange}
                        >
                            <option>Chọn loại sản phẩm</option>
                            {listCategory}
                        </FormControl>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={()=>{props.handleClose(); handleSave() }}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddProduct;
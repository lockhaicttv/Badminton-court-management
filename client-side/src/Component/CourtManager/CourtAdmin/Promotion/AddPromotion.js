import React, {useState, useEffect} from 'react'
import {useRecoilValue} from "recoil";
import {accountIdState, courtIdState} from "../../../../Store/atom";
import callApi from "../../../../Utils/apiCaller";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";

const AddPromotion = (props) => {
    const account_id = useRecoilValue(accountIdState);
    const courtInfo = useRecoilValue(courtIdState);
    const [item, setItem] = useState({
        name: '',
        start: Date.now(),
        end: Date.now(),
        value: 0,
        description: ''
    })

    const handleSave = () => {
        callApi('promotion', 'post', item)
            .then(() => alert('Thêm thành công'))
            .catch(() => alert('Thêm thất bại'))
        setItem({
            name: '',
            start: Date.now(),
            end: Date.now(),
            value: 0,
            description: ''
        });
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
            court_id: courtInfo._id
        });
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khuyến mãi</Modal.Title>
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
                            <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as='textarea'
                            name='description'
                            value={item.description}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Khuyến mãi</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='number'
                            name='value'
                            value={item.value}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Ngày bắt đầu</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='date'
                            name='start'
                            value={item.start}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Ngày kết thúc</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='date'
                            name='end'
                            value={item.end}
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

export default AddPromotion;
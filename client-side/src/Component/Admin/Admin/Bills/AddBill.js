import {Button, FormControl, InputGroup, Modal, Form} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {accountIdState, areasState, courtIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";
import callApi from "../../../../Utils/apiCaller";

function AddBill(props) {
    const court_id = useRecoilValue(courtIdState);
    const account_id = useRecoilValue(accountIdState);
    const [area, setArea] = useState([]);
    const [item, setItem] = useState({
        time_check_in: new Date().getDate(),
        time_check_out: null,
        status: false,
        court_area_id: ''
    })

    useEffect(() => {
        loadArea();
    },[])

    const loadArea = () => {
        callApi(`court_area/${account_id}`, 'get', null)
            .then((res) => {
                setArea(res.data)
            })
    }

    const handleSave = () => {
        console.log(item);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
            court_id: court_id,
        });
    }

    const listArea = area.map((item, key) => {
        return <option value={item._id}>{item.area}</option>
    })

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
                        </InputGroup.Prepend>
                            <input
                                type='date'
                                name='time_check_in'
                                value={item.time_check_in}
                                onChange={handleChange}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
                        </InputGroup.Prepend>
                            <input
                                type='date'
                                name='time_check_out'
                                value={item.time_check_out}
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="select"
                                     placeholder="Sản phẩm"
                                     name='court_area_id'
                                     value={item.court_area_id}
                                     onChange={handleChange}
                        >
                            <option>Chọn sân</option>
                            {listArea}
                        </FormControl>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Trạng thái hoá đơn</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="select"
                                     name='status'
                                     value={item.status}
                                     onChange={handleChange}
                        >
                            <option>Chọn sân</option>
                            <option value={true}>Đã thanh toán</option>
                            <option value={false}>Chưa thanh toán</option>
                        </FormControl>
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

export default AddBill;
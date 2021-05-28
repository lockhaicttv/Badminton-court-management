import React, {useEffect, useState} from "react";
import {courtIdState} from "../../../Store/atom";
import {useRecoilValue} from "recoil";
import callApi from "../../../Utils/apiCaller";
import {Modal, InputGroup, FormControl, Button} from "react-bootstrap";

const AddCourtBooking = (props) => {
    const courtInfo = useRecoilValue(courtIdState);
    const [item, setItem] = useState({
        booker_name: '',
        start: '',
        end: '',
        phone_number: '',
        description: '',
        status: true,
        court_area_id: ''
    })

    const handleSave = () => {
        callApi('court_booking', 'post', item)
            .then(res => {

                    alert(res.data)
                }
            )
            .catch(
                alert('Thêm thất bại')
            )
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
        });
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm lịch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Tên người đặt</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='booker_name'
                            value={item.booker_name}
                            onChange={handleChange}
                            placeholder={item.booker_name}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Thời gian bắt đầu</InputGroup.Text>
                        </InputGroup.Prepend>
                        <input
                            type='datetime-local'
                            name='start'
                            value={item.start}
                            onChange={handleChange}
                            className='form-control'
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Thời gian kết thúc</InputGroup.Text>
                        </InputGroup.Prepend>
                        <input
                            type='datetime-local'
                            name='end'
                            value={item.end}
                            onChange={handleChange}
                            className='form-control'
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='phone_number'
                            value={item.phone_number}
                            onChange={handleChange}
                            placeholder={item.phone_number}
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Ghi chú</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='description'
                            value={item.description}
                            onChange={handleChange}
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Sân</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as='select'
                            name='court_area_id'
                            value={item.court_area_id}
                            onChange={handleChange}
                            aria-describedby="basic-addon1"
                        >
                            <option>Chọn sân</option>
                        </FormControl>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleSave();
                        props.handleClose();
                    }}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default AddCourtBooking;
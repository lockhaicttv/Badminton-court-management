import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {accountIdState, areasState, courtIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";
import callApi from "../../../../Utils/apiCaller";

function AddOwner(props) {
    const [item, setItem] = useState({
        username: '',
        password_1: '',
        password_2: '',
        full_name: '',
        address: '',
        phone_number: 0,
        court_id: '',
        id_card: '',
        gender: '',
        role: 'user'
    })
    const [court, setCourt] = useState([])

    const getCourt = () => {
        callApi('court', 'get', null)
            .then(res=>{
                setCourt(res.data)
            })
            .catch(()=>{
                setCourt([])
            })
    }

    useEffect(()=>{
        getCourt();
    }, [])

    const handleSave = () => {
        callApi('account', 'post', item)
            .then((res)=>{
                props.loadData();
                alert('Thêm thành công')
            })
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
        });
    }

    const listCourt = court.map((court, key)=>{
        return <option value={court._id} key={court._id}>{court.name}</option>
    })

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khuyến mãi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Tài khoản</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='username'
                            value={item.username}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mật khẩu cấp 1</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='password_1'
                            value={item.password_1}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mật khẩu cấp 2</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='password_2'
                            value={item.password_2}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Họ tên</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            name='full_name'
                            value={item.full_name}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Địa chỉ</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            name='address'
                            value={item.address}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='number'
                            name='phone_number'
                            value={item.phone_number}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Giới tính</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as='select'
                            name='gender'
                            value={item.gender}
                            onChange={handleChange}
                        >
                            <option>Giới tính</option>
                            <option value='male'>Nam</option>
                            <option value='female'>Nữ</option>
                        </FormControl>
                    </InputGroup>
                    {/*<InputGroup className="mb-3">*/}
                    {/*    <InputGroup.Prepend>*/}
                    {/*        <InputGroup.Text id="basic-addon1">Ngày sinh</InputGroup.Text>*/}
                    {/*    </InputGroup.Prepend>*/}
                    {/*    <FormControl*/}
                    {/*        type='date'*/}
                    {/*        name='birthday'*/}
                    {/*        value={item.birthday}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</InputGroup>*/}
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mã sân</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as='select'
                            name='court_id'
                            value={item.court_id}
                            onChange={handleChange}
                        >
                            <option>Chọn sân</option>
                            {listCourt}
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

export default AddOwner;
import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col, Modal} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import {useSetRecoilState} from "recoil/es/recoil";
import {accountIdState, authenticationState} from "../../../Store/atom";
import {useHistory} from "react-router";

function Register(props) {

    const history = useHistory();
    const [registerType, setRegisterType] = useState(true);
    const [checkUsername, setCheckUsername] = useState('');
    const [account, setAccount] = useState({
        username: '',
        password_1: '',
        password_2: '',
        full_name: '',
        phone_number: 0,
        address: '',
        birthday: null,
        gender: 'male',
        role: 'user',
        id_card: null
    })
    const [user, setUser] = useState({
        username: "",
        password: "",
        full_name: "",
        address: "",
        phone_number: 0,
        id_card: null,
        gender: "male",
        birth_day: null,
    })

    const handleChangeType = (resType) => {
        setRegisterType(resType);
    }

    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeUser = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckUserName = () => {
        callApi(`account/check-exist/${account.username}`, 'get', null)
            .then((res) => {
                console.log(res.data.message)
                setCheckUsername(res.data.message);
            })
    }

    const handleSubmitOwner = () => {
        callApi('account', 'post', account)
            .then((res) => {
                console.log(res.data)
                if (res.data.message.includes('thành công')) {
                    props.setAuthentication('owner');
                    history.push('/');
                } else {
                    alert(res.data);
                }
            })
    }

    const handleSubmitUser = () => {
        callApi('user', 'post', user)
            .then((res) => {
                console.log(res.data)
                if (res.data.message.includes('thành công')) {
                    props.setAuthentication('customer');
                    history.push('/customer');
                } else {
                    alert(res.data);
                }
            })
    }


    const ownerForm = <Form className='px-5  p-5 shadow'>
        <Form.Group controlId="formBasicEmail">
            <Form.Control size='lg' type="text" placeholder="Họ tên"
                          name='full_name'
                          value={account.full_name}
                          onChange={handleChange}
            />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
            <Form.Control size='lg' type="text" placeholder="Tên đăng nhập"
                          name='username'
                          value={account.username}
                          onChange={handleChange}
                          onKeyUp={handleCheckUserName}
            />
            <Form.Text size='lg' className="text-muted">
                {checkUsername}
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control size='lg' type="password" placeholder="Mật khẩu"
                          name='password_1'
                          value={account.password_1}
                          onChange={handleChange}
            />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control size='lg' type="text" placeholder="Số điện thoại"
                          name='phone_number'
                          value={account.phone_number}
                          onChange={handleChange}
            />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
            <Form.Control as="select" size='lg'
                          name='gender'
                          value={account.gender}
                          onChange={handleChange}
            >
                <option>Giới tính...</option>
                <option value='male'>Nam</option>
                <option value='fe-male'>Nữ</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control size='lg' type="text" placeholder="Địa chỉ"
                          name='address'
                          value={account.address}
                          onChange={handleChange}
            />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control size='lg' type="date" placeholder="Ngày sinh"
                          name='birthday'
                          value={account.birthday}
                          onChange={handleChange}
            />
        </Form.Group>
        <Row>
            <Col>
                <Button size='lg' variant="success"
                        onClick={handleSubmitOwner}
                >
                    Đăng ký
                </Button>
            </Col>
        </Row>
    </Form>

    const userForm = <Form className='px-5  p-5 shadow'>
        <Form.Group controlId="formBasicEmail">
            <Form.Control size='lg' type="text" placeholder="Họ tên"
                          name='full_name'
                          value={user.full_name}
                          onChange={handleChangeUser}
            />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
            <Form.Control size='lg' type="text" placeholder="Tên đăng nhập"
                          name='username'
                          value={user.username}
                          onChange={handleChangeUser}
                          onKeyUp={handleCheckUserName}
            />
            <Form.Text size='lg' className="text-muted">
                {checkUsername}
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control size='lg' type="password" placeholder="Mật khẩu"
                          name='password'
                          value={user.password}
                          onChange={handleChangeUser}
            />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control size='lg' type="text" placeholder="Số điện thoại"
                          name='phone_number'
                          value={user.phone_number}
                          onChange={handleChangeUser}
            />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
            <Form.Control as="select" size='lg'
                          name='gender'
                          value={user.gender}
                          onChange={handleChangeUser}
            >
                <option>Giới tính...</option>
                <option value='male'>Nam</option>
                <option value='fe-male'>Nữ</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control size='lg' type="text" placeholder="Địa chỉ"
                          name='address'
                          value={user.address}
                          onChange={handleChangeUser}
            />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control size='lg' type="date" placeholder="Ngày sinh"
                          name='birthday'
                          value={user.birthday}
                          onChange={handleChangeUser}
            />
        </Form.Group>
        <Row>
            <Col>
                <Button size='lg' variant="success"
                        onClick={handleSubmitUser}
                >
                    Đăng ký
                </Button>
            </Col>
        </Row>
    </Form>

    let modalBody;
    if (registerType) {
        modalBody = ownerForm
    } else {
        modalBody = userForm
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="d-flex mb-3">
                            <Button className="p-2 bg-info flex-fill" onClick={() => handleChangeType(true)}>Chủ
                                sân</Button>
                            <Button className="p-2 bg-warning flex-fill" onClick={() => handleChangeType(false)}>Khách
                                hàng</Button>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                {/*<Modal.Body>*/}
                {modalBody}
                {/*</Modal.Body>*/}
            </Modal>
        </div>
    )
}

export default Register;

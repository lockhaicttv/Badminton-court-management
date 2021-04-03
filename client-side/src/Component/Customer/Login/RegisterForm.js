import React, {useState, useEffect} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router";
import callApi from "../../../Utils/apiCaller";


const RegisterForm = (props) => {
    const history = useHistory();
    const [checkUsername, setCheckUsername] = useState('');

    const [user, setUser] = useState({
        username: "",
        password: "",
        full_name: "",
        address: "",
        phone_number: 0,
        id_card: null,
        gender: "male",
        birthday: null,
    })

    const handleChangeUser = (e) => {
        setUser({
                ...user,
                [e.target.name]: e.target.value
        })
    }

    const handleCheckUserName = (e) => {
        if (e.target.value!=='') {
            callApi(`account/check-exist/${user.username}`, 'get', null)
                .then((res) => {
                    if (res.data.message.includes('tồn tại')) {
                        setCheckUsername(res.data.message);
                    } else {
                        callApi(`user/check-exist/${user.username}`, 'get', null)
                            .then((res) => {
                                console.log(res.data.message)
                                setCheckUsername(res.data.message);
                            })
                    }
                })
        }else {
            setCheckUsername('Vui lòng nhập tài khoản');
        }

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
                        block
                >
                    Đăng ký
                </Button>
            </Col>
        </Row>
    </Form>

    return (
        <Row>
            <Col>
                <h1 className='text-info'>Đăng ký</h1>
                <p>Tạo tài khoản để theo dõi đơn hàng, lưu
                    danh sách sản phẩm, hoá đơn, chứng từ.
                </p>
            </Col>
            <Col>
                {userForm}
            </Col>
        </Row>
    )
}

export default RegisterForm;
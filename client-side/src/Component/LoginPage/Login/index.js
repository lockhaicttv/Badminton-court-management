import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import Modal from "react-bootstrap/Modal";
import Register from '../Register';
import {useSetRecoilState, useRecoilState} from "recoil";
import {accountIdState} from "../../../Store/atom";
import {useHistory} from 'react-router-dom';

function Login() {
    const history = useHistory();
    const [account, setAccount] = useState({
        username: '',
        password: ''
    });
    const [account_id,setAccountId] = useRecoilState(accountIdState);

    const [isShow, setIsShow] = useState(false);

    const handleSubmit = () => {
        callApi('account/check-login', 'post', account).then(
            (res) => {
                if (res.data.type === 'owner') {
                    setAccountId(res.data.info._id);
                    console.log(account_id)
                    history.push('/');
                }
                else {
                    setAccountId(account._id);
                    window.location.href = '/customer';
                }
            }
        ).catch((err) => {
            alert('Đăng nhập thất bại');
            // history.push('/home/court');
        });
    }

    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
        console.log(account)
    }

    const handleClose = () => {
        setIsShow(!isShow);
    }
    console.log(account_id)
    return (
        <Row className='justify-content-md-center my-5 py-5'>
            <Col xs lg={6}>
                <h1 className='text-info'></h1>
                <h2>Giúp bạn quản lý hoá đơn,</h2>
                <h2>sản phẩm và đăng bản các sản phẩm của mình</h2>
            </Col>
            <Col xs lg={3}>
                <Form className='px-5  p-5 shadow'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control size='lg' type="text" placeholder="Tên đăng nhập"
                                      name='username'
                                      value={account.username}
                                      onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control size='lg' type="password" placeholder="Mật khẩu"
                                      name='password'
                                      value={account.password}
                                      onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Nhớ mật khẩu"/>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button size='lg' variant="success" s
                                    onClick={handleClose}
                            >
                                Đăng ký
                            </Button>
                        </Col>
                        <Col>
                            <Button size='lg' variant="primary" s
                                    onClick={handleSubmit}
                            >
                                Đăng nhập
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Register isShow={isShow} handleClose={handleClose}/>
        </Row>
    )
}

export default Login;

import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useRecoilState, useSetRecoilState} from "recoil";
import {accountIdState, authenticationState} from "../../../Store/atom";
import callApi from "../../../Utils/apiCaller";


const LoginForm = (props) => {
    const history = useHistory();
    const [account, setAccount] = useState({
        username: '',
        password: ''
    });

    const [account_id, setAccountId] = useRecoilState(accountIdState);

    const handleSubmit = () => {
        callApi('account/check-login', 'post', account)
            .then(
                (res) => {
                    console.log(res.data)
                    if (res.data.type === 'owner') {
                        setAccountId(res.data.info._id);
                        props.setAuthentication({
                            isAuthenticated: true,
                            role: 'owner'
                        });
                        history.push('/')
                    } else {
                        setAccountId(res.data.info._id);
                        props.setAuthentication({
                            isAuthenticated: true,
                            role: 'customer'
                        });
                        props.handleClose();
                    }
                }
            )
            .catch((err) => {
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


    const loginForm = <Form className='px-5  p-5 shadow'>
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

        <Button size='lg' variant="success" block
                onClick={handleSubmit}
        >
            Đăng nhập
        </Button>

    </Form>

    return (
        <Row>
            <Col>
                <h1 className='text-info'>Đăng nhập</h1>
                <p>Đăng nhập để lưu lại thông tin mua hàng, hoá đơn</p>
            </Col>
            <Col>
                {loginForm}
            </Col>
        </Row>
    )
}

export default LoginForm;
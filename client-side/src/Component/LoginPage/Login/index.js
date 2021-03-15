import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";

function Login() {
    const [account, setAccount] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = () => {
        console.log('àasfasfa')
        callApi('account/check-login', 'post', account).then(
            (res)=>{
                console.log('Đã gửi')
                alert(res.data.message);
            }
        ).catch((err)=>{
            alert('Đăng nhập thất bại');
        });
    }

    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
        console.log(account)
    }

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

                        <Button size='lg' variant="primary" s
                            onClick={handleSubmit}
                        >
                            Đăng nhập
                        </Button>
                    </Form>
            </Col>
        </Row>
    )
}

export default Login;

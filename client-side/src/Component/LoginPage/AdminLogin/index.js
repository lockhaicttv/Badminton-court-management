import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import Modal from "react-bootstrap/Modal";
import Register from "../Register";
import { useSetRecoilState, useRecoilState } from "recoil";
import { accountIdState, authenticationState } from "../../../Store/atom";
import { useHistory } from "react-router-dom";
import ls from "../../../Utils/localStorage";

function AdminLogin() {
    const history = useHistory();
    const setAuthentication = useSetRecoilState(authenticationState);
    const [account, setAccount] = useState({
        username: "",
        password: "",
    });
    const [account_id, setAccountId] = useRecoilState(accountIdState);
    const [isShow, setIsShow] = useState(false);

    const handleSubmit = () => {
        callApi("account/check-login", "post", account)
            .then((res) => {
                if (res.data.type === "admin") {
                    setAccountId(res.data.info._id);
                    setAuthentication({
                        isAuthenticated: true,
                        role: "admin",
                    });
                    history.push("/admin/database/owner");
                } else {
                   alert('Đăng nhập thất bại')
                }
            })
            .catch((err) => {
                alert("Đăng nhập thất bại");
                // history.push('/home/court');
            });
    };

    const setAuthenticationForRegister = (role) => {
        setAuthentication({
            isAuthenticated: true,
            role: role,
        });
    };

    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
        console.log(account);
    };

    const handleClose = () => {
        setIsShow(!isShow);
    };

    return (
        <Row className="justify-content-md-center mx-0  my-5 py-5 align-items-center">
            <Col xs lg={6} className="text-center">
                <img src="/image/bg-admin.jpg" width="100%" className="mb-5" />
            </Col>
            <Col xs lg={3} className="align-items-center">
                <h3 className="text-center font-weight-bold p-2">ĐĂNG NHẬP ADMIN</h3>
                <Form className="px-5  p-5 shadow">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Tên đăng nhập"
                            name="username"
                            value={account.username}
                            onChange={handleChange}
                            className="rounded-pill"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            size="lg"
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            value={account.password}
                            className="rounded-pill"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Nhớ mật khẩu" />
                    </Form.Group>
                    <Row className="">
                        <Col>
                            <Button
                                size="lg"
                                bsPrefix="btn-web-primary"
                                className="rounded-pill"
                                onClick={handleSubmit}

                            >
                                Đăng nhập
                            </Button>


                        </Col>
                    </Row>
                </Form>
            </Col>
            <Register
                isShow={isShow}
                handleClose={handleClose}
                setAuthentication={setAuthenticationForRegister}
            />
        </Row>
    );
}

export default AdminLogin;

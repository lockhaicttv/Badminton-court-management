import React, {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {useSetRecoilState} from "recoil";
import {authenticationState} from "../../../Store/atom";

const Login = (props) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSetIsLogin = (state) => {
        setIsLogin(state);
    }


    return (
        <div>
            <Modal
                show={props.isShow}
                onHide={props.handleClose}
                size='lg'
            >
                <Modal.Header closeButton >
                    <Modal.Title>
                        <div className="d-flex mb-3">
                            <Button className="p-2 bg-info flex-fill" onClick={() => handleSetIsLogin(true)}>
                                Đăng nhập
                            </Button>
                            <Button className="p-2 bg-warning flex-fill" onClick={() => handleSetIsLogin(false)}>
                                Tạo tài khoản
                            </Button>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        {isLogin ?
                            <LoginForm handleClose={props.handleClose} setAuthentication={props.setAuthentication}/>
                            :
                            <RegisterForm handleClose={props.handleClose} setAuthentication={props.setAuthentication}/>
                        }
                    </Modal.Body>

            </Modal>
        </div>
    )
}

export default Login;
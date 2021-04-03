import React, {useState, useEffect} from "react";
import {accountIdState} from "../../../../Store/atom";
import {useRecoilState} from "recoil";
import callApi from "../../../../Utils/apiCaller";
import {Form, Button, Row, Col} from "react-bootstrap";

const EditInfo = () => {
    const [accountID, setAccountID] = useRecoilState(accountIdState);
    const [info, setInfo] = useState({
        username: "",
        password: "",
        full_name: "",
        address: "",
        phone_number: 0,
        id_card: null,
        gender: "male",
        birth_day: null,
    });
    console.log(accountID)
    const loadInfo = () => {
        callApi(`user/?_id=${accountID}`, 'get', null)
            .then(res => {
                setInfo(res.data[0])
            })
            .catch(() => {
                setInfo({})
            })
    }

    useEffect(() => {
        loadInfo();
    }, [])

    const handleChangeInfo = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
        console.log(info)
    }
    return (
        <Form className='px-5  p-5 '>
            <Form.Group controlId="formBasicEmail">
                <Form.Control size='lg' type="text" placeholder={info.full_name}
                              name='full_name'
                              value={info.full_name}
                              onChange={handleChangeInfo}
                />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Control size='lg' type="text" placeholder="Email"
                              name='email'
                              value={info.email}
                              onChage={handleChangeInfo}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control size='lg' type="text" placeholder="Số điện thoại"
                              name='phone_number'
                              value={info.phone_number}
                              onChange={handleChangeInfo}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control size='lg' type="text" placeholder="Địa chỉ"
                              name='address'
                              value={info.address}
                              onChange={handleChangeInfo}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control size='lg' type="date" placeholder="Ngày sinh"
                              name='birth_day'
                              value={info.birth_day}
                              onChange={handleChangeInfo}
                />
            </Form.Group>
            <Row>
                <Col>
                    <Button size='lg' variant="success"
                            block
                    >
                        Cập nhật
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default EditInfo;
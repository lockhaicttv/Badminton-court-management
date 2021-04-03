import React, {useState, useEffect} from "react";
import {accountIdState} from "../../../../Store/atom";
import {useRecoilState} from "recoil";
import callApi from "../../../../Utils/apiCaller";
import {Form, Button, Row, Col} from "react-bootstrap";

const EditInfo = () => {
    const [accountID, setAccountID] = useRecoilState(accountIdState);
    const [info, setInfo] = useState({
        full_name: "",
        address: "",
        phone_number: 0,
        gender: "male",
        birthday: new Date(),
    });
    console.log(accountID)
    const loadInfo = () => {
        callApi(`user/?_id=${accountID}`, 'get', null)
            .then(res => {
                console.log(res.data[0])
                setInfo(res.data[0])
            })
            .catch(() => {
                setInfo(prevState => {
                    return {...prevState}
                })
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
        console.log(info.birthday)
    }

    const handleUpdate = () => {
        callApi(`user/${accountID}`, 'put', info)
            .then(res=>{
                alert(res.data)
            })
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
                              name='birthday'
                              value={Date.parse(info.birthday)}
                              onChange={handleChangeInfo}
                />
            </Form.Group>
            <Row>
                <Col>
                    <Button size='lg' variant="success"
                            onClick={handleUpdate}
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
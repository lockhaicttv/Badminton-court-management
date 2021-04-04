import React, {useState, useEffect} from 'react'
import {useRecoilState} from "recoil";
import {accountIdState} from "../../../../Store/atom";
import callApi from "../../../../Utils/apiCaller";
import {Form, FormControl} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EditAddress = () => {
    const [accountID, setAccountID] = useRecoilState(accountIdState);
    const [isEdit, setIsEdit] = useState(false);
    const [address, setAddress] = useState({
        address: ''
    })

    const loadAddress = () => {
        callApi(`user/?_id=${accountID}`, 'get', null)
            .then(res => {
                setAddress({address:res.data[0].address})
            })
            .catch(() => {
                setAddress({address: ''})
            })
    }

    useEffect(() => {
        loadAddress();
    }, [])

    const changeUpdateState = () => {
        setIsEdit(!isEdit);
    }


    const handleUpdate = () =>{
        callApi(`user/${accountID}`, 'put', address)
            .then(res=>{
                alert('Cập nhật địa chỉ thành công');
            })
            .catch(()=>{
                alert('Cập nhật địa chỉ thất bại');
            })
    }


    const handleChangeAddress = (e) => {
        setAddress({
            address: e.target.value
        });
    }
    let addressRender = <div>{address.address}</div>;
    if (isEdit) {
        addressRender = <Form.Group controlId="formBasicEmail">
            <Form.Control size='lg' type="text" placeholder={address.address}
                          name='address'
                          value={address.address}
                          onChange={handleChangeAddress}
            />
        </Form.Group>
    }


    return (
        <div className='p-3'>
            <Row>
                <Col>
                    Địa chỉ
                </Col>
                <Col>
                    {addressRender}
                </Col>
                <Col>
                    {   isEdit?
                        <Button variant='secondary' onClick={()=>{changeUpdateState();handleUpdate();}}>
                            Lưu
                        </Button>
                        :
                        <Button variant='success' onClick={changeUpdateState}>
                            Chỉnh sửa
                        </Button>
                    }
                </Col>
            </Row>

        </div>
    )
}

export default EditAddress
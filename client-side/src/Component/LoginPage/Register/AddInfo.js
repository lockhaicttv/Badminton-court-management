import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col, Modal} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import {useRecoilValue} from "recoil/es/recoil";
import {accountIdState} from "../../../Store/atom";
import FileBase64 from "react-file-base64";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {useHistory, useParams} from "react-router";

const AddInfo = () => {
    const history = useHistory();
    const account_id = useParams().account_id;
    const [info, setInfo] = useState({
        name: '',
        address: '',
        phone_number: '',
        email_id: '',
        description: '',
        logo: {
            base64: ''
        },
        banner: {
            base64: ''
        },
        court_total: '',
        account_id: '',
        court_price: ''
    })
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);
            callApi('court', 'post', info)
                .then(res => {
                    alert('Thêm thành công');
                    history.push('/home/court')
                })
                .catch(() => {
                    alert('Hệ thống đang có vấn đề, vui lòng thử lại sau');
                })
        }
    };

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
            account_id: account_id
        })
        console.log(info)
    }

    const getLogo = (image) => {
        setInfo({
            ...info,
            logo: image
        })
    }

    const getBanner = (image) => {
        setInfo({
            ...info,
            banner: image
        })
    }


    return (
        <div className='container col-lg-5'>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="px-5  p-5 shadow">
                <h3 className='text-center'>THÊM THÔNG TIN SÂN</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Tên sân"
                        name="name"
                        value={info.name}
                        onChange={handleChange}
                        // className="rounded-pill"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Địa chỉ"
                        name="address"
                        value={info.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Số điện thoại"
                        name="phone_number"
                        value={info.phone_number}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        size="lg"
                        type="textarea"
                        placeholder="Mô tả về sân"
                        name="description"
                        value={info.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Số lượng sân hiện có"
                        name="court_total"
                        value={info.court_total}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Giá giờ / sân"
                        name="court_price"
                        value={info.court_price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Tài khoản ngân hàng"
                        name="email_id"
                        value={info.email_id}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <label className="btn btn btn-secondary">
                        <FileBase64 id='file' onDone={getLogo}/>
                        <FontAwesomeIcon icon={faEdit}/>
                        <i>Thêm logo</i>
                    </label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <label className="btn btn btn-secondary">
                        <FileBase64 id='file' onDone={getBanner}/>
                        <FontAwesomeIcon icon={faEdit}/>
                        <i>Thêm Banner</i>
                    </label>
                </Form.Group>
                <Button
                    size="lg"
                    className=""
                    type='submit'
                    block
                >
                    Lưu thông tin
                </Button>
            </Form>
        </div>
    )
}

export default AddInfo;
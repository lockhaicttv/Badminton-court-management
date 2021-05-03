import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {accountIdState, areasState, courtIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";
import callApi from "../../../../Utils/apiCaller";
import FileBase64 from "react-file-base64";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

function AddCourtInfo(props) {
    const [item, setItem] = useState({
        name: '',
        address: '',
        phone_number: '',
        email_id: '',
        website: '',
        description: '',
        logo: {
            name: '',
            type: '',
            size: '',
            base64: ''
        },
        banner: {
            name: '',
            type: '',
            size: '',
            base64: ''
        },
        court_total: 0,
        account_id: ''
    })
    const [account, setAccount] = useState([])

    const getAccount = () => {
        callApi('account', 'get', null)
            .then(res => {
                setAccount(res.data)
            })
            .catch(() => {
                setAccount([])
            })
    }

    useEffect(() => {
        getAccount();
    }, [])

    const getLogo = (image) => {
        setItem(prevState => {
            return {
                ...prevState,
                logo: image
            }
        })
    }

    const getBanner = (image) => {
        setItem(prevState => {
            return {
                ...prevState,
                banner: image
            }
        })
    }


    const handleSave = () => {
        console.log(item)
        callApi('court', 'post', item)
            .then((res) => {
                props.loadData();
                alert('Thêm thành công')
            })
            .catch(() => alert('Thêm thất bại'))
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
        });
    }

    const listAccount = account.map((account, key) => {
        return <option value={account._id} key={account._id}>{account.username}</option>
    })

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thông tin sân</Modal.Title>
                    <input type='file'/>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='name'
                            value={item.name}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Địa chỉ</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='address'
                            value={item.address}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='phone_number'
                            value={item.phone_number}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            name='description'
                            value={item.description}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Số sân</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='number'
                            name='court_total'
                            value={item.court_total}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Tài khoản paypal</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            name='email_id'
                            value={item.email_id}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <label className="btn btn btn-secondary">
                            <FileBase64 onDone={getLogo}/>
                            <FontAwesomeIcon icon={faEdit}/>
                            <i>Thêm logo</i>
                        </label>
                    </InputGroup>
                    <img
                        src={item.logo.base64}
                        className='my-2'
                        alt='Logo'
                        height={100}
                        width={100}
                    />
                    <InputGroup className="mb-3">
                        <label className="btn btn btn-secondary">
                            <FileBase64 onDone={getBanner}/>
                            <FontAwesomeIcon icon={faEdit}/>
                            <i>Thêm banner</i>
                        </label>
                    </InputGroup>
                    <img
                        src={item.banner.base64}
                        className='my-2'
                        alt='banner'
                        height={100}
                        width={200}
                    />
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Tài khoản</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as='select'
                            name='account_id'
                            value={item.account_id}
                            onChange={handleChange}
                        >
                            {listAccount}
                        </FormControl>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => {
                        props.handleClose();
                        handleSave()
                    }}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddCourtInfo;
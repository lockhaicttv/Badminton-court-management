import React, {useState, useEffect} from "react";
import {courtIdState} from "../../../Store/atom";
import {useRecoilValue, useRecoilState} from "recoil";
import {Button, Card, Modal} from "react-bootstrap";
import FileBase64 from "react-file-base64";
import callApi from "../../../Utils/apiCaller";
import ReactDom from 'react-dom'

const EditBanner = (props) =>{
    const {isShowModal, handleClose} = props;
    const [banner, setBanner] = useState({});

    const getBase64 = (image) =>{
        setBanner(image);
    }

    const handleEditBanner = () =>{
        props.editBanner(banner);
    }

    return <Modal show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card.Img variant="top" src={banner.base64}/>
            <FileBase64 onDone={getBase64}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleEditBanner}>
                Lưu thay đổi
            </Button>
        </Modal.Footer>
    </Modal>

}

export default EditBanner;
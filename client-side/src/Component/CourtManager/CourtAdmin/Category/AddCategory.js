import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {accountIdState, areasState, courtIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";

function AddCategory(props) {
    const account_id = useRecoilValue(accountIdState);
    const court_id = useRecoilValue(courtIdState);
    const [item, setItem] = useState({
        name: '',
    })

    const handleSave = () => {
        console.log(item);
    }

    const handleChange = (e) =>{
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
            account_id: account_id
        });
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm loại sản phẩm</Modal.Title>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={()=>{props.handleClose(); handleSave() }}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddCategory;
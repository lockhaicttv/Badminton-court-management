import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {accountIdState, areasState, courtIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";

function AddArea(props) {
    const areaState = useRecoilValue(areasState)
    const account_id = useRecoilValue(accountIdState);
    const court_id = useRecoilValue(courtIdState);
    const [item, setItem] = useState({
        area: props.court_total,
        status: false,
        description: '',
        court_id: court_id
    })

    const handleSave = () => {
        console.log(item);
    }

    const handleChange = (e) =>{
        const value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value,
            court_id: court_id,
        });
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='area'
                            value={item.area}
                            onChange={handleChange}
                            placeholder={item.area}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name='description'
                            value={item.description}
                            onChange={handleChange}
                            placeholder="Mô tả"
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

export default AddArea;
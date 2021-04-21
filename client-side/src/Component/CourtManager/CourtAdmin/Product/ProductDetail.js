import React, {useState, useEffect} from "react"
import FileBase64 from "react-file-base64";
import callApi from "../../../../Utils/apiCaller";
import {Media, Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from "@fortawesome/free-solid-svg-icons";

const ProductDetail = (props) => {
    const [image, setImage] = useState();

    useEffect(()=>{
        setImage(props.data.image)
    }, [props])


    const getBase64 = (image) => {
        callApi(`product/${props.data._id}`,'put', {image:image})
            .then(res=>{
                setImage(image)
                alert('Update hình ảnh thành công')
            })
            .catch(()=>{
                alert('Update hình ảnh thất bại');
            })
    }

    let elementRender = <div/>
    if (image !== undefined) {
        elementRender = <Media>
            <img
                width={150}
                height={150}
                className="align-self-start mr-3"
                src={image.base64}
                alt="Generic placeholder"
            />
            <Media.Body>
                <h5>{props.data.name}</h5>
                <p>
                    {props.data.description}
                </p>
            </Media.Body>
        </Media>
    }

    return (
        <div>
            {elementRender}
            <label className="btn btn btn-secondary">
                <FileBase64 id='file' onDone={getBase64}/>
                <FontAwesomeIcon icon={faEdit}/>
                <i>Thay ảnh</i>
            </label>
        </div>
    )
}

export default ProductDetail;
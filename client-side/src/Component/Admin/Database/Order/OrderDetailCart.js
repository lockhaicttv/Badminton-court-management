import React from 'react';
import {Media, Row, Col} from "react-bootstrap";

const OrderDetailCart = (props) => {
    return (
        <Row>
            <Col sm={6}>
                <Media>
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={props.orderDetail.product_id.image.base64}
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>{props.orderDetail.product_id.name}</h5>
                        <p>
                           Số lượng: {props.orderDetail.quantity}
                        </p>
                    </Media.Body>
                </Media>
            </Col>
            <Col>
                <div>{(props.orderDetail.quantity * props.orderDetail.product_id.price).toLocaleString()}</div>
            </Col>
        </Row>
    )
}

export default OrderDetailCart;
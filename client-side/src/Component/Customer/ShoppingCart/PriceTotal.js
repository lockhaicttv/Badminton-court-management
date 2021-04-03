import React, {useState, useEffect} from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {totalCartState} from '../../../Store/selector';
import {useRecoilValue} from "recoil";
import Button from "react-bootstrap/Button";


const PriceTotal = () => {
    const priceTotal = useRecoilValue(totalCartState);

    return (
        <Card style={{width: '18rem'}}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <div className='justify-content-around'>
                        <div>
                            Tạm tính
                        </div>
                        <div>
                            {priceTotal.subTotal} VND
                        </div>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='justify-content-around'>
                        <div className='text-danger'>Thành tiền</div>
                        <div>
                            {priceTotal.subTotal} VND
                        </div>
                    </div>
                </ListGroup.Item>
                <Button variant='danger' block>
                    Thanh toán
                </Button>
            </ListGroup>
        </Card>
    )
}

export default PriceTotal;
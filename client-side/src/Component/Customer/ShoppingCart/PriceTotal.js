import React, {useState, useEffect} from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {totalCartState} from '../../../Store/selector';
import {useRecoilValue} from "recoil";
import Button from "react-bootstrap/Button";
import {accountIdState, authenticationState} from "../../../Store/atom";
import callApi from "../../../Utils/apiCaller";
import ls from '../../../Utils/localStorage';

const PriceTotal = () => {
    const priceTotal = useRecoilValue(totalCartState);
    const authentication = useRecoilValue(authenticationState);
    const user_id = useRecoilValue(accountIdState);
    const cart = ls.getItem('cart');
    console.log(cart)
    const [bill, setBill] = useState({
        pay_time: new Date(),
        description: '',
        price_total: priceTotal.subTotal,
        status: 'Chưa thanh toán',
        user_id: user_id
    });

    useEffect(()=>{
        let description = `Đã mua ${cart.length} sản phẩm. Bấm vào để xem chi tiết`;
        let status = 'Đã thanh toán';

        setBill({
            pay_time: new Date(),
            description: description,
            price_total: priceTotal.subTotal,
            status: status,
            user_id: user_id
        })
    }, [])


    const addBill = () => {
        callApi('user_bill/', 'post', bill)
            .then(res=>{
                console.log(res.data.message)
                alert('Thanh toán thành công');
            })
            .catch(()=>{
                alert('Thanh toán thất bại');
            })
    }

    const handlePay = () => {
        if (authentication.isAuthenticated){
            addBill();
        }
        else {
            alert('Vui lòng đăng nhập trước khi thanh toán')
        }
    }

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
                <Button
                    variant='danger'
                    block
                    onClick={handlePay}
                >
                    Thanh toán
                </Button>
            </ListGroup>
        </Card>
    )
}

export default PriceTotal;
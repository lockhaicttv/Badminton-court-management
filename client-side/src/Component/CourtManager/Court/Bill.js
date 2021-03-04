import {Button} from "react-bootstrap";
import React, {useState} from "react";
import Clock from 'react-digital-clock';
import PropTypes from 'prop-types';
import {useRecoilState, useRecoilValue} from "recoil";
import {Modal} from "react-bootstrap";
import {billDetailState, billState, areasState} from "../../../Store/atom";
import {Table} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";


function Bill(props) {
    const [bill, setBill] = useRecoilState(billState);
    const [billDetail, setBillDetail] = useRecoilState(billDetailState);
    const [area, setArea] = useRecoilState(areasState);

    function handleBillPayment(billID) {
            let newArea = [...area];

            let index = newArea.findIndex(x => x._id === bill.court_area_id);
            // console.log(newArea[index]._id)
            let _id = newArea[index]._id;
            let status = !newArea[index].status;
            let temp = {
                _id: newArea[index]._id,
                area: newArea[index].area,
                status: false,
                description: newArea[index].description,
                court_id: newArea[index].court_id
            };

            newArea[index] = temp;
            setArea(newArea);

            callApi(`court_areas/update-status/?_id=${_id}&status=false`, 'put', null)
                .then((res) => {
                    console.log(res.data.message);
                })

        callApi(`court_bill/update-status/${billID}`, 'put', null).then(
            (res)=>console.log(res.data)
        );
    }

    const courtArea = area.findIndex(x => x._id == bill.court_area_id);
    const tHead = <thead>
    <tr>
        <th>#</th>
        <th>Tên</th>
        <th>Số lượng</th>
        <th>Đơn giá</th>
        <th>Thành tiền</th>
    </tr>
    </thead>

    let billPrice = 0;
    const listBillDetails = billDetail.map((item, key) => {
        billPrice += item.product_id.price * item.quantity;
        return <tr key={key}>
            <th>{key}</th>
            <th>{item.product_id.name}</th>
            <th>{item.quantity}</th>
            <th>{item.product_id.price}</th>
            <th>{item.product_id.price * item.quantity}</th>
        </tr>
    })

    return (
        <div>
            <h1>Hoá Đơn</h1>
            <Table striped border hover>
                <thead><tr></tr><tr></tr><tr></tr><tr></tr></thead>
                <tbody>
                <tr><th>Sân</th><th>{courtArea}</th></tr>
                <tr><th>Thời  gian vào:</th><th colSpan='4'>{bill.time_check_in}</th></tr>
                <tr><th>Thời gian ra:</th><th colSpan='4'>{bill.time_check_out}</th></tr>
                </tbody>
            </Table>
            <Table striped border hover>
                {tHead}
                <tbody>
                {listBillDetails}
                <tr>
                    <th>Tổng tiền</th>
                    <th colSpan='4' className='text-center'>{billPrice}</th>
                </tr>
                </tbody>
            </Table>
            <Button onClick={()=>{handleBillPayment(bill._id)}}>Thanh toán</Button>
        </div>
    )
}

export default Bill;
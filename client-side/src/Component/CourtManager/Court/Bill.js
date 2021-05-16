import {Button} from "react-bootstrap";
import React, {useState} from "react";
import Clock from "react-digital-clock";
import PropTypes from "prop-types";
import {useRecoilState, useRecoilValue} from "recoil";
import {Modal} from "react-bootstrap";
import {billDetailState, billState, areasState} from "../../../Store/atom";
import {Table} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMoneyBill,
    faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

function Bill(props) {
    const [bill, setBill] = useRecoilState(billState);
    const [billDetail, setBillDetail] = useRecoilState(billDetailState);
    const [area, setArea] = useRecoilState(areasState);
    const area_index = area.findIndex((x) => x._id === bill.court_area_id);
    function handleBillPayment(billID, priceTotal) {
        let newArea = [...area];

        let index = newArea.findIndex((x) => x._id === bill.court_area_id);
        let _id = newArea[index]._id;
        let temp = {
            _id: newArea[index]._id,
            area: newArea[index].area,
            status: false,
            price_total: 0,
            description: newArea[index].description,
            court_id: newArea[index].court_id,
        };

        newArea[index] = temp;
        setArea(newArea);

        callApi(
            `court_area/update-status/?_id=${_id}&status=false`,
            "put",
            null
        ).then((res) => {
            console.log(res.data.message);
        });

        callApi(`court_bill/update-status/${billID}`, "put", {price_total: priceTotal})
            .then((res) => {
                console.log(res.data)
            }
        );
    }

    const courtArea = area.findIndex((x) => x._id === bill.court_area_id);
    const tHead = (
        <thead>
        <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
        </tr>
        </thead>
    );

    const getHours = (start) => {
        let time_check_in = new Date(start).getTime();
        let end = new Date().getTime();
        return (end-time_check_in) / (1000*60*60)
    }

    let billPrice = 0;
    const listBillDetails = billDetail.map((item, key) => {
        billPrice += item.product_id.price * item.quantity;
        return (
            <tr key={key}>
                <td>{key + 1}</td>
                <td>{item.product_id.name}</td>
                <td>{item.quantity}</td>
                <td>{item.product_id.price}</td>
                <td>{item.product_id.price * item.quantity}</td>
            </tr>
        );
    });

    if (area[area_index]!==undefined) {
        billPrice +=  getHours(bill.time_check_in) * (area[area_index].price);
        listBillDetails.push(
            <tr key='-9999999'>
                <td>{listBillDetails.length + 1}</td>
                <td>Giờ chơi</td>
                <td>{getHours(bill.time_check_in)}</td>
                <td>{area[area_index].price}đ</td>
                <td>{getHours(bill.time_check_in) * (area[area_index].price)}</td>
            </tr>
        )
    }
    return (
        <div className="col-lg-12 border bg-white">
            <h3 className="text-center">Hoá Đơn</h3>
            <Table className="">
                <tbody>
                <tr>
                    <th>Sân</th>
                    <th>{courtArea}</th>
                </tr>
                <tr>
                    <th>Thời gian vào:</th>
                    <th colSpan="4">{bill.time_check_in}</th>
                </tr>
                <tr>
                    <th>Thời gian ra:</th>
                    <th colSpan="4">{bill.time_check_out}</th>
                </tr>
                </tbody>
            </Table>
            <div className="header-border-table"/>
            <Table striped border hover>
                {tHead}
                <tbody>
                {listBillDetails}
                {/* <tr>
            <th>Tổng tiền</th>
            <th colSpan="4" className="text-center"></th>
          </tr> */}

                </tbody>
            </Table>
            <div className="header-border-table"/>
            <div className="row">
                <h5 className="p-3">Tổng tiền</h5>
                <h5 className="p-3 ml-auto">{billPrice}</h5>
            </div>

            <Button
                onClick={() => {
                    handleBillPayment(bill._id, billPrice);
                }}
                className="col-lg-12"
            >
                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2"/>
                Thanh toán
            </Button>
        </div>
    );
}

export default Bill;

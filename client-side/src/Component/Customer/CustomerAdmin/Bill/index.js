import React, {useState, useEffect} from 'react';
import {accountIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";
import callApi from "../../../../Utils/apiCaller";
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
    {
        dataField: '_id',
        text: 'Mã đơn hàng'
    },
    {
        dataField: 'pay_time',
        text: 'Ngày thanh toán'
    },
    {
        dataField: 'description',
        text: 'Sản phẩm'
    },
    {
        dataField: 'price_total',
        text: 'Tổng tiền'
    },
    {
        dataField: 'status',
        text: 'Trạng thái'
    }
];


const Bill = () => {
    const user_id = useRecoilValue(accountIdState);
    const [bill, setBill] = useState([]);


    const loadBill = () => {
        callApi(`user_bill/${user_id}`, 'get', null)
            .then(res => {
                setBill(res.data);
            })
            .catch(() => {
                setBill([])
            })
    }

    useEffect(() => {
        loadBill();
    }, [])

    return (
        <div>
            <h4 className='pb-4'>Đơn hàng của tôi</h4>
            <BootstrapTable
                bootstrap4
                keyField='_id'
                data={bill}
                columns={columns}
                noDataIndication="Bạn chưa có đơn hàng nào"
                striped
                hover
                condensed
            />
        </div>
    )
}

export default Bill;

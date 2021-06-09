import React, {useState, useEffect} from 'react';
import {accountIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";
import callApi from "../../../../Utils/apiCaller";
import BootstrapTable from 'react-bootstrap-table-next';
import Row from "react-bootstrap/Row";
import {Col, Media} from "react-bootstrap";
import OrderDetailCart from "../../../Admin/Database/Order/OrderDetailCart";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";

const columns = [
    {
        dataField: '_id',
        text: 'Mã đơn hàng',
        formatter: (cell, row) => {
            return <div className='text-break'>{cell}</div>
        }
    },
    {
        dataField: 'pay_time',
        text: 'Ngày thanh toán',
        editTable: false
    },
    {
        dataField: 'description',
        text: 'Sản phẩm',
        editTable: false
    },
    {
        dataField: 'price_total',
        text: 'Tổng tiền (VND)',
        formatter: cell => {
            return cell.toLocaleString();
        }
    },
    {
        dataField: 'status',
        text: 'Trạng thái',
        editor: {
            type: Type.SELECT,
            options: [{
                value: 'Đã nhận hàng',
                label: 'Đã nhận hàng'
            }]
        }
    },
    {
        dataField: 'address',
        text: 'Địa chỉ',
        editTable: false
    },
];


const Bill = () => {
    const user_id = useRecoilValue(accountIdState);
    const [bill, setBill] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

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

    const expandRow = {
        expandHeaderColumnRenderer: ({isAnyExpands}) => {
            if (isAnyExpands) {
                return <b>-</b>;
            }
            return <b>+</b>;
        },

        expandColumnRenderer: ({expanded}) => {
            if (expanded) {
                return (
                    <b>-</b>
                );
            }
            return (
                <b>+</b>
            );
        },
        renderer: row => (
            <div>
                <p>{`Mã đơn hàng: ${row._id}`}</p>
                <div>
                    {orderDetails.map((orderDetail, key) => {
                        return (
                            <OrderDetailCart orderDetail={orderDetail}/>
                        )
                    })}
                </div>
            </div>
        ),
        showExpandColumn: true,
        expandByColumnOnly: true,
        onlyOneExpanding: true,
        onExpand: async (row, isExpand, rowIndex, e) => {
            await callApi(`user_bill_detail/get-by-user-bill-id/${row._id}`, 'get', null).then(
                (res) => {
                    setOrderDetails(res.data)
                }
            )
        },
    };

    const onBeforeEdit = (oldValue, newValue, row, column) => {
        let id = row._id;
        let key = column.dataField;
        let objUpdate = {};
        objUpdate[key] = newValue;

        callApi(`user_bill/${id}`, 'put', objUpdate)
            .then(() => {
                alert('Update thành công');
            });
    }


    return (
        <div>
            <h4 className='pb-4'>Đơn hàng của tôi</h4>
            <BootstrapTable
                bootstrap4
                keyField='_id'
                data={bill}
                columns={columns}
                expandRow={expandRow}
                cellEdit={cellEditFactory({
                    mode: 'dbclick',
                    beforeSaveCell: (oldValue, newValue, row, column) => {
                        onBeforeEdit(oldValue, newValue, row, column)
                    }
                })}
                noDataIndication="Bạn chưa có đơn hàng nào"
                striped
                hover
                condensed
            />
        </div>
    )
}

export default Bill;

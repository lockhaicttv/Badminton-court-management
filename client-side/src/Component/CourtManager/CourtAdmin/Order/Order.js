import React, {useState, useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {accountIdState, courtIdState} from "../../../../Store/atom";
import callApi from "../../../../Utils/apiCaller";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import {Media} from "react-bootstrap";
import OrderDetailCart from "./OrderDetailCart";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import AddProduct from "../Product/AddProduct";
import Button from "react-bootstrap/Button";
import paginationFactory from "react-bootstrap-table2-paginator";

const {SearchBar} = Search;

const columns = [
    {
        dataField: '_id',
        text: 'Mã hoá đơn'
    },
    {
        dataField: 'pay_time',
        text: 'Ngày thanh toán',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
        },
        editor: {
            type: Type.DATE
        }
    },
    {
        dataField: 'description',
        text: 'Mô tả'
    },
    {
        dataField: 'price_total',
        text: 'Tổng tiền',
        editTable: false
    },
    {
        dataField: 'user_id.full_name',
        text: 'Người mua',
        editTable: false
    },
    {
        dataField: 'status',
        text: 'Trạng thái',
        editor: {
            type: Type.SELECT,
            options: [{
                value: 'Đã thanh toán',
                label: 'Đã thanh toán'
            }, {
                value: 'Đã giao hàng',
                label: 'Đã giao hàng'
            }]
        }
    }
];


const Order = () => {
    const account_id = useRecoilValue(accountIdState);
    const courtInfo = useRecoilValue(courtIdState);
    const [data, setData] = useState([]);
    const [isShowModalAdd, setIsShowModalAdd] = useState(false);
    const [listDel, setListDel] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);


    const loadOrder = () => {
        callApi(`user_bill/get-by-court-id/${courtInfo._id}`, 'get', null)
            .then(res => {
                setData(res.data);
            })
            .catch(() => {
                setData([]);
            })
    }

    useEffect(() => {
        loadOrder();
    }, [])

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        clickToEdit: true,
        selectColumnPosition: 'right',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                setListDel(prevState => {
                        let newState = [...prevState];
                        newState.push(row._id);
                        return newState;
                    }
                )
            } else {
                setListDel(prevState => {
                    let newState = [...prevState];
                    newState.splice(newState.indexOf(row._id), 1);
                    return newState;
                })
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                let newState = rows.map((row, key) => {
                    return row._id;
                })
                setListDel(newState);
            } else {
                setListDel([]);
            }
        }
    };

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

    const onDelete = () => {
        if (window.confirm('Bạn muốn xoá những mục đã chọn?')) {
            callApi('user_bill', 'delete', listDel)
                .then(res => {
                        alert('Xoá thành công');
                        loadOrder();
                        setListDel([])
                    }
                )
                .catch(() => {
                    alert('Xoá thất bại, vui lòng thử lại sau');
                })
        } else {
            return false;
        }
    }

    return (
        //     <div>
        //         <BootstrapTable headerWrapperClasses="foo"
        //                         keyField='_id'
        //                         columns={columns}
        //                         data={data}
        //                         noDataIndication="Table is Empty"
        //                         cellEdit={cellEditFactory({
        //                             mode: 'click',
        //                             beforeSaveCell: (oldValue, newValue, row, column) => {
        //                                 onBeforeEdit(oldValue, newValue, row, column)
        //                             }
        //                         })}
        //                         selectRow={selectRow}
        //                         expandRow={expandRow}
        //         />
        //     </div>
        <div>
            <ToolkitProvider
                headerWrapperClasses="foo"
                keyField='_id'
                columns={columns}
                data={data}
                noDataIndication="Table is Empty"
                search
            >
                {
                    props => (
                        <div>
                            <div className="d-flex justify-content-between mt-2 mb-0">
                                <h3>Sản phẩm</h3>
                                <SearchBar {...props.searchProps} style={{width: '600px'}}/>
                                <div>
                                    <Button className="ml-auto">
                                        Thêm
                                    </Button>
                                    <Button className="btn-danger" onClick={onDelete}>
                                        Xoá
                                    </Button>
                                </div>
                            </div>
                            <hr/>
                            <BootstrapTable
                                {...props.baseProps}
                                cellEdit={cellEditFactory({
                                    mode: 'click',
                                    beforeSaveCell: (oldValue, newValue, row, column) => {
                                        onBeforeEdit(oldValue, newValue, row, column)
                                    }
                                })}
                                selectRow={selectRow}
                                expandRow={expandRow}
                                pagination={paginationFactory()}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )

}

export default Order;
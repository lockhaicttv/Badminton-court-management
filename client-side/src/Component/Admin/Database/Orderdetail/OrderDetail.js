import React, {useState, useEffect} from "react";
import callApi from "../../../../Utils/apiCaller";
import BootStrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor'
import Button from "react-bootstrap/Button";
import {useRecoilValue} from "recoil";
import AddOrderDetail from "./AddOrderDetail";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const {SearchBar} = Search;

const options = (setOptions) =>{
    callApi('product', 'get', null)
        .then((res) => {
            let options = res.data.map((item, key) => {
                return {
                    value: item._id,
                    label: item.name
                }
            })
            setOptions(options);
        })
}

const columns = [
    {
        dataField: '_id',
        text: 'Mã chi tiết đơn'
    },
    {
        dataField: 'product_id.name',
        text: 'Tên sản phẩm',
        editor: {
            type: Type.SELECT,
            getOptions:options
        }
    },
    {
        dataField: 'quantity',
        text: 'Số lượng',
        editor: {
            type: Type.NUMBER,
        }
    },
    {
        dataField: 'user_bill_id',
        text: 'Mã đơn hàng',
        editor: {
            type: (setOptions)=>{options()}
        }
    }
];

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
}

function OrderDetail() {
    const [data, setData] = useState([]);
    const [isShowModalAdd, setIsShowModalAdd] = useState(false);
    const [listDel, setListDel] = useState([]);

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        clickToEdit: true,
        selectColumnPosition: 'right',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect){
                setListDel(prevState => {
                        let newState =[...prevState];
                        newState.push(row._id);
                        return newState;
                    }
                )
            } else {
                setListDel(prevState => {
                    let newState=[...prevState];
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

    const onBeforeEdit = (oldValue, newValue, row, column) =>{
        let id = row._id;
        let key = column.dataField;
        let objUpdate =  {};
        objUpdate[key] = newValue;

        callApi(`user_bill_detail/${id}`, 'put', objUpdate)
            .then(()=>{
                alert('Update thành công');
            });
    }

    const loadData = () => {
        callApi(`user_bill_detail`, 'get', null)
            .then(res => {
                setData(res.data);
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    const onDelete = () => {
        if (window.confirm('Bạn muốn xoá những mục đã chọn?')){
            callApi('user_bill_detail', 'delete', listDel)
                .then(res=>{
                    setListDel([]);
                    loadData();
                    alert('Xoá thành công');
                })
                .catch(()=>{
                    alert('Xoá thất bại, vui lòng thử lại sau')
                })
        } else {
            return false;
        }
    }

    const handleClose = () =>{
        setIsShowModalAdd(false);
    }
    const handleOpen = () => {
        setIsShowModalAdd(true);
    }

    return (
        // <div>
        //     <AddOrderDetail isShow={isShowModalAdd} handleClose={handleClose}/>
        //     <div className="">
        //         <Button className="ml-auto" onClick={handleOpen}>
        //             Thêm
        //         </Button>
        //         <Button className="btn-danger" onClick={onDelete}>
        //             Xoá
        //         </Button>
        //     </div>
        //     <BootStrapTable headerWrapperClasses="foo"
        //                     keyField='_id'
        //                     columns={columns}
        //                     data={data}
        //                     noDataIndication="Table is Empty"
        //                     cellEdit={cellEditFactory({
        //                         mode:'click',
        //                         beforeSaveCell: (oldValue, newValue, row, column)=>{onBeforeEdit(oldValue, newValue, row, column)}
        //                     })}
        //                     selectRow={selectRow}
        //     />
        // </div>
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
                            <h3>Tài khoản chủ sân</h3>
                            <SearchBar {...props.searchProps} style={{width: '600px'}}/>
                            <div>
                                <AddOrderDetail isShow={isShowModalAdd} handleClose={handleClose}/>
                                <Button className="ml-auto" onClick={handleOpen}>
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
                                mode:'click',
                                beforeSaveCell: (oldValue, newValue, row, column)=>{onBeforeEdit(oldValue, newValue, row, column)}
                            })}
                            selectRow={selectRow}
                            pagination={paginationFactory()}
                        />
                    </div>
                )
            }
        </ToolkitProvider>
    </div>
    )
}

export default OrderDetail;
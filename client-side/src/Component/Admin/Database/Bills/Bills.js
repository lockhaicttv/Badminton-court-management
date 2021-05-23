import React, {useState, useEffect} from "react";
import callApi from "../../../../Utils/apiCaller";
import BootStrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import AddBill from "./AddBill";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import AddArea from "../Area/AddArea";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";

const {SearchBar} = Search;

const columns = [
    {
        dataField: '_id',
        text: 'ID Hoá đơn'
    },
    {
        dataField: 'time_check_in',
        text: 'Thời gian vào'
    },
    {
        dataField: 'time_check_out',
        text: 'Thời gian ra'
    },
    {
        dataField: 'status',
        text: 'Trạng thái',
        hidden: true
    },
    {
        dataField: 'court_area_id.area',
        text: 'Sân'
    }
];

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
}


function Bill(props) {
    const [data, setData] = useState([]);
    const [billDetails, setBillDetails] = useState([]);
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

    useEffect(() => {
        callApi(`court_bill`, 'get', null)
            .then(res => {
                setData(res.data);
            })
    }, [])

    const expandRow = {
        renderer: row => (
            <div>
                <p>{`Chi tiết hoá đơn mã ${row._id}`}</p>
                <div>
                    {billDetails.map((billDetail, key) => {
                        return (
                            <div>{billDetail.product_id.name} - số lượng: {billDetail.quantity} </div>
                        )
                    })}
                </div>
            </div>
        ),
        showExpandColumn: true,
        onExpand: async (row, isExpand, rowIndex, e) => {
            await callApi(`court_bill_detail/get-by-bill-id/${row._id}`, 'get', null).then(
                (res) => {
                    setBillDetails(res.data)
                }
            )
        },
    };

    const onDelete = () => {
        if (window.confirm('Bạn muốn xoá những mục đã chọn?')){
            alert(listDel);
            // setRealTime(preventDefault=>preventDefault+1);
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
        //     <AddBill isShow={isShowModalAdd} handleClose={handleClose}/>
        //     <div className="">
        //         <Button className="ml-auto" onClick={handleOpen}>
        //             Thêm
        //         </Button>
        //         <Button className="btn-danger" onClick={onDelete}>
        //             Xoá
        //         </Button>
        //     </div>
        //     <BootStrapTable
        //         bootstrap4={true}
        //         headerWrapperClasses="foo"
        //         keyField='_id'
        //         columns={columns}
        //         data={data}
        //         noDataIndication="Table is Empty"
        //         expandRow={expandRow}
        //         selectRow={selectRow}
        //     />
        // </div>
    <div>
        <ToolkitProvider
            bootstrap4={true}
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
                                <AddBill isShow={isShowModalAdd} handleClose={handleClose}/>
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
                            // cellEdit={cellEditFactory({
                            //     mode: 'click',
                            //     beforeSaveCell: (oldValue, newValue, row, column) => onBeforeEdit(oldValue, newValue, row, column)
                            // })}
                            expandRow={expandRow}
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

export default Bill;
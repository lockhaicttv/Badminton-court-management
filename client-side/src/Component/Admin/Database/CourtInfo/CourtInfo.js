import React, {useState, useEffect} from "react";
import callApi from "../../../../Utils/apiCaller";
import BootStrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor'
import Button from "react-bootstrap/Button";
import {useRecoilValue} from "recoil";
import AddCourtInfo from "./AddCourtInfo";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import AddArea from "../Area/AddArea";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const {SearchBar} = Search;

const columns = [
    {
        dataField: '_id',
        text: 'ID khách hàng',
        formatter: cell=>{
            return <div className='text-break'>{cell}</div>
        }
    },
    {
        dataField: 'name',
        text: 'Tên sân'
    },
    {
        dataField: 'phone_number',
        text: 'Số điện thoại'
    },
    {
        dataField: 'website',
        text: 'Link shop',
        formatter: (cell, row) => {
            return <div className='text-break'>/customer/store/{row._id}</div>
        }
    },
    {
        dataField: 'description',
        text: 'Mô tả'
    },
    {
        dataField: 'court_total',
        text: 'Số sân',
    },
    {
        dataField: 'address',
        text: 'Địa chỉ'
    },
    {
        dataField: 'email_id',
        text: 'Tài khoản paypal',
        formatter: cell => {
            return <div className='text-break'>{cell}</div>
        }
    },
    {
        dataField: 'account_id.username',
        text: 'Tài khoản'
    }
];

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
}

function CourtInfo() {
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

        callApi(`court/${id}`, 'put', objUpdate)
            .then(()=>{
                alert('Update thành công');
            })
            .catch(()=>{
                alert('Update thất bại');
            });
    }

    const loadData = () => {
        callApi(`court`, 'get', null)
            .then(res => {
                setData(res.data);
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    const onDelete = () => {
        if (window.confirm('Bạn muốn xoá những mục đã chọn?')){
            callApi('court', 'delete', listDel)
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
        //     <AddCourtInfo isShow={isShowModalAdd} handleClose={handleClose} loadData={loadData}/>
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
                            <h3>Thông tin sân</h3>
                            <SearchBar {...props.searchProps} style={{width: '600px'}}/>
                            <div>
                                <AddCourtInfo isShow={isShowModalAdd} handleClose={handleClose} loadData={loadData}/>
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

export default CourtInfo;
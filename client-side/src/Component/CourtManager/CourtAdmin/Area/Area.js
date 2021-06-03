import React, {useState, useEffect} from "react";
import callApi from "../../../../Utils/apiCaller";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import {Button, Modal} from "react-bootstrap";
import AddArea from "./AddArea";
import {accountIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";
import AddProduct from "../Product/AddProduct";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import paginationFactory from "react-bootstrap-table2-paginator";

const {SearchBar} = Search;

const columns = [
    {
        dataField: '_id',
        text: 'ID Sân'
    },
    {
        dataField: 'area',
        text: 'Tên'
    },
    {
        dataField: 'status',
        text: 'Trạng thái',
        hidden: true
    },
    {
        dataField: 'description',
        text: 'Mô tả'
    },
    {
        dataField: 'court_id.name',
        text: 'Tên Sân'
    }
];


function Area() {
    const account_id = useRecoilValue(accountIdState)
    const [data, setData] = useState([]);
    const [isShowModalAdd, setIsShowModalAdd] = useState(false);
    const [listDel, setListDel] = useState([]);
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

    const loadData = () => {
        callApi(`court_area/${account_id}`, 'get', null)
            .then(res => {
                setData(res.data);
            })
    }

    useEffect(() => {
        loadData();
    }, [])

    const onBeforeEdit = (oldValue, newValue, row, column) => {
        let id = row._id;
        let key = column.dataField;
        let objUpdate = {};
        objUpdate[key] = newValue;

        callApi(`court_area/${id}`, 'put', objUpdate)
            .then(() => {
                alert('Update thành công');
            });
    }

    const onDelete = () => {
        if (window.confirm('Bạn muốn xoá những mục đã chọn?')) {
            callApi('court_area', 'delete', listDel)
                .then(res=>{
                    alert('Xoá thành công');
                    setListDel([]);
                    loadData();
                })
                .catch(()=>{
                    alert('Xoá thất bại, vui lòng thử lại sau!')
                })
        } else {
            return false;
        }
    }

    const handleClose = () => {
        setIsShowModalAdd(false);
    }
    const handleOpen = () => {
        setIsShowModalAdd(true);
    }


    return (
        <div>
            <ToolkitProvider
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
                                <h3>Khu vực sân</h3>
                                <SearchBar {...props.searchProps} style={{width: '600px'}}/>
                                <div>
                                    <AddArea isShow={isShowModalAdd}
                                             handleClose={handleClose}
                                             handaleOpen={handleOpen}
                                             court_total={data.length + 1}
                                             reload={loadData}
                                    />
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
                                    mode: 'click',
                                    beforeSaveCell: (oldValue, newValue, row, column) => onBeforeEdit(oldValue, newValue, row, column)
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

export default Area;
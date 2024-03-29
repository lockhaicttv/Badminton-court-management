import React, {useEffect, useState} from "react";
import {accountIdState, courtIdState} from "../../../Store/atom";
import {useRecoilValue} from "recoil";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor'
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import callApi from "../../../Utils/apiCaller";
import AddArea from "../CourtAdmin/Area/AddArea";
import Button from "react-bootstrap/Button";
import AddCourtBooking from "./AddCourtBooking";


const {SearchBar} = Search;

const columns = [
    {
        dataField: '_id',
        text: 'ID booking'
    },
    {
        dataField: 'booker_name',
        text: 'Tên người đặt'
    },
    {
        dataField: 'start',
        text: 'Giờ bắt đầu',
        formatter: (cell, row) => {
            return <div>{new Date(cell).toLocaleString()}</div>
        }
    },
    {
        dataField: 'end',
        text: 'Giờ kết thúc',
        formatter: (cell, row) => {
            return <div>{new Date(cell).toLocaleString()}</div>
        }
    },
    {
        dataField: 'status',
        text: 'Trạng thái'
    },
    {
        dataField: 'court_area_id.area',
        text: 'Sân'
    },
];


const CourtBooking = () => {
    const courtInfo = useRecoilValue(courtIdState)
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

    const onBeforeEdit = (oldValue, newValue, row, column) => {
        let id = row._id;
        let key = column.dataField;
        let objUpdate = {};
        objUpdate[key] = newValue;

        callApi(`court_booking/${id}`, 'put', objUpdate)
            .then(() => {
                alert('Update thành công');
            });
    }

    useEffect(() => {
        getCourtBooking()
    }, [])

    const getCourtBooking = () => {
        callApi(`court_booking/${courtInfo._id}`, 'get', null)
            .then(res => {
                setData(res.data)
            })
            .catch(() => {
                setData([])
            })
    }

    const onDelete = () => {
        if (window.confirm('Bạn muốn xoá những mục đã chọn?')) {
            callApi('court_booking', 'delete', listDel)
                .then(res => {
                    getCourtBooking();
                    alert('Đã xoá thành công')
                })
                .catch(() => {
                    alert('Xoá thất bại, vui lòng thử lại sau')
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
        <div className='container-fluid'>
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
                            <div className="row mt-2 mb-0">
                                <div className='col-5'>
                                    <SearchBar {...props.searchProps} style={{width: '400px'}}/>
                                </div>
                                <h3 className='col-3 pl-lg-5 ml-5'>Lịch đặt sân</h3>
                                <div className='col'>
                                    <div className='d-flex justify-content-end'>
                                        <AddCourtBooking isShow={isShowModalAdd} handleClose={handleClose}
                                                         reload={getCourtBooking}/>
                                        <Button className="ml-auto" onClick={handleOpen}>
                                            Thêm
                                        </Button>
                                        <Button className="btn-danger" onClick={onDelete}>
                                            Xoá
                                        </Button>
                                    </div>
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
                                pagination={paginationFactory()}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default CourtBooking;

import React, {useState, useEffect} from "react";
import {useRecoilValue} from "recoil";
import {accountIdState, courtIdState, courtState} from "../../../../Store/atom";
import callApi from "../../../../Utils/apiCaller";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import AddPromotion from "./AddPromotion";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

const {SearchBar} = Search;

const columns = [
    {
        dataField: '_id',
        text: 'ID mã'
    },
    {
        dataField: 'name',
        text: 'Tên'
    },
    {
        dataField: 'description',
        text: 'Nội dung'
    },
    {
        dataField: 'value',
        text: 'Giá trị'
    },
    {
        dataField: 'start',
        text: 'Ngày bắt đầu',
        editor: {
            type: Type.DATE
        }
    },
    {
        dataField: 'end',
        text: 'Ngày kết thúc',
        editor: {
            type: Type.DATE
        }
    }
];

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
}

function Promotion(){
    const courtInfo = useRecoilValue(courtIdState);
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
        console.log(objUpdate)
        callApi(`promotion/${id}`, 'put', objUpdate)
            .then(()=>{
                alert('Update thành công');
            });
    }

    useEffect(() => {
        callApi(`promotion/?court_id=${courtInfo._id}`, 'get', null)
            .then(res => {
                setData(res.data);
            })
    }, [])

    const onDelete = () => {
        if (window.confirm('Xoá các mục đã chọn sẽ loại bỏ khuyến mãi trên các sản phẩm hiện hành, bạn có muốn xoá?')){
            callApi('promotion', 'delete', listDel)
                .then(res=>{
                    alert('Xoá thành công');
                })
                .catch(()=>{
                    alert('Xoá thất bại')
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
    console.log(courtInfo)
    return (
        // <div>
        //     <AddPromotion isShow={isShowModalAdd} handleClose={handleClose}/>
        //     <div className="">
        //         <Button className="ml-auto" onClick={handleOpen}>
        //             Thêm
        //         </Button>
        //         <Button className="btn-danger" onClick={onDelete}>
        //             Xoá
        //         </Button>
        //     </div>
        //     <BootstrapTable headerWrapperClasses="foo"
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
                            <h3>Khuyến mãi</h3>
                            <SearchBar {...props.searchProps} style={{width: '600px'}}/>
                            <div>
                                <AddPromotion isShow={isShowModalAdd} handleClose={handleClose}/>
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

export default Promotion;
import React, {useState, useEffect} from "react";
import callApi from "../../../../Utils/apiCaller";
import BootStrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor'
import Button from "react-bootstrap/Button";
import AddArea from "../Area/AddArea";
import {accountIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";

const columns = [
    {
        dataField: '_id',
        text: 'ID loại'
    },
    {
        dataField: 'name',
        text: 'Tên'
    },
];

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
}

function Category() {
    const account_id = useRecoilValue(accountIdState);
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

        callApi(`product_category/${id}`, 'put', objUpdate)
            .then(()=>{
                alert('Update thành công');
            });
    }

    useEffect(() => {
        callApi(`product_category`, 'get', null)
            .then(res => {
                setData(res.data);
            })
    }, [])

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
        <div>
            <AddArea isShow={isShowModalAdd} handleClose={handleClose}/>
            <div className="">
                <Button className="ml-auto" onClick={handleOpen}>
                    Thêm
                </Button>
                <Button className="btn-danger" onClick={onDelete}>
                    Xoá
                </Button>
            </div>
            <BootStrapTable headerWrapperClasses="foo"
                            keyField='_id'
                            columns={columns}
                            data={data}
                            noDataIndication="Table is Empty"
                            cellEdit={cellEditFactory({
                                mode:'click',
                                beforeSaveCell: (oldValue, newValue, row, column)=>{onBeforeEdit(oldValue, newValue, row, column)}
                            })}
                            selectRow={selectRow}
            />
        </div>
    )
}

export default Category;
import React, {useState, useEffect} from "react";
import callApi from "../../../../Utils/apiCaller";
import BootStrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor'
import Button from "react-bootstrap/Button";
import AddOwner from "./AddOwner";
import {useRecoilValue} from "recoil";

const columns = [
    {
        dataField: '_id',
        text: 'ID khách hàng'
    },
    {
        dataField: 'username',
        text: 'Tài khoản'
    },
    {
        dataField: 'password_1',
        text: 'Mật khẩu cấp 1'
    },
    {
        dataField: 'password_2',
        text: 'Mật khẩu cấp 2'
    },
    {
        dataField: 'full_name',
        text: 'Họ tên'
    },
    {
        dataField: 'gender',
        text: 'Giới tính',
        editor: {
            type: Type.SELECT,
            options: [{
                value: 'male',
                label: 'Nam'
            }, {
                value: 'female',
                label: 'Nữ'
            }]
        }
    },
    {
        dataField: 'address',
        text: 'Địa chỉ'
    },
    {
        dataField: 'phone_number',
        text: 'Số điện thoại'
    },
];

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
}

function Owner() {
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

        callApi(`account/${id}`, 'put', objUpdate)
            .then(()=>{
                alert('Update thành công');
            });
    }

    const loadData = () => {
        callApi(`account`, 'get', null)
            .then(res => {
                setData(res.data);
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    const onDelete = () => {
        if (window.confirm('Bạn muốn xoá những mục đã chọn?')){
            callApi('account', 'delete', listDel)
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
        <div>
            <AddOwner isShow={isShowModalAdd} handleClose={handleClose} loadData={loadData}/>
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

export default Owner;
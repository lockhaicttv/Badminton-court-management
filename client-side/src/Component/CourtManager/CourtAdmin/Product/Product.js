import React, {useState, useEffect} from "react";
import callApi from "../../../../Utils/apiCaller";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import Button from "react-bootstrap/Button";
import AddProduct from "./AddProduct";
import {accountIdState, courtIdState, realTimeState} from '../../../../Store/atom';
import {useRecoilState, useRecoilValue} from "recoil";
import FileBase64 from "react-file-base64";
import ProductDetail from "./ProductDetail";
import MyCustomImageEditing from "./MyCustomImageEditing";



function Product() {
    const account_id = useRecoilValue(accountIdState);
    const courtInfo = useRecoilValue(courtIdState);
    const [data, setData] = useState([]);
    const [isShowModalAdd, setIsShowModalAdd] = useState(false);
    const [listDel, setListDel] = useState([]);
    const [realTime, setRealTime] = useRecoilState(realTimeState);


    const columns = [
        {
            dataField: '_id',
            text: 'ID sản phẩm'
        },
        {
            dataField: 'name',
            text: 'Tên'
        },
        {
            dataField: 'price',
            text: 'Giá sản phẩm'
        },
        {
            dataField: 'description',
            text: 'Mô tả'
        },
        {
            dataField: 'quantity',
            text: 'Số lượng'
        },
        {
            dataField: 'image.base64',
            text: 'Hình ảnh',
            hidden: true
        },
        {
            dataField: 'on_shop_page',
            text: 'Đang bán online',
            editor: {
                type: Type.SELECT,
                options: [{
                    value: false,
                    label: 'Không'
                }, {
                    value: true,
                    label: 'Có'
                }]
            }
        },
        {
            dataField: 'product_category_id.name',
            text: 'Loại sản phẩm',
            editor: {
                type: Type.SELECT,
                getOptions: (setOptions) => {
                    callApi(`product_category/get-by-court/${courtInfo._id}`, 'get', null)
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
            }
        }
    ];

    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
    }];

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        clickToExpand: false,
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
        showExpandColumn: true,
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
        onExpand: (row, isExpand, rowIndex, e) => {
            callApi(`product/?_id=${row._id}`)
        },
        renderer: row => (
            <ProductDetail data={row} setData={setData} account_id={account_id}/>
        )
    };

    useEffect(() => {
       loadData()
    }, [])

    const loadData = () => {
        callApi(`product/get-by-court-id/${courtInfo._id}`, 'get', null)
            .then(res => {
                setData(res.data);
            })
    }

    const onBeforeEdit = (oldValue, newValue, row, column) => {
        let id = row._id;
        let key = column.dataField;
        if (key.includes('.')) {
            key = key.substr(0, key.indexOf('.'))
        }
        let objUpdate = {};
        objUpdate[key] = newValue;
        console.log(objUpdate)
        callApi(`product/${id}`, 'put', objUpdate)
            .then(() => {
                alert('Update thành công');
            });
    }

    const onDelete = () => {
        if (window.confirm('Bạn muốn xoá những mục đã chọn?')) {
            alert(listDel);
            setRealTime(preventDefault => preventDefault + 1);
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
            <AddProduct isShow={isShowModalAdd} handleClose={handleClose}/>
            <div className="">
                <Button className="ml-auto" onClick={handleOpen}>
                    Thêm
                </Button>
                <Button className="btn-danger" onClick={onDelete}>
                    Xoá
                </Button>
            </div>
            <BootStrapTable
                bootstrap4
                headerWrapperClasses="foo"
                keyField='_id'
                columns={columns}
                data={data}
                noDataIndication="Table is Empty"
                cellEdit={cellEditFactory({
                    mode: 'dbclick',
                    beforeSaveCell: (oldValue, newValue, row, column) => onBeforeEdit(oldValue, newValue, row, column)
                })}
                selectRow={selectRow}
                expandRow={expandRow}
                defaultSorted={ defaultSorted }
                pagination={ paginationFactory()}
            />
        </div>
    )
}

export default Product;
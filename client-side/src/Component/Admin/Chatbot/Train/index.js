import React, {useState, useEffect} from 'react'
import {Button, FormControl} from "react-bootstrap";
import callApi from "../../../../Utils/apiCaller";

const Train = () => {
    const [data, setData] = useState('');

    const handleLoadData = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        console.log(e.target.result)
        fileReader.onload = (e) => {
            setData(e.target.result)
        }
    }

    const handleChange = (e) => {
        setData(e.target.value)
    }

    const handleTrain = () => {
        if (data !== '') {
            try {
                let func = Object.keys(JSON.parse(data))[0];
                let data_train = { data: JSON.parse(data) };
                console.log(func)
                callApi(`chat-bot/${func}`, 'put', data_train)
                    .then(res=>{
                        alert('Huấn luyện thành công');
                    })
                    .catch(()=>{
                        alert('Huấn luyện thất bại, thử lại sau');
                    })
            }
            catch (err) {
                alert('Dữ liệu sai cấu trúc!')
            }
        }
        else {
            alert('Vui lòng nhập dữ liệu vào!')
        }
    }

    console.log(data)
    return (
        <div>
            <div className='row justify-content-between mb-3'>
                <label className='btn btn-primary'>
                    Chọn file
                    <input
                        type='file'
                        onChange={handleLoadData}
                    />
                </label>
                <button className='btn btn-primary' onClick={handleTrain}>
                    Huấn luyện
                </button>
            </div>
            <div>
                <FormControl
                    style={{width: '100%', height: '70vh'}}
                    as='textarea'
                    value={data}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Train;
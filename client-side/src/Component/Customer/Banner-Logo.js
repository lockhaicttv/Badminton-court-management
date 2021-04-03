import React, {useState, useEffect} from "react";
import {accountIdState, courtIdState, courtState} from "../../Store/atom";
import {useRecoilValue, useRecoilState} from "recoil";
import callApi from "../../Utils/apiCaller";


const Banner = (props) => {
    const _id = props._id;
    const [courtInfo, setCourtInfo] = useState();

    useEffect(async () => {
        await callApi(`court/get-by-id/${props._id}`, 'get', null)
            .then(res => {
                console.log(res.data)
                setCourtInfo(res.data);

            })
    }, [])

    let renderEle = <div></div>
    if (courtInfo !== undefined){
        renderEle = <div className='banner pb-5'>
            <img src={courtInfo.banner.base64} width='100%' height='300px'/>
            <div className='logo rounded-circle'>
                <div className='position-relative'>
                    <img src={courtInfo.logo.base64} width='150px' height='150px' className='rounded-circle'/>
                </div>
            </div>
        </div>
    }

    return (
        renderEle
    )
}

export default Banner;
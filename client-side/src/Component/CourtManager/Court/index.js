import CourtArea from "./CourtArea";
import React, {useState, useEffect} from "react";
import {useRecoilState} from "recoil";
import callApi from "../../../Utils/apiCaller";
import {Container} from 'react-bootstrap'
import Bill from './Bill';
import {areasState} from "../../../Store/atom";

function CourtManger() {

    const [areas, setAreas] = useRecoilState(areasState);
    const [idBill, setIdBill] = useState('');

    useEffect(() => {
        let item;
        let court_id = `60207b5a3dd41d22d8861cd0`;
        callApi(`court_areas/?court_id=${court_id}`, 'get', null).then((res) => {
            item = res.data;
            console.log(item);
            let initAreasState = [];
            let initBillState = [];
            initAreasState = res.data;
                initBillState.push(
                    {

                    }
                )
            setAreas(initAreasState);
        });
    }, []);

    const allCourt = areas.map((item, key) => {
        return <CourtArea isUse={item.status} idCourtArea={item.area} key={key}/>
    })
    return (
        <div className="d-flex justify-content-between">
            <div className="container">
                <div className="row flex-wrap justify-content-start">
                    {allCourt}
                </div>
            </div>
            <div className="container">
                <Bill/>
            </div>
        </div>
    );
}

export default CourtManger;
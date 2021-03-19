import CourtArea from "./CourtArea";
import React, {useState, useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import callApi from "../../../Utils/apiCaller";
import {Container} from 'react-bootstrap'
import Bill from './Bill';
import {accountIdState, areasState, courtIdState} from "../../../Store/atom";
import {useHistory} from "react-router";

function CourtManger() {
    const history = useHistory();
    const [areas, setAreas] = useRecoilState(areasState);
    const [idBill, setIdBill] = useState('');
    const account_id = useRecoilValue(accountIdState);
    console.log(account_id)
    const [CourtId, setCourtId] = useRecoilState(courtIdState);

    useEffect(() => {
        // call api => select * from court where account-idn= ""
        //if res.length > 0{
        //
        // }
        //else
        //redirect về trang ...
        let item;
        callApi(`court/get-by-id/${account_id}`, 'get', null)
            .then((res)=>{
                if (res.data !==null) {
                    if (typeof res.data === "object") {
                        console.log('ok')
                        callApi(`court_area/?court_id=${res.data._id}`, 'get', null).then((res) => {
                            item = res.data;
                            console.log(item);
                            let initAreasState = [];
                            let initBillState = [];
                            initAreasState = res.data;
                            initBillState.push(
                                {}
                            )
                            setAreas(initAreasState);
                        });
                    }
                }
                else {
                    history.push('/add-info');
                }
            })
        let court_id = `60207b5a3dd41d22d8861cd0`;

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
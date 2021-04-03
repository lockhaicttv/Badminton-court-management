import HeaderCourtMangement from '../HeadFoot/HeaderCourtMangement'
import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import CourtManager from './Court';
import CourtAdmin from "./CourtAdmin";
import Shoppage from "./Shoppage";
import {accountIdState, courtIdState} from "../../Store/atom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import callApi from "../../Utils/apiCaller";

const Court = () => {
        const account_id = useRecoilValue(accountIdState);
        console.log(account_id)
        const setCourtInfo = useSetRecoilState(courtIdState);
        const shopPageRoute = `/home/shop-page/${account_id}`;

        const loadCourtInfo = () =>{
            callApi(`court/get-by-account-id/${account_id}`, 'get', null)
                .then(res=>{
                    console.log(res.data)
                    setCourtInfo(res.data);
                })
        }

        useEffect(()=>{
           loadCourtInfo();
        },[])

        return (
            <div>
                <HeaderCourtMangement/>
                <Route exact path="/home/court" component={CourtManager}/>
                <Route path="/home/admin" component={CourtAdmin}/>
                <Route exact path={`/home/shop-page/${account_id}`} component={Shoppage}/>
            </div>
        )
}

export default Court;
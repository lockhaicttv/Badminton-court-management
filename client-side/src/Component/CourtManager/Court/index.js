import Court from "./Court";
import React from "react";
import {courtState} from "../../../Store/index";
import {useRecoilValue} from "recoil";

function CourtManger(){
    const court = useRecoilValue(courtState);

    const allCourt = court.map((item, key)=>{
        return <Court isUse = {item.isUse} idCourt={item.id} key={key}/>
    })
    return(
        <div>
            {allCourt}
        </div>
    );
}

export default CourtManger;
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import Clock from 'react-digital-clock';
import PropTypes from 'prop-types';
import {courtState} from "../../../Store";
import {useRecoilState} from "recoil";

function Court(props) {
    const [court, setCourt] = useRecoilState(courtState);

    function handleClick(){
        let newCourt = [...court];

        let index = newCourt.findIndex(x=>x.id === props.idCourt);
        let temp = {
            id: index,
            isUse:!props.isUse,
            timeCheckIn:new Date().getTime(),
            timeCheckOut: null
        };
        if (props.isUse===false){
             temp = {
                    id: index,
                    isUse:!props.isUse,
                    timeCheckIn:new Date().getTime(),
                    timeCheckOut: null
                }
            newCourt[index] = temp
            setCourt(newCourt);
        }
        else{
             temp = {
                    id: index,
                    isUse:!props.isUse,
                    timeCheckIn: newCourt[index].timeCheckIn,
                    timeCheckOut: new Date().getTime()
                }
            newCourt[index] = temp
            setCourt(newCourt);
        }


    }
    console.log(court)
    if (props.isUse === false){
        return(
            <div className="court">
                <div className="court court-background"></div>
                <button className="btn-danger"
                        onClick={handleClick}
                >
                    Bật
                </button>
            </div>
        );
    }
    else {
        return(
            <div className="court">
                <div className="court court-background"></div>
                <button className="btn-danger"
                        onClick={handleClick}
                >
                    Tắt
                </button>
                <Clock/>
            </div>
        );
    }
}

export default Court;
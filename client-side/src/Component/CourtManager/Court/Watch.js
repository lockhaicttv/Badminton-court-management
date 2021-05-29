import React, {useState, useEffect} from 'react'
import {areasState, billState, timeCheckInState} from "../../../Store/atom";
import {useRecoilValue} from "recoil";
import callApi from "../../../Utils/apiCaller";

const Watch = (props) => {
    let startTime = '';

    const [timeFormat, setTimeFormat] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect( () => {
        callApi(`court_bill/get-by-court_area/${props.court_area_id}`, 'get')
            .then((res) => {
                startTime = res.data.time_check_in;
                console.log('call')
            })
        setInterval(getTimeFormat, 1000);
    }, [])


    const getTimeFormat = async () => {


        let d = (new Date()) - (new Date(startTime));
        let hours = Math.floor(d / 1000 / 60 / 60)
        let minutes = Math.floor(d / 1000 / 60 - hours * 60);
        let seconds = Math.floor(d / 1000 - hours * 60 * 60 - minutes * 60);

        setTimeFormat({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        })
    }

    return (
        <span>{timeFormat.hours} : {timeFormat.minutes} : {timeFormat.seconds}</span>
    )


}

export default Watch;

export const formatTime = (unixTime) => {

}
import React, {useState, useEffect} from 'react'

const Watch = (props) => {
    const [startTime, setStartTime] = useState()

    useEffect(() => {
        setStartTime(props.startTime)
    })

    const [timeFormat, setTimeFormat] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        setInterval(getTimeFormat, 1000);
    })


    const getTimeFormat = () => {
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
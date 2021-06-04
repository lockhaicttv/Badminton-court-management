import React, {useState, useEffect} from "react";
import {Row, FormControl, Col, Form} from "react-bootstrap";
import callApi from "../../../../Utils/apiCaller";
import {useRecoilValue} from "recoil";
import {courtIdState} from "../../../../Store/atom";
import Button from "react-bootstrap/Button";
import OrderChart from "../OrderStatistic/OrderChart";
import BillChart from "./BillChart";


const BillStatistic = () => {
    const [statisticTime, setStatisticTime] = useState({
        start: new Date('Wed May 05 2020 00:00:00 GMT-0700'),
        end: new Date()
    })

    const [dataChart, setDataChart] = useState([])
    const courtInfo = useRecoilValue(courtIdState);
    const [statisticToday, setStatisticToday] = useState([])

    useEffect(() => {
        loadDataChart();
        getStatisticToday();
    }, [])

    const loadDataChart = () => {
        callApi(`court_bill/statistic/${courtInfo._id}?start=${statisticTime.start}&&end=${statisticTime.end}`,
            'get',
            null
        )
            .then(res => {
                console.log(res.data)
                setDataChart(res.data)
            })
            .catch((err) => {
                setDataChart([])
            })
    }

    const getStatisticToday = () => {
        let today = new Date()
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        callApi(`court_bill/statistic/${courtInfo._id}?start=${today}&&end=${tomorrow}`,
            'get',
            null
        )
            .then(res => {
                console.log(res.data)
                setStatisticToday(res.data)
            })
            .catch((err) => {
                setStatisticToday([])
            })
    }

    const handleChange = (e) => {
        setStatisticTime({
                ...statisticTime,
                [e.target.name]: e.target.value
            }
        )
        console.log(statisticTime)
    }

    const handleClick = () => {
        loadDataChart();
    }

    console.log(statisticToday)
    return (
        <div>
            <Row>
                <Col sm={0.5} className='p-2'>Từ</Col>
                <Col sm={2}>
                    <FormControl
                        type='date'
                        name='start'
                        value={statisticTime.start}
                        onChange={handleChange}
                    />
                </Col>
                <Col sm={0.5} className='p-2'>đến</Col>
                <Col sm={2}>
                    <FormControl
                        type='date'
                        name='end'
                        value={statisticTime.end}
                        onChange={handleChange}
                    />
                </Col>
                <Col sm={1}>
                    <Button variant='primary' onClick={handleClick}>
                        Xem
                    </Button>
                </Col>
            </Row>
            <BillChart data={dataChart}/>
            <div>
                {statisticToday.length===0?
                    <div>Doanh thu trong ngày: 'Hiện chưa có hoá đơn'</div>
                    :
                    <div>Doanh thu trong ngày: {statisticToday[0].balance}</div>
                }
            </div>
        </div>
    )
}

export default BillStatistic;
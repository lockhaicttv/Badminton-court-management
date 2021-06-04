import React, {useState, useEffect} from "react";
import {Row, FormControl, Col, Form} from "react-bootstrap";
import callApi from "../../../../Utils/apiCaller";
import Button from "react-bootstrap/Button";
import {courtIdState} from "../../../../Store/atom";
import {useRecoilValue} from "recoil";
import OrderChart from "./OrderChart";

const OrderStatistic = () => {
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
        callApi(`user_bill/statistic/${courtInfo._id}?start=${statisticTime.start}&&end=${statisticTime.end}`,
            'get',
            null
        )
            .then(res => {
                console.log('ádasdasd')
                setDataChart(res.data)
            })
            .catch((err) => {
                setDataChart([])
            })
    }

    const getStatisticToday = () => {
        let today = new Date()
        let tomorrow = new Date(today)
        today.setDate(today.getDate() - 1)
        tomorrow.setDate(tomorrow.getDate() + 1)
        console.log(today.toLocaleString(), tomorrow.toLocaleString())
        callApi(`user_bill/statistic/${courtInfo._id}?start=${today}&&end=${tomorrow}`,
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
    }

    const handleClick = () => {
        loadDataChart();
    }

    console.log(dataChart)
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
            <OrderChart data={dataChart}/>
            <div>
                {statisticToday.length===0?
                    <div>Doanh thu trong ngày: 'Hiện chưa có đơn hàng'</div>
                    :
                    <div>Doanh thu trong ngày: {statisticToday[0].balance.toLocaleString()} VND</div>
                }
            </div>
        </div>
    )
}

export default OrderStatistic;
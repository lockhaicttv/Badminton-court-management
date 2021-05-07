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

    useEffect(() => {
        loadDataChart();
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

        </div>
    )
}

export default OrderStatistic;
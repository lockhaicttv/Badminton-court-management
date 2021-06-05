import React, {useState, useEffect} from 'react'
import {AreaChart, LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts'
import Tooltip from "react-bootstrap/Tooltip";
import Area from "../../../Admin/Database/Area/Area";


const OrderChart = (props) => {
    const data = props.data;
    const formatData = []
    for (let i = 0; i < data.length; ++i) {
        let item = {}
        item['time'] = data[i]._id;
        item['value'] = data[i].balance;
        formatData.push(item)
    }

    console.log(formatData)
    return (
        <div>
            <LineChart height={500} width={1000} data={formatData}
                       margin={{top:10, left:10, bottom:10, right:10 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time"/>
                <YAxis/>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8"/>
            </LineChart>
        </div>
    )
}

export default OrderChart;
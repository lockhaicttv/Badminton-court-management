import React, {useState, useEffect} from 'react'
import {AreaChart, LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts'

const BillChart = (props) => {
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
        <div className='p-3'>
            <LineChart height={500} width={1000} data={formatData}
                       margin={{top:10, left:10, bottom:10, right:10 }}
            >
                <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="time"/>
                <YAxis/>
            </LineChart>
        </div>
    )
}

export default BillChart;
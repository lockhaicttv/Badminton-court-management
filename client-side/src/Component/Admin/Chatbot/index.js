import React, {useState, useEffect} from 'react'
import {Route} from "react-router";
import Chatlog from "./Chatlog";
import {Link} from "react-router-dom";
import Train from "./Train";

const Panel = (
    <div>
        <div className="p-2 border">
            <Link to="/admin/chatbot/chat-log">Chat Log</Link>
        </div>
        <div className="p-2 border">
            <Link to="/admin/chatbot/train">Train</Link>
        </div>
    </div>
);

const Chatbot = () => {

    return (
        <div className="row mr-0">
            <div className="col-lg-2" style={{minHeight: "90vh"}}>
                {Panel}
            </div>
            <div className='col-lg-10'>
                <Route exact path='/admin/chatbot/chat-log' component={Chatlog}/>
                <Route exact path='/admin/chatbot/train' component={Train} />
            </div>
        </div>
    )
}

export default Chatbot;
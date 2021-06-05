import react from 'react';
import {Form} from 'react-bootstrap';
import React, {useState, useEffect, useRef} from "react";
import io from 'socket.io-client';
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faWindowMinimize} from "@fortawesome/free-solid-svg-icons";

const socket = io.connect("http://localhost:4000");

const Chat = (props) => {
    const [chatLog, setChatLog] = useState([]);
    const [chat, setChat] = useState({name: 'Chiến', message: '', court_id: props.shop_id});
    const [isOpen, setIsOpen] = useState(false)
    const messageEndRef = useRef(null);
    const [isSend, setIsSend] = useState(false)
    useEffect(() => {
        socket.on('message', ({name, message, time}) => {
            console.log(new Date(time).toLocaleString(), new Date()-new Date(time))
            setChatLog(
                [
                    ...chatLog,
                    {name, message}
                ]
            )
        })
        setIsSend(false)
    }, [isSend])

    useEffect(() => {
        setChat({
            ...chat,
            court_id: props.court_id
        })
    }, [])

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        setChatLog([
            ...chatLog,
            chat
        ])
        socket.emit('message', chat);
        setChat({
            message: '',
            name: 'Chiến',
            court_id: props.court_id
        })
        setIsSend(true)
    }

    const handleChangeMessage = (e) => {
        setChat({
                ...chat,
                [e.target.name]:
                e.target.value
            }
        );
    }

    const handleClose = () => {
        setIsOpen(!isOpen)
    }

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatLog])

    let listChatLog = chatLog.map((item, key) => {
        if (item.name !== 'Upin') {
            return <div key={key}
                        className="d-flex align-items-center text-right justify-content-end shadow-sm pt-1 rounded-0">
                <div className="pr-2"><span className="name">Me</span>
                    <p className="msg">{item.message}</p>
                </div>
                <div>
                    <img src="https://img.icons8.com/color/40/000000/guest-female.png" width="30" className="img1"/>
                </div>
            </div>
        } else {
            return <div key={key} className="d-flex align-items-center shadow-sm pt-1 rounded-0">
                <div className="text-left pr-1">
                    <img src="/image/Upin1.png" width="30" className="img1"/>
                </div>
                <div className="pr-2 pl-1"><span className="name">Upin</span>
                    <p className="msg">{item.message}</p>
                </div>
            </div>
        }
    })

    let renderEle =
        <Button
            onClick={handleClose} className='main d-flex justify-content-between fixed-bottom col-lg-2 offset-10'
        >
            <div>
                Chatbot
            </div>
            <div>
                -
            </div>
        </Button>

    if (isOpen) {
        renderEle =
            <div className="main justify-content-lg-end fixed-bottom p-0 col-lg-2 offset-10">
                <Button
                    onClick={handleClose} className='d-flex justify-content-between rounded-0 m-0'
                    block
                >
                    <div>
                        Chatbot
                    </div>
                    <div>
                        -
                    </div>
                </Button>
                <div className="px-2 scroll">
                    {listChatLog}
                    <div ref={messageEndRef}></div>
                </div>
                <form>
                    <nav className="navbar bg-white navbar-expand-sm d-flex justify-content-between">
                        <input
                            type="text number"
                            onChange={handleChangeMessage}
                            value={chat.message}
                            name='message'
                            className="form-control"
                            placeholder="Type a message..."
                        />
                        <div className="d-flex justify-content-end align-content-center text-center ml-2">
                            <button onClick={handleSubmitMessage} className='btn btn-secondary d-inline-block'>
                                <FontAwesomeIcon icon={faPaperPlane}/>
                            </button>
                        </div>

                    </nav>
                </form>

            </div>
        // </Card>
    }

    return (
        renderEle
    )
}

export default Chat;
import react from 'react';
import {Form} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import {Button} from "react-bootstrap";

const socket = io.connect("http://localhost:4000");

const Chat = () => {
    const [chatLog, setChatLog] = useState([]);
    const [chat, setChat] = useState({name: '', message: ''});


    useEffect(() => {
        socket.on('message', ({name, message}) => {
            setChatLog(
                [
                    ...chatLog,
                    {name, message}
                ]
            )
        })
    })

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        socket.emit('message', chat);
        setChat({
            message: '',
            name: ''
        })
    }

    const handleChangeMessage = (e) => {
        setChat({
                ...chat,
                [e.target.name]:
                e.target.value
            }
        );
        console.log(chat)
    }

    let listChatLog = chatLog.map((item, key) => {
        return <Form.Group key={key} className='shadow'>
            <Form.Label>
                {item.name}
            </Form.Label>
            <Form.Control as='textarea'>
                {item.message}
            </Form.Control>
        </Form.Group>
    })
    console.log(chatLog)
    return (
        <div>
            <Form variant='outline-danger'>
                {listChatLog}
            </Form>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        as='textarea'
                        onChange={handleChangeMessage}
                        value={chat.name}
                        name='name'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Message
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        onChange={handleChangeMessage}
                        value={chat.message}
                        name='message'
                    />
                </Form.Group>
                <Form.Group>
                    <Button onClick={handleSubmitMessage}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Chat;
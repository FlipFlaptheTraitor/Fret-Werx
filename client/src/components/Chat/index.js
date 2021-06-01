import React, { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io('http://localhost:3000/')
const userName1 = 'User '+parseInt(Math.random()*10)




function Chat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload])
    })
  })

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit('message',{userName1,message})
    setMessage('')
  };
  return (
    <div className="App"id="App">
      <h1>Welcome to chat app</h1>
      <form onSubmit={sendMessage}>
        <input type="text" name="message"
        placeholder='Type message'
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        required
        ></input>
        <button type='submit'>Send</button>
        </form>
        <div>
      {chat.map((payload, index)=>{
        return(
          <h3 key={index}>{payload.userName1}: <span>{payload.message}</span></h3>
        )
        
      })}
      </div>
    </div>
  );
}
export default Chat
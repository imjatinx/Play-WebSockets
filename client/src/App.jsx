import React, { useEffect } from 'react'
import { io } from "socket.io-client";

function App() {
  const socket = io('http://127.0.0.1:3000')
  useEffect(() => {
    socket.on('welcome', (msg)=>{
      console.log(msg);
    })
    socket.on('new joiner', (msg)=>{
      console.log(msg);
    })

    return (socket)=>{
      console.log(socket.id, ' disconnected');
      socket.disconnect();
    }
  }, [])
  
  return (
    <div>App</div>
  )
}

export default App
import React from 'react'
import Sidebar from './sidebar';
import UserProfile from './UserProfile';
import Chatting from './Chatting';

const Chat = () => {
  return (
    <>
      <div className=' flex justify-between h-screen w-screen border border-blue-300' >
        <Sidebar/>
        <UserProfile/>
        <Chatting/>
      </div>
    </>
  )
}

export default Chat;
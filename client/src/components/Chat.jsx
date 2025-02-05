import React from 'react'
import Sidebar from './Sidebar';
import Users from './Users';
import ChatContainer from './ChatContainer';
import {useSelector} from 'react-redux';
import NoChatSelected from './NoChatSelected';


const Chat = () => {
  const selectedUser=useSelector(state=>state.chat.selectedUser);
  return (
    <>
      <div className=' flex justify-between h-screen w-screen border border-blue-300' >
        <Sidebar/>
        <Users/>
        {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
      </div>
    </>
  )
}

export default Chat;
import React from 'react'
import Sidebar from './Chat/Sidebar';
import Users from './Chat/Users';
import ChatContainer from './Chat/ChatContainer';
import {useSelector} from 'react-redux';
import NoChatSelected from './Chat/NoChatSelected';


const Chat = () => {
  const selectedUser=useSelector(state=>state.chat.selectedUser);
  return (
    <>
      <div className='flex h-screen w-screen' >
        <Sidebar/>
        <div className='flex w-full'>
          <Users/>
          {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
        </div>
      </div>
    </>
  )
}

export default Chat;
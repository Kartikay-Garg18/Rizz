import React from 'react'
import { useSelector , useDispatch} from 'react-redux';
import { getMessages,listenForMessages,stopListeningForMessages} from '../store/chatSlice';
import { useEffect,useRef } from 'react';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';


function ChatContainer() {
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.chat.messages);
  const {selectedUser}=useSelector(state=>state.chat.selectedUser); 
  const lastMessage = useRef(null);

  useEffect(()=>{
    dispatch(getMessages(selectedUser._id));
    listenForMessages();
    return () => stopListeningForMessages();
  },[selectedUser,listenForMessages,stopListeningForMessages])

  useEffect(()=>{ 
      if(lastMessage.current && messages) lastMessage.current.scrollIntoView({behavior: 'smooth'});
  },[messages])

  return (
    <div className='m-2 w-[65%] border border-red-300'>
      <ChatHeader/>
      <div className='m-2 h-[75%] border bg-slate-900 border-orange-300'>
        {messages.map((message)=>{
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`} ref={lastMessage}>
            <div className='chat-header'>
                  <time className='text-xs text-gray-400 opacity-50'>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </time>
            </div>
            <div className='chat-bubble flex flex-col'>
                  {message.image && <img src={message.image} alt="message image" className='w-48 h-48 object-cover rounded-lg'/>}
                  {message.text && <p className='text-lg'>{message.text}</p>}
            </div>
          </div>
        })}
      </div>
      <ChatInput/>
    </div>
  )
}

export default ChatContainer
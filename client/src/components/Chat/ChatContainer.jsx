import React from 'react'
import { useSelector , useDispatch} from 'react-redux';
import {addMessage, setMessages,stopListeningForMessages} from '../../store/chatSlice';
import { getMessages , listenForMessages } from '../../services/chat';
import { useEffect,useRef } from 'react';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import bg from '../../assets/bg.png';


function ChatContainer() {
  const dispatch = useDispatch();
  const  messages  = useSelector(state => state.chat.messages);
  const selectedUser = useSelector(state=>state.chat.selectedUser); 
  const user = useSelector(state=>state.auth.user); 
  const lastMessage = useRef(null);
  
  useEffect(()=>{
    getMessages(selectedUser._id).then((messages)=>{
        dispatch(setMessages(messages));
    }).catch((error)=>{
        console.log("Error in setting messages (ChatContainer)",error);
    });
    const message=listenForMessages(selectedUser);
    if(message) dispatch(addMessage(message));
    return () => dispatch(stopListeningForMessages());
  },[selectedUser,listenForMessages,stopListeningForMessages,getMessages,setMessages])

  useEffect(()=>{ 
      if(lastMessage.current && messages) lastMessage.current.scrollIntoView({behavior: 'smooth'});
  },[messages])

  function timeFormatting(time){
    let splittedTime = time.split(':');
    return `${splittedTime[0]}:${splittedTime[1]} ${splittedTime[2].substring(3)}`;
  }

  return (
    <div className='my-2 w-full'>
      <ChatHeader/>
      <div className='h-[80%] bg-gray-900 overflow-y-auto px-2 rounded-2xl'  style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        {messages.map((message)=>{
          return(
          <div key={message._id} className={`chat ${message.senderId == user.id ? 'chat-end' : 'chat-start'}`} ref={lastMessage}>
            <div className='chat-header'>
                  <time className='text-xs text-gray-400 opacity-50'>
                    {timeFormatting(new Date(message.createdAt).toLocaleTimeString())}
                  </time>
            </div>
            <div className='chat-bubble flex flex-col'>
                  {message.images && 
                    message.images.map( (image) =>{
                      return(
                        <img src={image} alt="message image" className='w-48 h-48 object-cover rounded-lg'/>
                      )
                    })
                  }
                  {message.text && <p className='text-lg'>{message.text}</p>}
            </div>
          </div>)
        })}
      </div>
      <ChatInput/>
    </div>
  )
}

export default ChatContainer
import React from 'react';
import { useState,useRef } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { sendMessage } from '../services/chat';
import { addMessage } from '../store/chatSlice';
import send from '../assets/Send.png';
import upload from '../assets/Upload.png';

function ChatInput() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const selectedUser = useSelector(state=>state.chat.selectedUser);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const handleImageChange = (e) => { 
    const file = e.target.files[0];
    if(!file.type.startsWith('image')){
      alert('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  }
  const removeImage = () => { 
    setImage('');
    if(inputFile.current) inputFile.current.value = null;
  }
  const handleSendMessage = (e) => {  
    e.preventDefault();
    if(!text.trim() && !image) return;
    const message = {text:text.trim(),image};
    sendMessage(selectedUser._id,message).then((message)=>{
      dispatch(addMessage(message));
    }).catch((error)=>{
      console.log(error);
    });
    setText('');
    setImage('');
    if(inputFile.current) inputFile.current.value = null;
  }

  return (
    <div className='flex justify-center items-center flex-wrap h-[10%]'>
        {image &&
            <div className='h-12 w-14 flex justify-center items-center relative gap-2'>
                <img src={image} alt='Image Preview' className='w-12 h-12 object-cover rounded-full'/>
                <button onClick={removeImage}  className='absolute -top-1.5 -rigth-1.5 w-5 h-5 rounded-full bg-slate-500'>X</button>
            </div>
        }
        <form onSubmit={handleSendMessage} className='flex justify-evenly items-center w-[100%]'>
          <button className='ml-2 h-14 w-14 text-white rounded-full'>
            <input id='image' type="file"  ref={inputFile} accept="image/*" onChange={handleImageChange} className='hidden'/>
            <label htmlFor="image" onClick={()=> {inputFile.current?.click()}}>
              <img src={upload} className='size-10 rounded-full cursor-pointer' />
            </label>
          </button>

          <input type="text" 
            className='p-4 h-[75%] w-[90%]  bg-slate-950 opacity-35 text-white rounded-full' 
            placeholder='Type a message'
            value={text} 
            onChange={(e)=>{setText(e.target.value)}} />
            
          <button 
            className='ml-2 h-14 w-14 text-white rounded-full cursor-pointer'
            type='submit'>
              <img src={send} alt="send icon" className='size-10 rounded-full' />
          </button>
        </form>
    </div>
  )
}

export default ChatInput
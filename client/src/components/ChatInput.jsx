import React from 'react';
import { useState,useRef } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { sendMessage } from '../store/chatSlice';

function ChatInput() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
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
    dispatch(sendMessage(message));
    setText('');
    setImage('');
    if(inputFile.current) inputFile.current.value = null;
  }

  return (
    <div className='m-2 flex justify-center items-center h-[10%] border border-gray-300'>
        {image &&
            <div className='ml-2 h-12 w-14 flex justify-center items-center relative gap-2'>
                <img src={image} alt='Image Preview' className='w-12 h-12 object-cover rounded-full'/>
                <button onClick={removeImage}  className='absolute -top-1.5 -rigth-1.5 w-5 h-5 rounded-full bg-slate-500'>X</button>
            </div>
        }
        <form onSubmit={handleSendMessage}>
          <div className='ml-2 h-12 w-14 bg-slate-950 border border-green-500 opacity-30 rounded-full'></div>
          <input type="text" 
            className='m-2 p-4 h-[75%] w-[98%]  bg-slate-950 opacity-35 text-red-200 border border-gray-500 rounded-full' 
            placeholder='Type a message'
            value={text} 
            onChange={(e)=>{setText(e.target.value)}} />
          <input type="file"  ref={inputFile} accept="image/*" onChange={handleImageChange} className='hidden'/>
          <button onClick={()=> {inputFile.current?.click()}}>Image Icon</button>
          <button 
            className='mr-2 h-12 w-14 bg-slate-950 border border-green-500 opacity-30 rounded-full cursor-pointer'
            type='submit'>
              Send Icon
          </button>
        </form>
    </div>
  )
}

export default ChatInput
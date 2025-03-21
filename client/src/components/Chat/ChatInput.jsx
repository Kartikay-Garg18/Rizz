import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../services/chat';
import { addMessage } from '../../store/chatSlice';
import send from '../../assets/Send.png';
import upload from '../../assets/Upload.png';

function ChatInput() {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const imgInputField = useRef(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image'));

    if (imageFiles.length !== files.length) {
      alert('Please upload only image files');
      return;
    }

    const readers = imageFiles.map(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prevImages => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
      return reader;
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((i) => i !== index));
    if (imgInputField.current && images.length === 0) imgInputField.current.value = null;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && images.length === 0) return;
    const message = { text: text.trim(), images };
    sendMessage(selectedUser._id, message).then((message) => {
      dispatch(addMessage(message));
    }).catch((error) => {
      console.log(error);
    });
    setText('');
    setImages([]);
    if (imgInputField.current) imgInputField.current.value = null;
  };

  return (
    <div className='fixed bottom-3 w-[72%]'>
      <div className='flex flex-wrap gap-2'>
        {images.map((image, index) => (
          <div key={index} className='h-12 w-14 flex justify-center items-center relative gap-2'>
            <img src={image} alt='Image Preview' className='w-12 h-12 object-cover rounded-full' />
            <button onClick={() => removeImage(index)} className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-500'>X</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className='flex items-center w-full justify-between'>
        <button className='mx-2 h-14 text-white rounded-full w-fit'>
          <input id='image' type="file" multiple ref={imgInputField} accept="image/*" onChange={handleImageChange} className='hidden' />
          <label htmlFor="image" onClick={() => { imgInputField.current?.click() }}>
            <img src={upload} className='size-10 rounded-full cursor-pointer' />
          </label>
        </button>

        <input type="text"
          className='p-4 h-[75%] bg-slate-950 opacity-35 text-white rounded-full w-full'
          placeholder='Type a message'
          value={text}
          onChange={(e) => { setText(e.target.value) }} />

        <button
          className='ml-2 h-14 text-white rounded-full cursor-pointer w-fit'
          type='submit'>
          <img src={send} alt="send icon" className='size-10 rounded-full' />
        </button>
      </form>
    </div>
  )
}

export default ChatInput;
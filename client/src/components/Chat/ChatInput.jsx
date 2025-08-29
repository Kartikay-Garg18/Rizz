import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../services/chat';
import { addMessage, updateMessage } from '../../store/chatSlice';
import { v4 as uuidv4 } from 'uuid';

export default function ChatInput() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const currentUser = useSelector((state) => state.auth.user);

  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesOnly = files.filter((file) => file.type.startsWith('image/'));
    if (imagesOnly.length !== files.length) {
      alert('Only image files are allowed.');
    }
    setImages(imagesOnly);
  };

  const clearImages = () => {
    setImages([]);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!text.trim() && images.length === 0) || !selectedUser) return;

    const tempId = uuidv4();
    
    const senderId = currentUser._id || currentUser.id;
    
    const tempMessage = {
      _id: tempId,
      senderId: senderId,
      receiverId: selectedUser._id,
      text: text.trim(),
      images: images.map(img => ({ url: URL.createObjectURL(img), isUploading: true })),
      createdAt: new Date().toISOString(),
    };
    
    dispatch(addMessage(tempMessage));
    
    setText('');
    clearImages();

    try {
      const message = { text: text.trim(), images };
      const sentMessage = await sendMessage(selectedUser._id, message);
      
      dispatch(updateMessage({ tempId, finalMessage: sentMessage }));
      
    } catch (error) {
      // Handle the failed message state silently or display a user-friendly error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center p-3 bg-indigo-900 shadow-lg rounded-t-lg">
      {images.length > 0 && (
        <div className="flex space-x-2 mr-4 max-w-full w-full mb-2 overflow-x-auto">
          {images.map((img, i) => (
            <div key={i} className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
              <img src={URL.createObjectURL(img)} alt={`attachment-${i}`} className="object-cover w-full h-full" />
              <button
                type="button"
                onClick={() => {
                  setImages(images.filter((_, idx) => idx !== i));
                  if (imageInputRef.current && images.length === 1) {
                    imageInputRef.current.value = null;
                  }
                }}
                className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full px-1 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-grow rounded-l-full px-4 py-3 bg-indigo-800 text-white focus:outline-none placeholder-indigo-300 min-w-0"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        multiple
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <button
        type="button"
        className="px-3 py-3 rounded-r-full bg-pink-600 hover:bg-pink-500"
        onClick={() => imageInputRef.current && imageInputRef.current.click()}
        title="Upload images"
      >
        📎
      </button>
      <button
        type="submit"
        className="ml-2 px-5 py-3 rounded-full bg-purple-700 hover:bg-purple-600 text-white shadow-md"
        aria-label="Send message"
        disabled={(!text.trim() && images.length === 0) || !selectedUser}
      >
        ➤
      </button>
    </form>
  );
}

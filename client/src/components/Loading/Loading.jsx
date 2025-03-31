import React, { useState, useEffect } from 'react';
import './Loading.css';

function Loading({ messages }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [flyingMessage, setFlyingMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setFlyingMessage(messages[currentMessageIndex]); // Set the current flying message
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length); // Move to the next message
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [messages, currentMessageIndex]);

  return (
    <div className="loading-container ">
      <div className='flex justify-center items-center gap-2'>
        <div className="spinner size-10"></div>
        <div className='text-3xl text-center font-bold Loading'>Loading ...</div>
      </div>
      <div className='w-full flex justify-evenly '>
        <div className="folder-container">
          <img
            src="https://img.icons8.com/?size=100&id=JHFYPQIPcXti&format=png&color=000000"
            alt="Source Folder"
            className="folder-icon"
          />
        </div>

        {/* Flying message */}
        {flyingMessage && (
          <div className="flying-message flex justify-center">
            {flyingMessage}
          </div>
        )}

        <div className="folder-container">
          <img
            src="https://img.icons8.com/?size=100&id=JHFYPQIPcXti&format=png&color=000000"
            alt="Destination Folder"
            className="folder-icon"
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
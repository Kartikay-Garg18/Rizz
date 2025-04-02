import React from 'react';
import cat from '../../assets/cat.gif';

function Loading() {
  return (
    <div className='h-full p-20 flex justify-center items-center flex-col'>
      <img src={cat} alt="Loading..." className='animate-bounce'/>
      <div className='font-pop text-4xl animate-pulse flex gap-3'>
        <div className='border h-10 w-10 border-x-4 border-y-4 border-white border-t-blue-700 rounded-full animate-spin'></div>
        Loading...
      </div>
    </div>

  )
}

export default Loading
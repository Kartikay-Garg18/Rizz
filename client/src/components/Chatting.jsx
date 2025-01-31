import React from 'react'

function Chatting() {
  return (
    <div className='m-2 w-[65%] border border-red-300'>
      <div className='m-2 flex h-[10%] border border-yellow-300'>
        <div className='m-2 flex items-center w-[50%] border border-lime-400'>
          <div className='m-1 h-12 w-12 bg-slate-950 border border-green-500 opacity-30 rounded-full'></div>
          <p className='p-2 text-lg '>User 1</p>
        </div>
        <div className='m-2 w-[50%] flex justify-end border border-lime-400'>
          <div className='m-1 h-12 w-12 bg-slate-950 border border-green-500 opacity-30 rounded-full'></div>
          <div className='m-1 h-12 w-12 bg-slate-950 border border-green-500 opacity-30 rounded-full'></div>
          <div className='m-1 h-12 w-12 bg-slate-950 border border-green-500 opacity-30 rounded-full'></div>
        </div>

      </div>
      <div className='m-2 h-[75%] border bg-slate-900 border-orange-300'>
        <div className='chat chat-start'>
          <div className='chat-bubble'>
            Hi
            <br />
            I am Deepseek
          </div>
        </div>
        <div className='chat chat-end'>
          <div className='chat-bubble'>Hello</div>
        </div>
      </div>
      <div className='m-2 flex justify-center items-center h-[10%] border border-gray-300'>
        <div className='ml-2 h-12 w-14 bg-slate-950 border border-green-500 opacity-30 rounded-full'></div>
        <input type="text" className='m-2 p-4 h-[75%] w-[98%]  bg-slate-950 opacity-35 text-red-200 border border-gray-500 rounded-full' placeholder='Type a message' />
        <div className='mr-2 h-12 w-14 bg-slate-950 border border-green-500 opacity-30 rounded-full cursor-pointer'></div>
      </div>
    </div>
  )
}

export default Chatting
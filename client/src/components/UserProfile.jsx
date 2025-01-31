import React from 'react'

const UserProfile = () => {
    const cl = 'm-2 p-2 h-[10%] w-[100%] text-amber-400 text-xl flex items-center justify-start border border-black-500 cursor-pointer';
  return (
    <div className='m-2 flex flex-col  bg-slate-950 w-[25%] border border-green-400 opacity-45'>
          
          <div className='m-2 h-[15%] sticky top-2 flex justify-center items-center border border-orange-50 text-amber-400 text-xl'>
            <input type="text" placeholder='search' className='rounded-2xl p-4 h-8 w-[90%]'/>
          </div>
          <div className='m-2 overflow-y-scroll flex flex-wrap  border border-yellow-300'>
             <div className={cl}>Chat 1</div>
            <div className={cl}>Chat 2</div>
            <div className={cl}>Chat 3</div>
            <div className={cl}>Chat 4</div>
            <div className={cl}>Chat 5</div>
            <div className={cl}>Chat 6</div>
            <div className={cl}>Chat 7</div>
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
            <div className={cl}>Chat 8</div>  
          </div>
        </div>
  )
}

export default UserProfile
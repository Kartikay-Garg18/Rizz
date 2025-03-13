import React from 'react'
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {setSelectedUser, setUsers} from '../store/chatSlice';
import { getUsers } from '../services/chat';


const Users = () => {
    const dispatch=useDispatch();
    const users = useSelector(state=>state.chat.users);

    useEffect(()=>{
      getUsers().then((users) => {
        if(users){
          dispatch(setUsers(users));
        }
      })
    },[])

    const cl = 'm-2 p-2 h-[10%] w-[100%] text-amber-400 text-xl flex items-center justify-start border border-black-500 cursor-pointer';
  return (
    <div className='m-2 flex flex-col  bg-slate-950 w-[25%] border border-green-400 opacity-45'>
          
          <div className='m-2 h-[15%] sticky top-2 flex justify-center items-center border border-orange-50 text-amber-400 text-xl'>
            <input type="text" placeholder='search' className='rounded-2xl p-4 h-8 w-[90%]'/>
          </div>
          <div className='m-2 overflow-y-scroll flex flex-wrap  border border-yellow-300'>
             {
                users.map((user)=>{
                return (<button 
                  key={user._id}
                  onClick={()=>dispatch(setSelectedUser(user))}
                  className={cl}
                >
                  <div className='bg-gray-900'>
                    <img src={user.profilePictureUrl || ""} alt="Profile pic" className='size-12 object-cover rounded-full'/>
                    <h3>{user.username}</h3>
                  </div>
                </button>)
                })
              }
          </div>
        </div>
  )
}

export default Users
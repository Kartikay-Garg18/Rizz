import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser, setUsers } from '../store/chatSlice';
import { getUsers } from '../services/chat';
import profile from '../assets/ProfilePhoto.jpg' ;


const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.chat.users);

  useEffect(() => {
    getUsers().then((users) => {
      if (users) {
        dispatch(setUsers(users));
      }
    })
  }, [])

  const cl = 'p-2 h-[10%] w-[100%] text-amber-400 text-xl flex items-center justify-start  cursor-pointer rounded-2xl';
  return (
    <div className='my-2 flex flex-col rounded-xl bg-slate-950 w-[25%] opacity-50'>
      <div className='mx-2 my-4 h-[8%] sticky top-2 flex justify-center items-center text-amber-400 text-xl'>
        <input type="text" placeholder='Search' className='rounded-2xl px-6 h-10 w-[90%]' />
      </div>
      <div className='overflow-y-scroll flex flex-wrap'>
        {
          users.map((user) => {
            return (<button
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={cl}
            >
              <div className='px-2 rounded-2xl'>
                <img src={user.profilePictureUrl || profile} alt="profile photo" className='size-9 object-cover rounded-full' />
              </div>
              <div className='mx-2 flex justify-center items-center'>
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
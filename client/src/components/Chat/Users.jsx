import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser, setUsers } from '../../store/chatSlice';
import profile from '../../assets/ProfilePhoto.jpg' ;
import { getUsers } from '../../services/chat';


const Users = () => {
  const dispatch = useDispatch();
  getUsers(dispatch);
  const users = useSelector(state => state.chat.users);

  const cl = 'p-2 h-[10%] w-[100%] text-white text-xl flex items-center justify-start cursor-pointer rounded-2xl pl-3';
  return (
    <div className=' flex flex-col h-full bg-gray-900 w-[30%] border-r border-gray-500 resize-x overflow-auto max-w-[24%]'>
      <div className='mx-2 my-4 h-[8%] sticky top-2 flex justify-center items-center text-white text-xl'>
        <input type="text" placeholder='Search' className='rounded-2xl px-6 h-10 w-[90%]' />
      </div>
      <div className='overflow-y-auto flex flex-wrap'>
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
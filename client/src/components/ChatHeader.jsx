import React from 'react'
import { setSelectedUser } from '../store/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import profile  from '../assets/ProfilePhoto.jpg'

function ChatHeader() {
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const onlineUsers = useSelector(state => state.auth.onlineUsers);
  const dispatch = useDispatch();

  return (
      <div className="p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
        <button className='m-1' onClick={() => dispatch(setSelectedUser(null))}>
          <img src="https://cdn-icons-png.flaticon.com/512/109/109618.png" alt="close button" className='size-6 invert rounded-full'/>
        </button>
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePictureUrl || profile} alt={selectedUser.username}/>
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.username}</h3>
            <p className="text-sm">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
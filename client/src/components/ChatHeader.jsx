import React from 'react'
import { setSelectedUser } from '../store/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

function ChatHeader() {
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const onlineUsers = useSelector(state => state.auth.users);
  const dispatch = useDispatch();

  return (
      <div className="p-2.5 border-b border-slate-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePictureUrl || ""} alt={selectedUser.username} />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.username}</h3>
            <p className="text-sm">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => dispatch(setSelectedUser(null))}>
          Close Button
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
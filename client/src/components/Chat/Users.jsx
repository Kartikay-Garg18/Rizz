import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../../store/chatSlice';

export default function Users({ isMobile }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chat.users);
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  return (
    <aside className={`
      h-screen flex flex-col
      ${isMobile
        ? "w-full bg-gradient-to-b from-indigo-900 to-pink-700"
        : "w-72 bg-gradient-to-b from-indigo-900/90 to-pink-700/80 shadow-xl border-r border-purple-600"}
    `}>
      <h2 className="text-white text-2xl font-semibold tracking-wider py-6 px-6 mb-4 border-b border-purple-700 text-center md:text-left">
        Users
      </h2>
      <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-20">
        {(users && users.length) ? users.map(user => (
          <button
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`
              w-full flex items-center px-4 py-3 rounded-md 
              transition 
              ${selectedUser?._id === user._id
                ? "bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-800 text-white shadow-md"
                : "bg-white/10 hover:bg-indigo-800 hover:text-pink-300 text-indigo-100"}
              font-medium focus:outline-none focus:ring-2 focus:ring-pink-400
              ${isMobile ? "text-lg py-4" : ""}
            `}
          >
            {user.username}
          </button>
        )) : (
          <p className="text-center text-indigo-200 pt-8">No users found.</p>
        )}
      </div>
    </aside>
  );
}

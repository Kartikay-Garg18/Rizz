import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../../store/chatSlice';
import defaultProfile from '../../assets/ProfilePhoto.jpg';

const Users = React.memo(function Users({ isMobile }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chat.users);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const isLoading = useSelector((state) => state.chat.loading.users);

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
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="ml-2 text-white">Loading users...</span>
          </div>
        ) : (users && users.length) ? users.map(user => (
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
            <img
              src={user.profilePictureUrl || defaultProfile}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20 mr-3 flex-shrink-0"
            />
            <span className="truncate">{user.username}</span>
          </button>
        )) : (
          <p className="text-center text-indigo-200 pt-8">No users found.</p>
        )}
      </div>
    </aside>
  );
});

export default Users;

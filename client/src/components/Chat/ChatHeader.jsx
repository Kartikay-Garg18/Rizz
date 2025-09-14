import { setSelectedUser } from '../../store/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import defaultProfile from '../../assets/ProfilePhoto.jpg';

export default function ChatHeader() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const onlineUsers = useSelector((state) => state.auth.onlineUsers);

  if (!selectedUser) return null;

  const isOnline = Array.isArray(onlineUsers) && onlineUsers.some(id => String(id) === String(selectedUser._id));

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-700 via-indigo-900 to-pink-600 shadow-md text-white">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full transition shadow-md mr-2"
          aria-label="Close chat"
          title="Exit chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <img
          src={selectedUser.profilePictureUrl || defaultProfile}
          alt={selectedUser.username}
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
        />
        <div>
          <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
          <span
            className={`text-sm font-semibold ${
              isOnline ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </header>
  );
}

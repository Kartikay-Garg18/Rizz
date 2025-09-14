import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../services/chat';
import { connectSocket } from '../store/authSlice';
import Sidebar from './Chat/Sidebar';
import Users from './Chat/Users';
import ChatContainer from './Chat/ChatContainer';

export default function Chat() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const users = useSelector((state) => state.chat.users);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      if (!users || users.length === 0) {
        getUsers(dispatch);
      }
      dispatch(connectSocket(user._id || user.id));
    }
  }, [user, dispatch, users]);

  return (
    <div className="flex min-h-screen h-screen w-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-pink-700 overflow-hidden">
      {!isMobile && <Sidebar isMobile={false} />}
      
      <div className={`
        ${isMobile 
          ? selectedUser ? 'hidden' : 'w-full absolute inset-0 z-10' 
          : 'relative'
        } 
        md:block md:relative md:w-auto
      `}>
        <Users isMobile={isMobile} />
      </div>
      
      <main className={`
        flex-1 h-full flex items-center justify-center
        ${isMobile && !selectedUser ? 'hidden' : 'flex'}
      `}>
        {selectedUser ? (
          <ChatContainer />
        ) : !isMobile && (
          <div className="flex flex-col items-center justify-center h-full w-full bg-white/0 text-white">
            <h2 className="text-3xl font-bold mb-4">No chat selected</h2>
            <p className="opacity-70">Select a user from the list to start chatting.</p>
          </div>
        )}
      </main>
      
      {isMobile && <Sidebar isMobile={true} showInMobile={!selectedUser} />}
    </div>
  );
}

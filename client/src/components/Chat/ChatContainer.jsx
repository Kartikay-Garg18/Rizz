import { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../../services/chat';
import { setMessagesForUser, setMessagesLoading, addMessage } from '../../store/chatSlice';
import defaultProfile from '../../assets/ProfilePhoto.jpg';

export default function ChatContainer() {
  const dispatch = useDispatch();
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const currentUser = useSelector(state => state.auth.user);
  const isLoadingMessages = useSelector(state => state.chat.loading.messages);
  
  const normalizedCurrentUser = currentUser ? {
    ...currentUser,
    _id: currentUser._id || currentUser.id
  } : null;
  
  const messagesByUser = useSelector(state => state.chat.messagesByUser);
  const messages = selectedUser ? messagesByUser[String(selectedUser._id)] || [] : [];
  const lastMessageRef = useRef(null);
  
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!selectedUser) return;
    
    const selectedUserId = String(selectedUser._id);
    
    if (!messagesByUser[selectedUserId]) {
      dispatch(setMessagesLoading(true));
      getMessages(selectedUser._id).then(msgs => {
        dispatch(setMessagesForUser({ userId: selectedUserId, messages: msgs }));
      });
    }
  }, [selectedUser, dispatch, messagesByUser]);
  
  useEffect(() => {
  }, [selectedUser, dispatch, normalizedCurrentUser, messages]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <section className="relative flex flex-col h-full w-full">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#3f1b66] via-[#2b246d] to-[#ec4899] opacity-70 blur-[2px]" />
      
      <div className="relative flex flex-col h-full w-full z-10">
        <div className="flex-shrink-0 sticky top-0 z-20">
          <ChatHeader />
        </div>
        
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-140px)] pb-4 px-2 md:px-6 space-y-2 overscroll-contain">
          {isLoadingMessages ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-2 text-white">Loading messages...</span>
            </div>
          ) : messages.length === 0 ? (
            <p className="text-indigo-100 text-center my-20">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg, idx) => {
              const isOwn = normalizedCurrentUser ? String(msg.senderId) === String(normalizedCurrentUser._id) : false;
              
              let senderProfilePic;
              if (isOwn) {
                senderProfilePic = normalizedCurrentUser?.profilePictureUrl;
              } else {
                senderProfilePic = selectedUser?.profilePictureUrl;
              }
              
              return (
                <div
                  key={msg._id || idx}
                  ref={idx === messages.length - 1 ? lastMessageRef : null}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"} w-full mb-1.5 items-end space-x-2`}
                >
                  {!isOwn && (
                    <img
                      src={senderProfilePic || defaultProfile}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-white/20 flex-shrink-0"
                    />
                  )}
                  <div
                    className={`inline-block max-w-[45%] md:max-w-[40%] px-3 py-2 rounded-2xl break-words hyphens-auto
                      ${isOwn 
                        ? "bg-gradient-to-tr from-pink-500 via-purple-600 to-blue-600 text-white shadow-md"
                        : "bg-white/20 text-indigo-50 shadow"}
                    `}
                  >
                    {msg.text && <div className="whitespace-pre-line text-xs md:text-sm break-all overflow-hidden">{msg.text}</div>}
                    {msg.images && msg.images.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {msg.images.map((img, i) => (
                          <div key={i} className="relative">
                            <img
                              src={img.url || img}
                              alt=""
                              onClick={() => !img.isUploading && setModalImage(img.url || img)}
                              className={`w-16 h-16 object-cover rounded-lg border border-white/20 shadow transition-transform hover:scale-105 ${
                                img.isUploading ? 'cursor-default opacity-70' : 'cursor-pointer'
                              }`}
                            />
                            {img.isUploading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {isOwn && (
                    <img
                      src={senderProfilePic || defaultProfile}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-white/20 flex-shrink-0"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
        
        <div className="flex-shrink-0 w-full bg-transparent sticky bottom-0 left-0 right-0 z-20 pb-1">
          <ChatInput />
        </div>
      </div>
        
      {modalImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
            <button 
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <img 
              src={modalImage} 
              alt="Enlarged" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}

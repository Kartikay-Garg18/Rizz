import React, { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../../services/chat';
import { setMessagesForUser, addMessage } from '../../store/chatSlice';

export default function ChatContainer() {
  const dispatch = useDispatch();
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const currentUser = useSelector(state => state.auth.user);
  
  const normalizedCurrentUser = currentUser ? {
    ...currentUser,
    _id: currentUser._id || currentUser.id
  } : null;
  
  const messagesByUser = useSelector(state => state.chat.messagesByUser);
  const messages = selectedUser ? messagesByUser[selectedUser._id] || [] : [];
  const lastMessageRef = useRef(null);
  
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id).then(msgs => {
      dispatch(setMessagesForUser({ userId: selectedUser._id, messages: msgs }));
    });
  }, [selectedUser, dispatch]);
  
  useEffect(() => {
    const socket = window.socket;
    
    if (socket) {
      const handleNewMessage = (message) => {
        const msgSenderId = String(message.senderId);
        const msgReceiverId = String(message.receiverId);
        const currentUserId = normalizedCurrentUser ? String(normalizedCurrentUser._id) : '';
        const selectedUserId = selectedUser ? String(selectedUser._id) : null;
        
        if (selectedUserId && message._id) {
          const isRelevantToCurrentChat = 
              msgSenderId === selectedUserId || msgReceiverId === selectedUserId;
              
          if (isRelevantToCurrentChat) {
            const isFromCurrentUser = msgSenderId === currentUserId;
            
            if (isFromCurrentUser) {
              const existingMessage = messages.find(m => 
                m._id === message._id || 
                (m.text === message.text && 
                 new Date(m.createdAt).getTime() > new Date().getTime() - 60000)
              );
              
              if (!existingMessage) {
                dispatch(addMessage(message));
              }
            } else {
              dispatch(addMessage(message));
            }
          }
        }
      };
      
      socket.off('newMessage');
      
      socket.on('newMessage', handleNewMessage);
      
      return () => {
        socket.off('newMessage', handleNewMessage);
      };
    }
  }, [selectedUser, dispatch, normalizedCurrentUser]);

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
          {messages.length === 0 ? (
            <p className="text-indigo-100 text-center my-20">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg, idx) => {
              const isOwn = normalizedCurrentUser ? String(msg.senderId) === String(normalizedCurrentUser._id) : false;
              return (
                <div
                  key={msg._id || idx}
                  ref={idx === messages.length - 1 ? lastMessageRef : null}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"} w-full mb-1.5`}
                >
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
                          <img
                            key={i}
                            src={img.url || img}
                            alt=""
                            onClick={() => setModalImage(img.url || img)}
                            className="w-16 h-16 object-cover rounded-lg border border-white/20 shadow cursor-pointer transition-transform hover:scale-105"
                          />
                        ))}
                      </div>
                    )}
                  </div>
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

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  selectedUser: null,
  messagesByUser: {},
  loading: {
    users: false,
    messages: false,
  },
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
      state.loading.users = false
    },
    setUsersLoading(state, action) {
      state.loading.users = action.payload
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload
    },
    setMessagesLoading(state, action) {
      state.loading.messages = action.payload
    },
    setMessagesForUser(state, action) {
      const { userId, messages } = action.payload
      const userIdStr = String(userId)
      
      const formattedMessages = messages.map(msg => ({
        ...msg,
        senderId: String(msg.senderId),
        receiverId: String(msg.receiverId)
      }))
      
      state.messagesByUser[userIdStr] = formattedMessages
      state.loading.messages = false
    },
    addMessage(state, action) {
      const message = action.payload;
      const currentUser = state.selectedUser;
      
      const senderId = String(message.senderId);
      const receiverId = String(message.receiverId);
      
      let chatUserId;
      
      if (currentUser) {
        chatUserId = String(currentUser._id);
      } else {
        chatUserId = receiverId;
      }
      
      if (currentUser) {
        const currentUserId = String(currentUser._id);
        const isRelevantToCurrentChat = 
          (senderId === currentUserId) || (receiverId === currentUserId);
          
        if (!isRelevantToCurrentChat) {
          return;
        }
      }

      if (!state.messagesByUser[chatUserId]) {
        state.messagesByUser[chatUserId] = [];
      }
      
      const isDuplicate = state.messagesByUser[chatUserId].some(m => {
        if (m._id && message._id && String(m._id) === String(message._id)) {
          return true;
        }
        return false;
      });
      
      if (!isDuplicate) {
        state.messagesByUser[chatUserId].push(message);
      }
    },
    updateMessage(state, action) {
      const { tempId, finalMessage } = action.payload;
      
      let chatUserId;
      if (state.selectedUser) {
        chatUserId = String(state.selectedUser._id);
      } else {
        chatUserId = String(finalMessage.receiverId);
      }

      if (state.messagesByUser[chatUserId]) {
        const messageIndex = state.messagesByUser[chatUserId].findIndex(m => String(m._id) === String(tempId));
        if (messageIndex !== -1) {
          state.messagesByUser[chatUserId][messageIndex] = {
            ...finalMessage,
            senderId: String(finalMessage.senderId),
            receiverId: String(finalMessage.receiverId)
          };
        } else {
          state.messagesByUser[chatUserId].push({
            ...finalMessage,
            senderId: String(finalMessage.senderId),
            receiverId: String(finalMessage.receiverId)
          });
        }
      }
    },
    addMessageToUser(state, action) {
      const { message, userId } = action.payload;
      
      const chatUserId = String(userId);
      
      if (!state.messagesByUser[chatUserId]) {
        state.messagesByUser[chatUserId] = [];
      }
      
      const isDuplicate = state.messagesByUser[chatUserId].some(m => {
        if (m._id && message._id && String(m._id) === String(message._id)) {
          return true;
        }
        return false;
      });
      
      if (!isDuplicate) {
        state.messagesByUser[chatUserId].push(message);
      }
    },
  },
});

export const { setUsers, setUsersLoading, setSelectedUser, setMessagesLoading, setMessagesForUser, addMessage, addMessageToUser, updateMessage } = chatSlice.actions;

export default chatSlice.reducer

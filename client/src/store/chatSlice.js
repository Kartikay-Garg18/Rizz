import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  selectedUser: null,
  messagesByUser: {},
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload
    },
    setMessagesForUser(state, action) {
      const { userId, messages } = action.payload
      state.messagesByUser[userId] = messages
    },
    addMessage(state, action) {
      const message = action.payload;
      
      const senderId = String(message.senderId);
      const receiverId = String(message.receiverId);
      
      let chatUserId;
      
      const allUserIds = Object.keys(state.messagesByUser);
      
      if (allUserIds.includes(senderId)) {
        chatUserId = senderId;
      } else if (allUserIds.includes(receiverId)) {
        chatUserId = receiverId;
      } else {
        chatUserId = senderId;
      }

      if (!state.messagesByUser[chatUserId]) {
        state.messagesByUser[chatUserId] = [];
      }
      
      const isDuplicate = state.messagesByUser[chatUserId].some(m => {
        if (m._id && message._id && String(m._id) === String(message._id)) {
          return true;
        }
        
        if (m.text === message.text && 
            String(m.senderId) === String(message.senderId) &&
            Math.abs(new Date(m.createdAt) - new Date(message.createdAt)) < 10000) {
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
      const recipientId = finalMessage.receiverId;

      if (state.messagesByUser[recipientId]) {
        const messageIndex = state.messagesByUser[recipientId].findIndex(m => m._id === tempId);
        if (messageIndex !== -1) {
          state.messagesByUser[recipientId][messageIndex] = finalMessage;
        }
      }
    },
  },
});

export const { setUsers, setSelectedUser, setMessagesForUser, addMessage, updateMessage } = chatSlice.actions;

export default chatSlice.reducer

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
      state.messagesByUser[userId] = messages
      state.loading.messages = false
    },
    addMessage(state, action) {
      const message = action.payload;
      
      const senderId = String(message.senderId);
      const receiverId = String(message.receiverId);
      
      let chatUserId;
      
      if (state.selectedUser) {
        chatUserId = String(state.selectedUser._id);
      } else {
        const allUserIds = Object.keys(state.messagesByUser);
        
        if (allUserIds.includes(receiverId)) {
          chatUserId = receiverId;
        } else if (allUserIds.includes(senderId)) {
          chatUserId = senderId;
        } else {
          chatUserId = receiverId;
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
  },
});

export const { setUsers, setUsersLoading, setSelectedUser, setMessagesLoading, setMessagesForUser, addMessage, updateMessage } = chatSlice.actions;

export default chatSlice.reducer

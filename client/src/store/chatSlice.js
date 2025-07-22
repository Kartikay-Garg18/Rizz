import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  selectedUser: null,
  messagesByUser: {}, // { userId: [ messages ] }
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
      
      // Convert IDs to strings for consistent comparison
      const senderId = String(message.senderId);
      const receiverId = String(message.receiverId);
      
      // Determine which user this message belongs to in our chat structure:
      // - If we sent the message, store it under the receiver's ID
      // - If we received the message, store it under the sender's ID
      let chatUserId;
      
      // Get the ID of all users we have message history with
      const allUserIds = Object.keys(state.messagesByUser);
      
      if (allUserIds.includes(senderId)) {
        chatUserId = senderId; // Message from someone we've talked with
      } else if (allUserIds.includes(receiverId)) {
        chatUserId = receiverId; // Message to someone we've talked with
      } else {
        // No existing chat - determine who the other person is
        // Try to find the current user in state.users array
        chatUserId = senderId; // Default to sender if we can't determine
      }

      // Initialize messages array if needed
      if (!state.messagesByUser[chatUserId]) {
        state.messagesByUser[chatUserId] = [];
      }
      
      // Avoid duplicates - check by _id first, then fallback to content+timestamp
      const isDuplicate = state.messagesByUser[chatUserId].some(m => {
        // Check for exact ID match if both have IDs
        if (m._id && message._id && String(m._id) === String(message._id)) {
          return true;
        }
        
        // Check for similar content and timestamp (within 10 seconds)
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

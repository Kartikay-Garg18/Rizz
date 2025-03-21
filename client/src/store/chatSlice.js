import {createSlice} from '@reduxjs/toolkit';
import { socket } from './authSlice';

const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUsers : (state,action) => {
            state.users=action.payload;
        },
        setMessages : (state,action) =>{
            state.messages=action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        addMessage : (state,action) =>{
            state.messages.push(action.payload);
        },
        stopListeningForMessages: () => {
            socket.off('newMessage');
        }
    }
});


export const {setMessages,setSelectedUser,addMessage,stopListeningForMessages,setUsers} = chatSlice.actions;

export default chatSlice.reducer;
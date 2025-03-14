import {createSlice} from '@reduxjs/toolkit';
import { useSelector} from 'react-redux';

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
        listenForMessages: (state) => {
            if(!state.selectedUser) return;
            const socket = useSelector(state=>state.auth.socket);
            socket.on('newMessage', (message) => {
                if(message.senderId !== state.selectedUser._id) return;   
                state.messages.push(message);
            });
        },
        stopListeningForMessages: () => {
            const socket = useSelector(state=>state.auth.socket);
            socket.off('newMessage');
        }
    }
});


export const {setMessages,setSelectedUser,addMessage,listenForMessages,stopListeningForMessages,setUsers} = chatSlice.actions;

export default chatSlice.reducer;
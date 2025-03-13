import {createSlice} from '@reduxjs/toolkit';
import { useSelector} from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
}

const accessToken = Cookies.get('accessToken');
const API_URI = import.meta.env.VITE_APP_API_URI;

let userHandler;

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUsers : (state,action) => {
            state.users=action.payload;
        },
        getMessages: async (state, action) => {
            try {
                const response = await axios.get(`${API_URI}/messages/${action.payload}`,{
                    headers: {Authorization: `Bearer ${accessToken}`}
                });
                state.messages = response.data.data.messages;
            } catch (error) {
                console.error('Error in getMessages (chatSlice): ', error.message);
            }
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        sendMessage: async (state, action) => {
            try {
                const response = await axios.post(`${API_URI}/messages/send/${state.selectedUser._id}`,action.payload,{
                    headers: {Authorization: `Bearer ${accessToken}`}
                });
                state.messages.push(response.data.data.newMessage);
            } catch (error) {
                console.error('Error in sendMessage (chatSlice): ', error.message);
            }
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


export const {getMessages,setSelectedUser,sendMessage,listenForMessages,stopListeningForMessages,setUsers} = chatSlice.actions;

export default chatSlice.reducer;
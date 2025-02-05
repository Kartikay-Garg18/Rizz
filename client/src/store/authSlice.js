import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import {io} from 'socket.io-client';
const API_URI = import.meta.env.VITE_APP_API_URI;

const initialState ={
    status: false,
    user : null,
    onlineUsers: [],
    socket: null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload;
        },

        logout: (state) => {
            state.status = false;
            state.user = null;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        },
        connectSocket: (state) => {
            if(!state.user || state.socket?.connected) return;
            const socket=io(API_URI, {query: {userId: state.user.id}});
            socket.connect();
            state.socket = socket;
            socket.on('onlineUsers', (users) => {
                state.onlineUsers = users;
            });
        },
        disconnectSocket: (state) => {
           if(state.socket?.connected) state.socket.disconnect();
        }
    }
});

export const { login, logout,connectSocket,disconnectSocket } = authSlice.actions;

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
const API_URI = import.meta.env.VITE_APP_API_URI;

const initialState = {
    status: false,
    user: null,
    onlineUsers: []
};

let socket;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.user = null;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            if (socket) {
                socket.disconnect();
                socket = null;
            }
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
});


export const connectSocket = () => (dispatch, getState) => {
    const { auth } = getState();
    if (!auth.user || socket) return;

    socket = io(API_URI, { query: { userId: auth.user.id } });
    socket.connect();
    
    socket.on('onlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
    });

};

export const { login, logout, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;

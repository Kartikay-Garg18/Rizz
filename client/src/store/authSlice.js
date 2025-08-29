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

export const connectSocket = (userId) => (dispatch, getState) => {
    const { auth } = getState();
    const userIdToUse = userId || auth.user?._id || auth.user?.id;
    
    if (!userIdToUse || userIdToUse === 'undefined' || socket) {
        return;
    }

    socket = io(API_URI, {
        query: { userId: userIdToUse },
        transports: ['polling', 'websocket'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        timeout: 20000,
        autoConnect: false
    });
    
    window.socket = socket;

    socket.on('connect', () => {
        console.log('Socket connected');
    });

    socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
            socket.connect();
        }
    });

    socket.on('connect_error', () => {
        console.error('Socket connection error');
    });

    socket.on('onlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
    });

    socket.connect();
    
    socket.on('connect', () => {
        socket.emit('getOnlineUsers');
    });
};

export const disconnectSocket = () => (dispatch) => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
    dispatch(setOnlineUsers([]));
};

export const getSocket = () => socket;

export const { login, logout, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;

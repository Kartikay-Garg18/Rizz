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
    // If userId is passed directly, use it; otherwise get from state
    const { auth } = getState();
    const userIdToUse = userId || auth.user?._id;
    
    if (!userIdToUse || userIdToUse === 'undefined' || socket) {
        console.log('Cannot connect socket - invalid user ID:', userIdToUse);
        return;
    }

    console.log('Connecting socket with userId:', userIdToUse);

    socket = io(API_URI, {
        query: { userId: userIdToUse }, // Use the verified user ID
        transports: ['polling', 'websocket'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        timeout: 20000,
        autoConnect: false
    });

    socket.on('connect', () => {
        console.log('Connected to server:', socket.id);
        console.log('User ID sent:', userIdToUse);
    });

    socket.on('disconnect', (reason) => {
        console.log('Disconnected:', reason);
        if (reason === 'io server disconnect') {
            socket.connect();
        }
    });

    socket.on('connect_error', (error) => {
        console.log('Connection error:', error);
    });

    socket.on('onlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
    });

    socket.connect();
};

export const disconnectSocket = () => (dispatch) => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
    dispatch(setOnlineUsers([]));
};

export { socket };
export const { login, logout, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;

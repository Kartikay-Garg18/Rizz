// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from 'js-cookie'
// import {io} from 'socket.io-client';
// const API_URI = import.meta.env.VITE_APP_API_URI;

// const initialState ={
//     status: false,
//     user : null,
//     // onlineUsers: [],
//     socket: null
// }
// let state={
//     onlineUsers:[]
// }

// const authSlice = createSlice({
//     name : 'auth',
//     initialState,
//     reducers : {
//         login: (state, action) => {
//             state.status = true;
//             state.user = action.payload;
//         },

//         logout: (state) => {
//             state.status = false;
//             state.user = null;
//             Cookies.remove('accessToken');
//             Cookies.remove('refreshToken');
//         },
//         connectSocket: (state) => {
//             if(!state.user || state.socket?.connected) return;
//             const socket= io(API_URI, {query: {userId: state.user.id}});
//             // console.log("Before connecting Socket (connectSocket)",socket);
//             socket.connect();
//             // console.log("Current Socket ID (connectSocket)",socket.id);
//             state.socket = socket.id;
//             console.log("After connect Socket",state.socket,state.user,state.onlineUsers);
//             // let handler = {
//             //     get:function(target,prop,receiver){
//             //         return Reflect.get(...arguments);
//             //     },
//             //     set:function(target,prop,value){
//             //         return Reflect.set(...arguments);
//             //     }
//             // };
//             // let{proxy,revoke}=Proxy.revocable(state,handler);
//             socket.on('onlineUsers', (users) => {
            
//                     console.log("Users from callback",users);
//                 state.onlineUsers = users;
//                     console.log("Online Users",state.onlineUsers);
                    
               
//             });
    
//         },
//         disconnectSocket: (state) => {
//            if(state.socket?.connected) state.socket.disconnect();
//         }
//     }
// });

// export const { login, logout,connectSocket,disconnectSocket } = authSlice.actions;

// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
const API_URI = import.meta.env.VITE_APP_API_URI;

const initialState = {
    status: false,
    user: null,
    onlineUsers: []
};

// Variable to store the socket instance
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
            // Disconnect the socket when logging out
            if (socket) {
                socket.disconnect();
                socket = null;
            }
        },
        setOnlineUsers: (state, action) => {
            // console.log("Users (action payload) in setOnlineUsers",action.payload);
            state.onlineUsers = action.payload;
            // console.log("Online users in state",state.onlineUsers);
        }
    }
});

// Thunk to connect socket
export const connectSocket = () => (dispatch, getState) => {
    const { auth } = getState();
    if (!auth.user || socket) return;

    socket = io(API_URI, { query: { userId: auth.user.id } });
    socket.connect();
    
    socket.on('onlineUsers', (users) => {
        // console.log("Users in socket.on",users);
        dispatch(setOnlineUsers(users));
    });

    // console.log("After connect Socket", socket, auth);
};

export const { login, logout, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;

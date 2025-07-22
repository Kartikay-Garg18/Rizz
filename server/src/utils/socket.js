import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const userSocketMap = {};

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173", 
            process.env.CORS_ORIGIN || "https://your-frontend-domain.vercel.app"
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000
});

const getSocketId = (userId) => {
    return userSocketMap[userId];
};

io.on("connection", (socket) => {
    const user = socket.handshake.query.userId;
    
    if (user && user !== 'undefined') {
        // Store the socket ID for this user ID
        userSocketMap[user] = socket.id;
        
        // Store a normalized version without ObjectId prefix if it exists
        if (user.includes('new ObjectId')) {
            const cleanId = user.replace(/^ObjectId\(['"](.+)['"]\)$/, '$1');
            userSocketMap[cleanId] = socket.id;
        }
        
        io.emit("onlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
        if (user && user !== 'undefined') {
            delete userSocketMap[user];
            // Add a small delay before broadcasting updated online users
            // This helps prevent reconnection issues from affecting online status
            setTimeout(() => {
                io.emit("onlineUsers", Object.keys(userSocketMap));
            }, 1000);
        }
    });
    
    // Handle manual requests for online users list
    socket.on("getOnlineUsers", () => {
        socket.emit("onlineUsers", Object.keys(userSocketMap));
    });
    
    socket.on("error", () => {
        // Handle socket errors silently
    });
});

export { io, app, server, getSocketId, userSocketMap };
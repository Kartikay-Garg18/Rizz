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
    console.log("New client connected:", socket.id);
    console.log("Full handshake query:", socket.handshake.query); // Debug log
    
    const user = socket.handshake.query.userId;
    console.log("User ID from handshake:", user);
    
    if (user && user !== 'undefined') {
        userSocketMap[user] = socket.id;
        console.log(`User ${user} mapped to socket ${socket.id}`);
        io.emit("onlineUsers", Object.keys(userSocketMap));
    } else {
        console.log("No valid user ID provided in handshake");
    }

    socket.on("disconnect", (reason) => {
        console.log(`Socket ${socket.id} disconnected: ${reason}`);
        if (user && user !== 'undefined') {
            delete userSocketMap[user];
            console.log(`User ${user} removed from online users`);
            io.emit("onlineUsers", Object.keys(userSocketMap));
        }
    });
    
    socket.on("error", (error) => {
        console.log("Socket error:", error);
    });
});

export { io, app, server, getSocketId };
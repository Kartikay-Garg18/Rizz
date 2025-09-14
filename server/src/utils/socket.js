import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const userSocketMap = {};

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
            "http://localhost:5173",
            "https://rizz-frontend-two.vercel.app"
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
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
        userSocketMap[user] = socket.id;
        
        if (user.includes('new ObjectId')) {
            const cleanId = user.replace(/^ObjectId\(['"](.+)['"]\)$/, '$1');
            userSocketMap[cleanId] = socket.id;
        }
        
        io.emit("onlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
        if (user && user !== 'undefined') {
            delete userSocketMap[user];
            setTimeout(() => {
                io.emit("onlineUsers", Object.keys(userSocketMap));
            }, 1000);
        }
    });
    
    socket.on("getOnlineUsers", () => {
        socket.emit("onlineUsers", Object.keys(userSocketMap));
    });
    
    socket.on("error", () => {
    });
});

export { io, app, server, getSocketId, userSocketMap };
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import session from 'express-session';
import userRouter from '../routes/user.routes.js';
import messageRouter from '../routes/message.routes.js';

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
        "http://localhost:5173",
        "https://rizz-frontend-two.vercel.app"
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

app.set('trust proxy', 1);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    }
}));

app.use('/auth', userRouter);
app.use('/messages', messageRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Chat Application API');
});

const server = http.createServer(app);
const userSocketMap = {};

const io = new Server(server, {
    cors: corsOptions,
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
});

export { io, app, server, getSocketId, userSocketMap };
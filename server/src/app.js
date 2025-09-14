import express from "express";
import session from 'express-session'
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import cors from 'cors'
import {app} from './utils/socket.js'

const corsOptions = {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
        "http://localhost:5173",
        "https://rizz-frontend-two.vercel.app"
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('public'))

app.set('trust proxy', 1)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use('/auth', userRouter);
app.use('/messages', messageRouter);


app.get('/', (req, res) => {
    res.send('Welcome to the Chat Application API');
});

export default app;
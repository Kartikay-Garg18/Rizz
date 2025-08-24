import express from "express";
import session from 'express-session'
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import cors from 'cors'
import {app} from './utils/socket.js'

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use('/auth', userRouter);
app.use('/messages', messageRouter);

app.get('/loaderio-6584518794ee292037d0ffb2140a0594', (req, res) => {
    res.send('loaderio-6584518794ee292037d0ffb2140a0594');
})

app.get('/', (req, res) => {
    res.send('Welcome to the Chat Application API');
});

export default app;
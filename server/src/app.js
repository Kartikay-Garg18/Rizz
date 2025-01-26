import express from "express";
import cookieParser from 'cookie-parser'
import session from 'express-session'
import userRouter from './routes/user.routes.js'
import cors from 'cors'
import {app} from './utils/socket.js'

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

// app.use(cookieParser());

app.use('/auth', userRouter);

export default app;
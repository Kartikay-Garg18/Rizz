import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();
const server=http.createServer(app);
const userSocketMap={}

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
        // credentials:true,
        // methods:["GET","POST","PUT","DELETE","PATCH"]
    }
})

const getSocketId = (userId) =>{
    return userSocketMap[userId];
}

io.on("connection",(socket)=>{
    const user = socket.handshake.query.userId;
    if(user) userSocketMap[user] = socket.id;
    io.emit("onlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        delete userSocketMap[user];
        io.emit("onlineUsers",Object.keys(userSocketMap));   
    })
})

export {io,app,server,getSocketId};
import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();
const server=http.createServer(app);
const userSocketMap={}

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})

const getSocketId = (userId) =>{
    return userSocketMap[userId];
}

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);
    const user = socket.handshake.query.userId;
    if(user) userSocketMap[user] = socket.id;
    console.log(userSocketMap);
    io.emit("onlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id); 
        delete userSocketMap[user];
        io.emit("onlineUsers",Object.keys(userSocketMap));   
    })
})

export {io,app,server,getSocketId};
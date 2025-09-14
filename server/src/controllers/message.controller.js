import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import {upload} from "../utils/cloudinary.js";
import {getSocketId, io} from "../utils/socket.js";

const getUsersForSidebar=asyncHandler(async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
            .select("-password -refreshToken -googleId")
            .lean();
        
        res.status(200).json(new ApiResponse(200,{filteredUsers},"Users fetched successfully"));
      } catch (error) {
        res.status(500).json(new ApiResponse(500,"","Internal server error"));
      }
});

const getMessages=asyncHandler(async (req,res)=>{
    try {
    const { id: friendId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: friendId },
        { senderId: friendId, receiverId: myId },
      ],
    });

    res.status(200).json(new ApiResponse(200,{messages},"Messages retrieved successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500,'',"Internal server error" ));
  }
});

const uploadImages = async (images) => {
      let imageUrls=[];
      if (images.length !==0) {
        await images.map(async (image)=>{
          let uploadResponse = upload(image.path);
          imageUrls.push(uploadResponse);
        })
      }

      return Promise.allSettled(imageUrls).then((results) => {
        return results.map((result) => {
          if (result.status === "fulfilled") {
            return result.value.secure_url;
          }
        });
      });
}

const sendMessage=asyncHandler(async (req,res)=>{
    try {
        const { text } = req.body;
        const images = req.files;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        const imageUrls = await uploadImages(images);
        const newMessage = new Message({
          senderId,
          receiverId,
          text,
          images: imageUrls,
        });
    
        await newMessage.save();
        
        const receiverSocketId = getSocketId(receiverId);
        
        const receiverIdStr = receiverId.toString();
        const senderIdStr = senderId.toString();
        
        const messageToSend = {
          ...newMessage.toObject(),
          senderId: senderIdStr,
          receiverId: receiverIdStr
        };
        
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", messageToSend);
        }
        
    
        res.status(201).json(new ApiResponse(201,{newMessage},"Message sent successfully"));
      } catch (error) {
        res.status(500).json(new ApiResponse(500,'',"Internal server error"));
      }
});

export {getUsersForSidebar,getMessages,sendMessage}
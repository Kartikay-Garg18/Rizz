import axios from 'axios'
import Cookies from 'js-cookie';
import { socket } from '../store/authSlice';

const API_URI = import.meta.env.VITE_APP_API_URI;
const accessToken = Cookies.get('accessToken');

const getUsers = async () => {
    try {
        const users = await axios.get(`${API_URI}/messages/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return users.data.data.filteredUsers;
    } catch (error) {
        console.error('Error in getUsers (services -> chat): ', error.message);
    }
}

const getMessages = async (receiverId) => {
    try {
        const response = await axios.get(`${API_URI}/messages/${receiverId}`,{
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        return response.data.data.messages;
    } catch (error) {
        console.error('Error in getMessages (services -> chat): ', error.message);
    }
}

const sendMessage= async (id,message) => {
    try {
        const formData = new FormData();
        formData.append('text', message.text);

        // Append each image file to the FormData
        if (message.images && message.images.length > 0) {
            message.images.forEach((image, index) => {
                formData.append('images', image); // 'images' must match the field name expected by multer
            });
        }
        
        const response = await axios.post(`${API_URI}/messages/send/${id}`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data.newMessage;
    } catch (error) {
        console.error('Error in sendMessage (services -> chat): ', error.message);
    }
}

const listenForMessages = (selectedUser) => {
    if(!selectedUser) return;
    socket.on('newMessage', (message) => {
        if(String(message.senderId) !== String(selectedUser._id)) return;   
        return message;
    });
}

export {getUsers,getMessages,sendMessage,listenForMessages};
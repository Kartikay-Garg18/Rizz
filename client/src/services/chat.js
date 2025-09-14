import axios from 'axios';
import Cookies from 'js-cookie';
import { setUsers, setUsersLoading } from '../store/chatSlice';

const API_URI = import.meta.env.VITE_APP_API_URI;

export const getUsers = async (dispatch) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    dispatch(setUsers([]));
    return;
  }
  
  dispatch(setUsersLoading(true));
  
  try {
    const response = await axios.get(`${API_URI}/messages/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.data && response.data.data && response.data.data.filteredUsers) {
      dispatch(setUsers(response.data.data.filteredUsers));
    } else {
      dispatch(setUsers([]));
    }
  } catch (error) {
    dispatch(setUsers([]));
  }
};

export const getMessages = async (userId) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    return [];
  }
  try {
    const response = await axios.get(`${API_URI}/messages/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data.messages;
  } catch (error) {
    return [];
  }
};

export const sendMessage = async (receiverId, message) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) {
    throw new Error('No access token');
  }
  try {
    const formData = new FormData()
    formData.append('text', message.text)
    if (message.images && message.images.length > 0) {
      message.images.forEach((img) => formData.append('images', img))
    }

    const response = await axios.post(
      `${API_URI}/messages/send/${receiverId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data.data.newMessage
  } catch (e) {
    throw e
  }
}

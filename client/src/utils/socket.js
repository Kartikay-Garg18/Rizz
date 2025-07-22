import { io } from 'socket.io-client';

const API_URI = import.meta.env.VITE_APP_API_URI;

let socket = null;

export const getSocket = (userId) => {
  if (!socket) {
    socket = io(API_URI, {
      query: { userId },
      transports: ['websocket', 'polling'],
      autoConnect: false,
    });
  }
  return socket;
};

export const connectSocket = (userId) => {
  const s = getSocket(userId);
  if (!s.connected) s.connect();
  return s;
};

export const disconnectSocket = () => {
  if (socket && socket.connected) socket.disconnect();
};

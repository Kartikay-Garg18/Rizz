import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/authSlice';
import Login from './components/Login';
import Signup from './components/Signup.jsx';
import Forgot from './components/Forgot.jsx';
import Chat from './components/Chat.jsx';
import { getUser} from './services/auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const checkUser = useSelector((state) => state.auth.status);

  useEffect(() => {
    getUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));

        }
      })
      .catch((error) => {
        console.error('Failed to fetch user:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={checkUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!checkUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!checkUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/forgot" element={!checkUser ? <Forgot /> : <Navigate to="/" />} />
        <Route path="/chat" element={checkUser ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
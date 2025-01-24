import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { getUser } from './services/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    getUser().then(user => {
      if(user){
        dispatch(login(user));
      }
    });
  }, []);

  

  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth.status);
  const authData = useSelector(state => state.auth.user);
    const logoutHandle = () => {
        dispatch(logout());
        navigate('/login');
    }

  return (
    <div>
        {authStatus ? <>
                      <div>Hello {authData?.username}</div>    
                      <button onClick={logoutHandle}>Logout</button></> : <>Need login</> }
    </div>
  )
}

export default Home
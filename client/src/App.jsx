import {useEffect} from 'react';
import { getUsers } from './services/chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Forgot from './components/Forgot';
import Chat from './components/Chat';
import Setting from './components/Setting';
import Calling from './components/Calling';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const checkUser = useSelector((state) => state.auth.status);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      getUsers(dispatch);
    }
  }, [user, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!checkUser ? <Login /> : <Navigate to="/chat" />}
        />
        <Route
          path="/signup"
          element={!checkUser ? <Signup /> : <Navigate to="/chat" />}
        />
        <Route
          path="/forgot"
          element={!checkUser ? <Forgot /> : <Navigate to="/chat" />}
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/setting"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/calling"
          element={
            <PrivateRoute>
              <Calling />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

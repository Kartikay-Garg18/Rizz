import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/auth';
import { login } from '../store/authSlice';
import Loading from './Loading/Loading';

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const [checking, setChecking] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && !checking) {
      setChecking(true);
      getUser()
        .then(data => {
          if (data) dispatch(login(data));
        })
        .finally(() => setChecking(false));
    }
  }, [user, checking, dispatch]);

  if (checking) return <Loading />;
  if (!user) return <Navigate to="/login" />;
  return children;
}

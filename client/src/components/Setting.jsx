import React from 'react'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'

function Setting() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div>
        <button className='mx-2 p-2 text-xl btn btn-floating bg-gray-500 text-white' onClick={handleLogout}>
            Logout
        </button>
    </div>
  )
}

export default Setting
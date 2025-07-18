import React from 'react'
import { disconnectSocket, logout } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './Chat/Sidebar'
import ProfilePhoto from '../assets/ProfilePhoto.jpg'

function Setting() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(disconnectSocket());
    dispatch(logout());
  }

  const [profilePhoto, setProfilePhoto] = React.useState(ProfilePhoto);

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex'>
      <Sidebar></Sidebar>

      <div className='h-screen w-full flex text-base justify-center text-black items-center'>
        <form action="">
          <div className='w-[30vw] border border-green-500 bg-white rounded-xl'>
            <h1 className='pt-2 text-center'>PROFILE</h1>
            <div className="w-full border-t border-gray-300 my-4"></div>
            <div className='px-4 my-2 flex justify-center items-center'>
              <label htmlFor="clickProfile">
                <img src={profilePhoto} alt="Profile Image" className='size-20 rounded-full cursor-pointer border border-gray-300' />
              </label>
              <input id='clickProfile' type='file' className='hidden' onChange={handleProfilePhotoChange} />
            </div >

            <div className='px-4 relative group'>
              <h1 className='inline-block'>{user.username}</h1>
              <button
                className="absolute right-0 top-0 hidden group-hover:inline-block px-2 py-1 mx-4 bg-blue-500 rounded-lg text-white text-sm border border-blue-500"
                onClick={() => alert('Edit Username')}
              >
                Edit
              </button>
            </div>

            <div className="w-full border-t border-gray-300 my-4"></div>

            <div className='px-4 flex items-center gap-4 relative group'>
              <span >About</span>
              <textarea className='w-[20vw] bg-white border rounded-xl px-2' placeholder='write something about yourself'>
              </textarea>
              <button
                className="absolute right-0 top-0 hidden group-hover:inline-block px-2 py-1 mx-4 bg-blue-500 rounded-lg text-white text-sm border border-blue-500"
                onClick={() => alert('Edit About')}
              >
                Edit
              </button>
            </div>

            <div className="w-full border-t border-gray-300 my-4"></div>
            <div className='px-4 flex items-center gap-4'>
              <span>Theme</span>
              <select
                className='bg-white border rounded-xl p-2'
                onChange={(e) => {
                  document.documentElement.setAttribute('data-theme', e.target.value);
                }}
              >
                <option value="dark">Dark</option>
                <option value="retro">Light</option>
              </select>
            </div>

            <div className="w-full border-t border-gray-300 my-4"></div>

            <button className='mx-3 mt-4 mb-2 px-2 text-lg btn btn-floating bg-gray-400 text-white' onClick={handleLogout}>
              Logout
            </button>
            <button type='submit' className='mx-3 mt-4 mb-2 px-2 text-lg btn btn-floating bg-gray-400 text-white'>
              Save Details
            </button>


          </div>
        </form>
      </div>
    </div>
  )
}

export default Setting
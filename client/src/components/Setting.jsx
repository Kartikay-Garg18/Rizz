import React, { useState } from 'react'
import { disconnectSocket, logout, updateUser } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './Chat/Sidebar'
import ProfilePhoto from '../assets/ProfilePhoto.jpg'
import { updateProfile } from '../services/auth'

function Setting() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePictureUrl || ProfilePhoto);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState({
    username: false,
    about: false
  });
  const [formData, setFormData] = useState({
    username: user?.username || '',
    about: user?.about || ''
  });
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [isLoading, setIsLoading] = useState({
    username: false,
    about: false,
    photo: false
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(disconnectSocket());
    dispatch(logout());
  }

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
        setShowPhotoDialog(false);
      };
      reader.readAsDataURL(file);
      
      setProfilePhotoFile(file);
      
      setIsLoading(prev => ({ ...prev, photo: true }));
      try {
        const updatedUser = await updateProfile({ profilePicture: file });
        dispatch(updateUser(updatedUser));
      } catch (error) {
        setProfilePhoto(user?.profilePictureUrl || ProfilePhoto);
      } finally {
        setIsLoading(prev => ({ ...prev, photo: false }));
      }
    }
  };

  const handleChangePhotoClick = () => {
    setShowPhotoDialog(true);
  };

  const handlePhotoClick = () => {
    setShowPhotoPopup(true);
  };

  const handleFileInputClick = () => {
    document.getElementById('clickProfile').click();
    setShowPhotoDialog(false);
  };

  const handleEdit = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async (field) => {
    setIsLoading(prev => ({ ...prev, [field]: true }));
    
    try {
      const updateData = {};
      
      if (field === 'username') {
        updateData.username = formData.username;
      } else if (field === 'about') {
        updateData.about = formData.about;
      }
      
      const updatedUser = await updateProfile(updateData);
      
      dispatch(updateUser(updatedUser));
      
      setIsEditing(prev => ({ ...prev, [field]: false }));
      
    } catch (error) {
      if (field === 'username') {
        setFormData(prev => ({ ...prev, username: user?.username || '' }));
      } else if (field === 'about') {
        setFormData(prev => ({ ...prev, about: user?.about || '' }));
      }
    } finally {
      setIsLoading(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="flex min-h-screen h-screen w-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-pink-700 overflow-hidden">
      <Sidebar isMobile={isMobile} showInMobile={true} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className={`flex-1 overflow-y-auto p-4 md:p-8 ${isMobile ? 'pb-24' : ''}`}>
          <div className="w-full max-w-2xl mx-auto">
            
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Settings</h1>
              <p className="text-purple-200">Customize your experience</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden mb-4">
              
              <div className="p-4 md:p-6 border-b border-white/10">
                <h2 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </h2>
                
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-4">
                  <div className="relative flex-shrink-0 mx-auto md:mx-0">
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white/20 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={handlePhotoClick}
                    />
                    <input 
                      id="clickProfile" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleProfilePhotoChange} 
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{user?.username}</h3>
                    <p className="text-purple-200 text-sm md:text-base">{user?.email}</p>
                    <button 
                      className="mt-2 px-3 py-1 md:px-4 md:py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-xs md:text-sm flex items-center justify-center"
                      onClick={handleChangePhotoClick}
                      disabled={isLoading.photo}
                    >
                      {isLoading.photo ? (
                        <>
                          <svg className="w-3 h-3 md:w-4 md:h-4 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        'Change Photo'
                      )}
                    </button>
                  </div>
                </div>

                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-200 mb-2">Username</label>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    {isEditing.username ? (
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className="flex-1 px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                        placeholder="Enter username"
                      />
                    ) : (
                      <div className="flex-1 px-3 py-2 md:px-4 md:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm md:text-base">
                        {formData.username}
                      </div>
                    )}
                    <button
                      onClick={() => isEditing.username ? handleSave('username') : handleEdit('username')}
                      disabled={isLoading.username}
                      className="px-3 py-2 md:px-4 md:py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex-shrink-0 flex items-center justify-center"
                    >
                      {isLoading.username ? (
                        <svg className="w-4 h-4 md:w-5 md:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : isEditing.username ? (
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-200 mb-2">About</label>
                  <div className="flex items-start space-x-2 md:space-x-3">
                    {isEditing.about ? (
                      <textarea
                        value={formData.about}
                        onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
                        className="flex-1 px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm md:text-base"
                        placeholder="Tell us about yourself..."
                        rows="3"
                      />
                    ) : (
                      <div className="flex-1 px-3 py-2 md:px-4 md:py-3 bg-white/5 border border-white/10 rounded-lg text-white min-h-[72px] md:min-h-[84px] text-sm md:text-base">
                        {formData.about || 'No description added yet...'}
                      </div>
                    )}
                    <button
                      onClick={() => isEditing.about ? handleSave('about') : handleEdit('about')}
                      disabled={isLoading.about}
                      className="px-3 py-2 md:px-4 md:py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex-shrink-0 flex items-center justify-center"
                    >
                      {isLoading.about ? (
                        <svg className="w-4 h-4 md:w-5 md:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : isEditing.about ? (
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              
              <div className="p-4 md:p-6 border-b border-white/10">
                <h2 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Preferences
                </h2>
                
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-purple-200 mb-3">Theme</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`p-3 md:p-4 rounded-lg border-2 transition-all ${
                        theme === 'dark' 
                          ? 'border-purple-500 bg-purple-600/30' 
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-900 rounded-full border-2 border-gray-700 flex-shrink-0"></div>
                        <div className="text-left">
                          <div className="text-white font-medium text-sm md:text-base">Dark Theme</div>
                          <div className="text-purple-200 text-xs md:text-sm">Easy on the eyes</div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange('retro')}
                      className={`p-3 md:p-4 rounded-lg border-2 transition-all ${
                        theme === 'retro' 
                          ? 'border-purple-500 bg-purple-600/30' 
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-100 rounded-full border-2 border-yellow-300 flex-shrink-0"></div>
                        <div className="text-left">
                          <div className="text-white font-medium text-sm md:text-base">Light Theme</div>
                          <div className="text-purple-200 text-xs md:text-sm">Bright and clean</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-base md:text-lg font-medium text-white">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm md:text-base">Message notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 md:w-11 md:h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm md:text-base">Sound alerts</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 md:w-11 md:h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <button 
                    className="flex-1 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg text-sm md:text-base"
                    onClick={() => {/* Save all settings */}}
                  >
                    Save Changes
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 md:px-6 md:py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm md:text-base"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      {isMobile && <Sidebar isMobile={true} />}

      
      {showPhotoDialog && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPhotoDialog(false)}
        >
          <div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Change Profile Photo</h3>
              <p className="text-purple-200 mb-6">Choose how you'd like to update your profile photo</p>
              
              <div className="space-y-3">
                <button
                  onClick={handleFileInputClick}
                  className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Upload from Device</span>
                </button>
                
                <button
                  onClick={() => {
                    setProfilePhoto(ProfilePhoto);
                    setShowPhotoDialog(false);
                  }}
                  className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Use Default Photo</span>
                </button>
                
                <button
                  onClick={() => setShowPhotoDialog(false)}
                  className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {showPhotoPopup && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPhotoPopup(false)}
        >
          <div className="relative max-w-3xl max-h-[90vh] w-full h-full flex items-center justify-center">
            
            <button
              onClick={() => setShowPhotoPopup(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            
            <img
              src={profilePhoto}
              alt="Profile Photo"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            
            
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <h4 className="text-white font-medium">{user?.username}'s Profile Photo</h4>
              <p className="text-gray-300 text-sm">Click outside to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Setting
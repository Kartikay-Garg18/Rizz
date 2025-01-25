import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login as authLogin } from '../../store/authSlice'
import {useForm} from 'react-hook-form'
import { login } from '../../services/auth'
import bg from '../../assets/wallpaper.jpeg'
import Email from '../../assets/Email.svg'
import Lock from '../../assets/Lock.svg'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleLogin from '../GoogleLogin'

const LoginForm = () => {
  const gradient = true;
  const blur = true;
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = async (data) => {
    try{
      const user = await login(data);
      // console.log(user);
      if(!user){
        throw new Error('Login failed');
      }
      dispatch(authLogin(user));
      navigate('/');
    } catch(e){
      // console.log(e);
    }
  }

  return (
    <div className='pl-16 flex justify-start items-center w-screen h-screen bg-opacity-60' style={{ backgroundImage: `url(${bg})`, backgroundSize: '130vw 120vh', backgroundPosition: 'center'}}>
    <form method="POST" 
    className='w-[25%] border bg-green-300 flex flex-col gap-4 justify-center items-center p-7 rounded-xl shadow-xl bg-transparent backdrop-blur-sm m-11'
    onSubmit={handleSubmit(loginUser)}
    >
      
      <div className="flex justify-between gap-2 items-center w-[80%]">
                  <img src={Email} alt="Email" className='w-6 opacity-70 absolute invert'/>
                  <input type="email" name="email" id="email" placeholder='Email' {...register('email', { required: true })}
                  className='w-full pl-8 border-opacity-40 py-1 border-b bg-transparent border-white text-white focus:border-b focus: outline-none placeholder-white'/>
      
                </div>
      
      <div className="flex justify-between gap-2 items-center w-[80%]">
                  <img src={Lock} alt="Password" className='w-6 opacity-70 absolute invert'/>
                  <input type="password" name="password" id="password" placeholder='Password' {...register('password', { required: true })}
                  className='w-full pl-8 border-opacity-40 py-1 border-b bg-transparent border-white text-white focus:border-b focus: outline-none placeholder-white'/>
      
                </div>

      <button type="submit"
      className='border px-4 py-2 bg-transparent mt-5 text-white font-semibold w-[80%] rounded-3xl'>Sign In</button>

      <span className='cursor-pointer font-bold' onClick={() => {navigate('/forgot')}}>Forgot Password?</span>

      <div className='flex justify-center items-center font-sans gap-2'>
        <p>Don&#8217;t have an account?</p>
        <span className='cursor-pointer font-bold' onClick={() => {navigate('/signup')}}>Sign Up here</span>
        </div>
        <div className='flex justify-center items-center font-pop gap-2'>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin />
            </GoogleOAuthProvider>
          </div>
    </form>
        </div>
    
  )
}

export default LoginForm
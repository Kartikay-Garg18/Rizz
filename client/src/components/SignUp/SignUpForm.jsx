import React from 'react'
import User from '../../assets/User.svg'
import Email from '../../assets/Email.svg'
import Lock from '../../assets/Lock.svg'
import Confirm from '../../assets/Confirm.svg'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createAccount } from '../../services/auth'
import { toast, Bounce } from 'react-toastify'
import GoogleLogin from '../Login/GoogleLogin'
import { GoogleOAuthProvider } from '@react-oauth/google'

const SignUpForm = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();

  const createUser = async (data) => {
    try {
      const {username, email, password, confirmPassword} = data
      if(password !== confirmPassword){
        toast.error('Passwords do not match', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }

      await createAccount({username, email, password});

      navigate('/login');
      
    } catch (error) {
      // console.log(error)
    }
  }


  return (
    <>
        <form method="POST"
        onSubmit={handleSubmit(createUser)}
         className='w-[75%] bg-white flex flex-col gap-4 justify-between items-center pt-10 rounded-xl shadow-2xl h-fit pb-8 backdrop-blur-lg'>
          <div className="flex justify-between w-[80%] gap-2 items-center">
            <img src={User} alt="User" className='w-6 absolute'/>
            <input type="text" name="username" id="username" placeholder='Username' {...register('username', { required: true })}
            className='pl-8 border-opacity-40 py-1 border-b w-full bg-transparent border-gray-600 text-slate-950 focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[80%] gap-2 items-center">
            <img src={Email} alt="Email" className='w-6 absolute'/>
            <input type="email" name="email" id="email" placeholder='Email' {...register('email', { required: true })}
            className='pl-8 border-opacity-40 py-1 border-b w-full bg-transparent border-gray-600 text-slate-950 focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[80%] gap-2 items-center">
            <img src={Lock} alt="Password" className='w-6 absolute'/>
            <input type="password" name="password" id="password" placeholder='Password' {...register('password', { required: true })}
            className='pl-8 border-opacity-40 py-1 border-b w-full bg-transparent border-gray-600 text-slate-950 focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[80%] gap-2 items-center">
            <img src={Confirm} alt="Password" className='w-6 absolute'/>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' {...register('confirmPassword', { required: true })}
            className='pl-8 border-opacity-40 py-1 border-b w-full bg-transparent border-gray-600 text-slate-950 focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <button type="submit"
          className='bg-slate-950 text-white px-4 py-2 rounded-lg w-[85%] font-semibold text-lg font-pop mt-3'>Sign Up</button>

          <div className='flex justify-center items-center font-pop gap-2 py-1'>
            <p>Already have an account?</p>
            <span className='cursor-pointer font-pop font-semibold' onClick={() => navigate('/login')}>Sign In</span>
          </div>

          <div className='w-[85%] text-center border-b-2 border-gray-300 leading-[0.1em] '><span className='bg-white backdrop-blur-lg px-2'>or</span></div>

          <div className='flex justify-center items-center font-pop gap-2 pt-3'>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin />
            </GoogleOAuthProvider>
          </div>
        </form>
    </>
  )
}

export default SignUpForm
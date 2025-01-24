import React from 'react'
import User from '../../assets/User.svg'
import Email from '../../assets/Email.svg'
import Lock from '../../assets/Lock.svg'
import {useForm} from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { createAccount } from '../../services/auth'
import { toast, Bounce } from 'react-toastify'

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
         className='w-[80%] bg-white flex flex-col gap-4 justify-between items-center p-7 rounded-xl shadow-2xl h-[60vh] py-12 backdrop-blur-lg bg-opacity-90'>
          <div className="flex justify-between w-[75%] gap-2 items-center">
            <img src={User} alt="User" className='w-6 opacity-70 absolute'/>
            <input type="text" name="username" id="username" placeholder='Username' {...register('username', { required: true })}
            className='pl-8 border-opacity-40 py-1 border-b w-full bg-transparent border-gray-600 text-black focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[75%] gap-2 items-center">
            <img src={Email} alt="Email" className='w-6 opacity-70 absolute'/>
            <input type="email" name="email" id="email" placeholder='Email' {...register('email', { required: true })}
            className='pl-8 border-opacity-40 py-1 border-b w-full bg-transparent border-gray-600 text-black focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[75%] gap-2 items-center">
            <img src={Lock} alt="Password" className='w-6 opacity-70 absolute'/>
            <input type="password" name="password" id="password" placeholder='Password' {...register('password', { required: true })}
            className='pl-8 border-opacity-40 py-1 border-b w-full bg-transparent border-gray-600 text-black focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[75%] gap-2 items-center">
            <img src={Lock} alt="Password" className='w-6 opacity-70 absolute'/>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' {...register('confirmPassword', { required: true })}
            className='pl-8 border-opacity-40 py-1 border-b w-full bg-transparent border-gray-600 text-black focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <button type="submit"
          className='border border-gray-600 px-4 py-2 text-black rounded-full w-[80%] font-semibold text-lg border-opacity-40 font-pop'>Sign Up</button>

          <div className='flex justify-center items-center font-pop gap-2'>
            <p>Don&#8217;t have an account?</p>
            <span className='cursor-pointer font-pop font-medium' onClick={() => setToggle(!toggle)}>Sign In</span>
          </div>
        </form>
    </>
  )
}

export default SignUpForm
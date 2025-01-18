import React from 'react'
import User from '../../assets/User.svg'
import Email from '../../assets/Email.svg'
import Lock from '../../assets/Lock.svg'

const SignUpForm = () => {

  return (
    <>
        <form method="POST" className='w-[70%] flex flex-col gap-4 justify-between items-center p-7 rounded-xl shadow-2xl h-[60vh] py-12 backdrop-blur-lg'>
          <div className="flex justify-between w-[70%] gap-2 items-center">
            <img src={User} alt="User" className='w-6 opacity-70 absolute'/>
            <input type="text" name="username" id="username" placeholder='Username'
            className='pl-8 border-opacity-40 py-1 border-b w-[90%] bg-transparent border-gray-600 text-black focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[70%] gap-2 items-center">
            <img src={Email} alt="Email" className='w-6 opacity-70 absolute'/>
            <input type="email" name="email" id="email" placeholder='Email'
            className='pl-8 border-opacity-40 py-1 border-b w-[90%] bg-transparent border-gray-600 text-black focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[70%] gap-2 items-center">
            <img src={Lock} alt="Password" className='w-6 opacity-70 absolute'/>
            <input type="password" name="password" id="password" placeholder='Password'
            className='pl-8 border-opacity-40 py-1 border-b w-[90%] bg-transparent border-gray-600 text-black focus:border-b focus: outline-none placeholder-black'/>

          </div>

          <div className="flex justify-between w-[70%] gap-2 items-center">
            <img src={Lock} alt="Password" className='w-6 opacity-70 absolute'/>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password'
            className='pl-8 border-opacity-40 py-1 border-b w-[90%] bg-transparent border-gray-600 text-black focus:border-b focus: outline-none placeholder-black'/>

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
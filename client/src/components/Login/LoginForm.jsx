import React from 'react'


const LoginForm = () => {
  return (
    
    <form method="POST" className='w-1/3 border flex flex-col gap-4 justify-center items-center p-7 rounded-xl shadow-xl'>
      
      <input type="email" name="Email" id="Email" placeholder='Email Address'
      className='border px-4 py-2 bg-gray-200 rounded-lg w-[90%]'/>
      
      <input type="password" name="Password" id="Password" placeholder='Password'
      className='border px-4 py-2 bg-gray-200 rounded-lg w-[90%]'/>

      <button type="submit"
      className='border px-4 py-2 bg-green-500 rounded-lg w-[90%] text-white font-semibold'>Sign In</button>

      <span className='cursor-pointer font-bold' onClick={() => {}}>Forgot Password?</span>

      {/* <div className='flex justify-center items-center font-sans gap-2'>
        <p>Don&#8217;t have an account?</p>
        <span className='cursor-pointer font-bold' onClick={() => settoggle(!toggle)}>Sign Up here</span>
      </div> */}
    </form>
  )
}

export default LoginForm
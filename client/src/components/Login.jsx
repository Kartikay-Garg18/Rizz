import React from 'react'
import LoginForm from './Login/LoginForm'
import { Scroller } from './Login/Scroller'

const Login = () => {

  return (
    <div 
    className='w-full bg-slate-950 flex justify-between h-[100vh] font-pop' >
      <div className='w-full absolute left-0 bottom-0 bg-black opacity-40' >
          <Scroller></Scroller>
      </div>
      
      <div>
          <LoginForm></LoginForm>
      </div>
    </div>
  )
}

export default Login;
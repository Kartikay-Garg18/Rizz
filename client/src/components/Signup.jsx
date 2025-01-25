import React from 'react'
import SignUpForm from './SignUp/SignUpForm'
import { Lamp } from './SignUp/Lamp'

const Signup = () => {

  return (
    <div className='w-full bg-slate-950 flex h-[100vh]'>
            <div className='w-[50%] justify-center items-center flex flex-col ml-16'>
                <SignUpForm></SignUpForm>
            </div>
            <div className='w-[60%]'>
                <Lamp></Lamp>
            </div>
        
    </div>
  )
}

export default Signup
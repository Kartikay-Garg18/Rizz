import React from 'react'
import SignUpForm from './SignUp/SignUpForm'
import { Lamp } from './SignUp/Lamp'
import bg from '../assets/bg.png'
import { motion } from 'framer-motion'

const Signup = () => {

  return (
    <div 
    
    className='w-full bg-slate-950 flex h-[100vh] font-pop' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}} >
            <motion.div 
            initial={{ x: '-1vw', opacity: 0.3 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100vw', opacity: 0.3 }}
            transition={{ duration: 1 }}
            className='w-[50%] justify-center items-center flex flex-col ml-16'>
                <SignUpForm></SignUpForm>
            </motion.div>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='w-[60%] select-none'>
                <Lamp></Lamp>
            </motion.div>
        
    </div>
  )
}

export default Signup
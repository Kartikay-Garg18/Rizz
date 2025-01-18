import React, { useEffect, useMemo, useState } from 'react'
import SignUpForm from './SignUp/SignUpForm'
import { motion } from 'framer-motion'

const Login = () => {
    const [idx, setIdx] = useState(0);
    const words = useMemo(() => ['Game', 'Chat', 'Vibe', 'Connection', 'Experience'], []);
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(idx === words.length-1){
                setIdx(0);
            } else{
                setIdx(idx+1);
            }
        }, 2000);
        return () => clearTimeout(timeout);
    }, [idx, words]);

  return (
    <div className='w-full bg-gradient-to-r from-lime-100 to-cyan-500 flex h-[100vh]'>
            <div className='w-[45%] justify-center items-center flex flex-col'>
                <SignUpForm></SignUpForm>
            </div>
            <div className='w-[60%]'>
                <div className='flex justify-center items-center h-full flex-col font-pop text-white'>
                    <span className='font-semibold text-4xl text-center my-2'>Redefining</span>
                    <span 
                    className=' relative flex w-full justify-center items-start overflow-hidden text-center font-bold text-9xl h-[25%]'>
                        {words.map((word, index)=>(
                            <motion.span key={index} className='absolute'
                            initial={{ opacity: 0, y: "-100" }} transition={{type: "spring", stiffness: 50}}
                            animate={idx === index ? { y: 0, opacity: 1} : { y: idx > index ? -150 : 160, opacity: 0}}
                            > {word} </motion.span>
                        ))}
                    </span>
                </div>
            </div>
        
    </div>
  )
}

export default Login
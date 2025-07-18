import React from 'react';
import { motion } from 'framer-motion';
import { SignUpForm } from './SignUp/SignUpForm';
import { Lamp } from './SignUp/Lamp';


const container = {
  animate: {
    transition: { staggerChildren: 0.18 }
  }
};

const lampVariant = {
  initial: { x: -80, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 70, damping: 16 } },
};
const formVariant = {
  initial: { x: 80, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 70, damping: 16 } },
};
const blobVariant = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 40, damping: 16, duration: 0.7 } }
};

export default function SignUpPage() {
  return (
    <motion.div
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#181153] via-[#7928ca] to-[#231557] px-4 overflow-hidden"
      variants={container}
      initial="initial"
      animate="animate"
    >
      
      <motion.div variants={blobVariant}
        className="absolute left-7 top-10 w-80 h-80 bg-[#7928ca88] opacity-30 rounded-3xl pointer-events-none z-0" />
      <motion.div variants={blobVariant}
        className="absolute right-10 bottom-2 w-80 h-80 bg-[#f94cc27c] opacity-20 rounded-3xl pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-16 w-full max-w-5xl mx-auto">
        
        <motion.div variants={lampVariant} className="flex w-full md:w-[45%]">
          <Lamp />
        </motion.div>
        
        <motion.div variants={formVariant} className="flex w-full md:w-[55%]">
          <SignUpForm />
        </motion.div>
      </div>
    </motion.div>
  );
}

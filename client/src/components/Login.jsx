import { motion } from "framer-motion";
import AnimatedWords from "./Login/AnimatedWords";
import LoginForm from "./Login/LoginForm";

const container = {
  animate: {
    transition: { staggerChildren: 0.18 }
  }
};

const animatedWordsVariant = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

const formVariant = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 16 } },
};

const blobVariant = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 30, damping: 20, duration: 1.2 } }
};

export default function Login() {
  return (
    <motion.div
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#2a1857] via-[#1e1538] to-[#3d2968] px-4 overflow-hidden font-sans"
      variants={container}
      initial="initial"
      animate="animate"
    >
      
      <motion.div 
        variants={blobVariant}
        className="absolute left-10 top-16 w-64 h-64 bg-[#6d28d988] opacity-25 rounded-3xl pointer-events-none z-0 hidden lg:block blur-2xl" 
      />
      <motion.div 
        variants={blobVariant}
        className="absolute right-12 bottom-8 w-72 h-72 bg-[#a855f788] opacity-20 rounded-3xl pointer-events-none z-0 hidden lg:block blur-xl" 
      />
      
      <motion.div
        variants={blobVariant}
        className="absolute top-[60%] left-[75%] w-32 h-32 bg-[#ec4899aa] blur-xl opacity-15 rounded-full pointer-events-none z-0 hidden lg:block"
      />

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-center gap-56 w-full max-w-6xl mx-auto">
        
        <motion.div 
          variants={animatedWordsVariant} 
          className="hidden lg:flex w-full lg:w-[45%]"
        >
          <div className="w-full flex items-center justify-center">
            <AnimatedWords
            />
          </div>
        </motion.div>
        
        <motion.div 
          variants={formVariant} 
          className="flex w-full lg:w-[50%] justify-center items-center my-12 md:my-16 lg:my-0"
        >
          <LoginForm />
        </motion.div>
      </div>
    </motion.div>
  );
}

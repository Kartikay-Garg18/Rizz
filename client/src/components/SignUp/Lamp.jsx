import React, {useState, useMemo, useEffect} from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/utils";


export function LampDemo() {
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
    (<LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1.3,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
        <div className='relative flex justify-center items-center h-80 flex-col font-pop text-white w-[100vw]'>
            <span className='font-semibold text-4xl text-center my-2'>Redefining</span>
            <span 
            className='pt-3 relative flex w-full justify-center items-start overflow-hidden text-center font-bold text-8xl h-full'>
                {words.map((word, index)=>(
                    <motion.span key={index} className='absolute'
                    initial={{ opacity: 0, y: "-100" }} transition={{type: "spring", stiffness: 50}}
                    animate={idx === index ? { y: 0, opacity: 1} : { y: idx > index ? -150 : 160, opacity: 0}}
                    > {word} </motion.span>
                ))}
            </span>
        </div>
      </motion.h1>
    </LampContainer>)
  );
}

export const LampContainer = ({
  children,
  className
}) => {
  return (
    (<div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}>
      <div
        className="relative flex w-full scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 1.3,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-gray-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]">
          <div
            className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div
            className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 1.3,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-gray-500 text-white [--conic-position:from_290deg_at_center_top]">
          <div
            className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div
            className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div
          className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-gray-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 1.3,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-gray-400 blur-2xl"></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 1.3,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-gray-400"></motion.div>

        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5 top-44">
        {children}
      </div>
    </div>)
  );
};

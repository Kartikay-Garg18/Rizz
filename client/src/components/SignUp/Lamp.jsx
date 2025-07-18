import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Game", "Chat", "Vibe", "Connection", "Experience"];

export function Lamp() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIdx((i) => (i + 1) % words.length);
    }, 1800);
    return () => clearTimeout(timeout);
  }, [idx]);

  return (
    <motion.div
      className="relative py-12 md:py-0 flex flex-col items-center md:items-start justify-center w-full"
      initial={{ y: 32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.13, type: "spring" }}
    >
      <div className="absolute inset-0 left-[-15%] top-[22%] w-96 h-60 bg-purple-700 rounded-full blur-[90px] opacity-20 pointer-events-none -z-10" />
      <span className="block text-2xl md:text-4xl font-semibold text-white mb-2 tracking-tight leading-relaxed drop-shadow-lg">
        Redefining
      </span>
      <div style={{ minHeight: '88px' }} className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="
              absolute left-0
              font-extrabold tracking-tight
              text-4xl sm:text-6xl md:text-7xl
              bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-400
              bg-clip-text text-transparent
              leading-tight
              drop-shadow-lg
              select-none
            "
          >
            {words[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
      
    </motion.div>
  );
}

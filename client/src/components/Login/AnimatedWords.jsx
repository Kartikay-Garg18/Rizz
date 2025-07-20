import React, { useEffect, useState, useRef } from "react";

const WORDS = [
  "Vibe.",
  "Chat.",
  "Connect.",
  "Explore.",
];

export default function AnimatedWords({ words = WORDS }) {
  const [idx, setIdx] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const measureRefs = useRef([]);
  const visibleRef = useRef();

  
  useEffect(() => {
    const widths = measureRefs.current.map(ref => ref?.offsetWidth || 0);
    setMaxWidth(Math.max(...widths));
  }, [words]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full select-none">
      
      <div className="absolute opacity-0 pointer-events-none">
        {words.map((w, i) =>
          <span
            key={i}
            ref={el => measureRefs.current[i] = el}
            className="text-[2.3rem] md:text-4xl lg:text-5xl xl:text-6xl font-black"
            style={{ whiteSpace: "nowrap" }}
          >{w}</span>
        )}
      </div>
      
      <span
        ref={visibleRef}
        className="block text-[2.3rem] md:text-4xl lg:text-5xl xl:text-6xl font-black text-white transition-all duration-700 min-h-[70px] relative"
        style={{ width: maxWidth ? `${maxWidth}px` : undefined, textAlign: "center" }}
      >
        <span
          key={idx}
          className="block transition-all duration-700 animate-wordFade"
        >
          {words[idx]}
        </span>
        
        <span
          className="block h-2 rounded-full bg-gradient-to-r from-[#ff02c7] to-[#8e53ff] blur-md mt-3"
          style={{ width: maxWidth ? `${maxWidth}px` : "100%" }}
        />
      </span>
    </div>
  );
}

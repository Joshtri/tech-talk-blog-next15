"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
  const spinnerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1.2,
        ease: "none",
        repeat: -1,
        transformOrigin: "center",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <div className="relative w-20 h-20">
        <div
          ref={spinnerRef}
          className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full shadow-xl"
        />
      </div>
    </div>
  );
}

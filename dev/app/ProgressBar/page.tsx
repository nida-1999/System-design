"use client";
import { useEffect, useRef, useState } from "react";

const ProgressBar = () => {
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    progressRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  useEffect(() => {
    if (counter >= 100) {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
      setCounter(100);
    }
  }, [counter]);

  return (
    <div className="m-[200px] p-4">
      <div
        className="w-[400px] h-[20px] border rounded-[10px] relative overflow-hidden"
        role="progressbar"
        aria-valuenow={counter}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-green-200 rounded-[10px] transition-all"
          style={{ width: `${Math.min(counter, 100)}%` }}
        />
        <span className="absolute inset-1 flex items-center justify-center text-xs font-medium">
          {counter}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;

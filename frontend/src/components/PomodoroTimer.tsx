"use client";

import { useEffect, useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { post } from '../utils/api' 

export default function PomodoroTimer() {
  const POMODORO_TIME = 25*60 // 25 minutes in seconds
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const progress = ((POMODORO_TIME - secondsLeft) / POMODORO_TIME) * 100

useEffect(() => {
  if (secondsLeft === 0) {
    async function sendPomodoroComplete() {
      try {
        const today = new Date();
        console.log(today)
        const dateString = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
        console.log(dateString)
        await post('/pomodoro/', { date: dateString });
      } catch (err) {
        console.error('Failed to send pomodoro completion:', err);
      }
    }
    sendPomodoroComplete();
  }
}, [secondsLeft]);


  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(POMODORO_TIME);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false)

    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, secondsLeft]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#99b6c7] p-4 rounded me-2">
      <div className="relative w-full max-w-md">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#ef4444"
              strokeWidth="8"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={283 - (progress / 100) * 283}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="transition-all duration-200 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white mb-2">
              {formatTime(secondsLeft)}
            </span>
            <p className="text-gray-300 uppercase text-sm tracking-widest">
              {isRunning ? "Focus" : "Paused"}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <button
            onClick={toggleTimer}
            className={`p-4 rounded-full shadow-lg transition-all duration-200 ${
              isRunning
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white shadow-lg transition-all duration-200"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        {secondsLeft === 0 && (
          <div className="mt-8 text-center">
            <p className="text-xl text-white font-medium animate-pulse">
              Session complete! 🎉
            </p>
            <p className="text-gray-400 mt-2">
              Take a short break before your next session
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

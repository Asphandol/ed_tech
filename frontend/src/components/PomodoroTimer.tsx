'use client'

import { useEffect, useState } from 'react'
import { Play, Pause, StopCircle, RotateCcw } from 'lucide-react'

export default function PomodoroTimer() {
  // Pomodoro settings
  const POMODORO_TIME = 25 * 60 // 25 minutes in seconds
  const SHORT_BREAK = 5 * 60 // 5 minutes
  const LONG_BREAK = 15 * 60 // 15 minutes
  const POMODOROS_BEFORE_LONG_BREAK = 4

  // Timer states
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro')
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)

  // Calculate progress for the circle animation
  const totalSeconds = mode === 'pomodoro' 
    ? POMODORO_TIME 
    : mode === 'shortBreak' 
      ? SHORT_BREAK 
      : LONG_BREAK
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100

  // Format time as MM:SS
  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60)
    const secs = s % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Reset timer to initial state
  const resetTimer = () => {
    setIsRunning(false)
    if (mode === 'pomodoro') {
      setSecondsLeft(POMODORO_TIME)
    } else if (mode === 'shortBreak') {
      setSecondsLeft(SHORT_BREAK)
    } else {
      setSecondsLeft(LONG_BREAK)
    }
  }

  // Switch between pomodoro and break modes
  const switchMode = (nextMode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false)
    setMode(nextMode)
    
    if (nextMode === 'pomodoro') {
      setSecondsLeft(POMODORO_TIME)
    } else if (nextMode === 'shortBreak') {
      setSecondsLeft(SHORT_BREAK)
    } else {
      setSecondsLeft(LONG_BREAK)
    }
  }

  // Handle timer completion
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    if (secondsLeft === 0) {
      if (mode === 'pomodoro') {
        const newCount = pomodorosCompleted + 1
        setPomodorosCompleted(newCount)
        
        if (newCount % POMODOROS_BEFORE_LONG_BREAK === 0) {
          switchMode('longBreak')
        } else {
          switchMode('shortBreak')
        }
      } else {
        switchMode('pomodoro')
      }
      // Auto-start the next session
      setIsRunning(true)
    }
  }, [secondsLeft])

  // Timer countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    } else if (secondsLeft === 0) {
      if (timer) clearInterval(timer)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isRunning, secondsLeft])

  // Get mode display text
  const getModeText = () => {
    switch (mode) {
      case 'pomodoro': return 'Focus Time'
      case 'shortBreak': return 'Short Break'
      case 'longBreak': return 'Long Break'
      default: return ''
    }
  }

  // Get circle color based on mode
  const getCircleColor = () => {
    switch (mode) {
      case 'pomodoro': return '#dc2626' // red-600 - deeper, more vibrant red
      case 'shortBreak': return '#059669' // emerald-600 - richer green
      case 'longBreak': return '#2563eb' // blue-600 - deeper blue
      default: return '#8b5cf6' // violet-500
    }
  }

  return (
    <section className="w-full mt-6 border-2">
      <div className="bg-gray-50 rounded-lg w-full flex flex-col md:flex-row justify-center items-center py-12 px-4 shadow-sm">
        <div className="relative w-56 h-56 mb-8 md:mb-0">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={getCircleColor()}
              strokeWidth="8"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={283 - (progress / 100) * 283}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="transition-all duration-200 ease-in-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-gray-800">{formatTime(secondsLeft)}</span>
            <p className="text-gray-600 font-medium">{getModeText()}</p>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'pomodoro' ? `Pomodoros: ${pomodorosCompleted}` : ''}
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:ml-10">
          <div className="flex justify-center space-x-6 mb-5">
            <button 
              onClick={() => switchMode('pomodoro')} 
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                mode === 'pomodoro' 
                  ? 'bg-red-100 text-red-700 font-medium ring-2 ring-red-600/20' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pomodoro
            </button>
            <button 
              onClick={() => switchMode('shortBreak')} 
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                mode === 'shortBreak' 
                  ? 'bg-emerald-100 text-emerald-700 font-medium ring-2 ring-emerald-600/20' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Short Break
            </button>
            <button 
              onClick={() => switchMode('longBreak')} 
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                mode === 'longBreak' 
                  ? 'bg-blue-100 text-blue-700 font-medium ring-2 ring-blue-600/20' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Long Break
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => setIsRunning((prev) => !prev)} 
              className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 active:scale-95 border-2"
            >
              {isRunning ? (
                <Pause className="text-gray-700 w-6 h-6 " />
              ) : (
                <Play className="text-gray-700 w-6 h-6 " />
              )}
            </button>
            <button 
              onClick={resetTimer} 
              className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 active:scale-95 border-2"
            >
              <RotateCcw className="text-gray-700 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
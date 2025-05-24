'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Progress from '@/components/Progress'
import PomodoroTimer from '@/components/PomodoroTimer'
import EventCalendar from '@/components/calendar/EventCalendar'

export default function Home() {
  const [progress, setProgress] = useState(30)

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar />

      <main className="flex-1 px-8 pt-10 space-y-10">

        <h1 className='text-3xl font-semibold text-zinc-800 border-b-4 pb-4'>Studing</h1>
        
        <section>
          <h1 className="text-2xl font-semibold text-zinc-800 mb-4">Progress</h1>
          <Progress />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">Focus Timer</h2>
          <PomodoroTimer />
        </section>
      </main>

      <aside className="w-[500px] min-w-[300px] p-6 border-l border-gray-200 bg-white shadow-sm">
        <div className="mb-6 justify-start">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">Calendar</h2>
          <EventCalendar />
        </div>
      </aside>
    </div>
  )
}

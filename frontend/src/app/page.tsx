"use client"  

import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Progress from '@/components/Progress';
import PomodoroTimer from '@/components/PomodoroTimer';
import EventCalendar from '@/components/calendar/EventCalendar';


export default function Home() {
  const [progress, setProgress] = useState(30);
  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Sidebar/>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">My Courses</h1>
        </header>

        <Progress/>

        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Timer</h1>
        </header>

        <PomodoroTimer/>

      </main>

      <aside className="w-72 p-6 space-y-6">
        <EventCalendar/>

      </aside>
    </div>
  );
}

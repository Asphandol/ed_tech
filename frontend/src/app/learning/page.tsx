"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Progress from "@/components/Progress";
import PomodoroTimer from "@/components/PomodoroTimer";
import EventCalendar from "@/components/calendar/EventCalendar";

export default function Home() {
  const [progress, setProgress] = useState(30);

  return (
    <>
      <main className="flex-1 px-8 pt-10 space-y-10">
        <section>
          <h1 className="text-2xl font-semibold text-zinc-800 mb-4">
            Progress
          </h1>
          <Progress />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">
            Focus Timer
          </h2>
          <div className="flex flex-wrap">
            <div className="w-1/2">
              <PomodoroTimer />
            </div>
            <div className="w-1/2">
              <div className="bg-white rounded-lg shadow p-6 h-full">
                <p className="text-zinc-700 text-lg font-medium">
                  Stay focused!
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Track your progress, review your goals, or relax with a break
                  task here.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside className="w-[500px] min-w-[300px] p-6 border-l border-gray-200 bg-white shadow-sm pt-10">
        <div className="mb-6 justify-start">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
            Calendar
          </h2>
          <EventCalendar />
        </div>
      </aside>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Progress from "@/components/Progress";
import PomodoroTimer from "@/components/PomodoroTimer";
import EventCalendar from "@/components/calendar/EventCalendar";
import Image from "next/image";
import {get} from "../../utils/api"

type PomodoroHistoryItem = {
  date: string;  // e.g. "2025-05-23"
  cycles: number;
};

export default function Home() {
  const [history, setHistory] = useState<PomodoroHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await get("/pomodoro/history/");
        if (!res.ok) throw new Error("Failed to fetch history");
        const data: PomodoroHistoryItem[] = await res.json();
        setHistory(data);
        setStreak(calculateCurrentStreak(data));
      } catch (error) {
        console.error(error);
        setHistory([]);
        setStreak(0);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  // Helper to calculate current streak from history items
  function calculateCurrentStreak(data: PomodoroHistoryItem[]) {
    if (data.length === 0) return 0;

    const dates = data.map(item => new Date(item.date));
    dates.sort((a, b) => a.getTime() - b.getTime());

    let streak = 1;
    for (let i = dates.length - 1; i > 0; i--) {
      const currentDate = dates[i];
      const prevDate = dates[i - 1];
      const prevDatePlusOne = new Date(prevDate);
      prevDatePlusOne.setDate(prevDate.getDate() + 1);

      if (
        currentDate.getDate() === prevDatePlusOne.getDate() &&
        currentDate.getMonth() === prevDatePlusOne.getMonth() &&
        currentDate.getFullYear() === prevDatePlusOne.getFullYear()
      ) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }
  console.log(streak)

  if (loading) {
    return <div>Loading streak...</div>;
  }

  return (
    <>
      <main className="flex-1 px-8 pt-10 space-y-10">
        <section>
          <h1 className="text-2xl font-semibold text-zinc-800 mb-4">Progress</h1>
          <Progress streakDays={streak} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">Focus Timer</h2>
          <div className="flex flex-wrap">
            <div className="w-1/2">
              <PomodoroTimer />
            </div>
            <div className="w-1/2">
              <div className="bg-white rounded-lg shadow p-6 h-full">
                <p className="text-zinc-700 text-lg font-medium">Stay focused!</p>
                <p className="mt-2 text-sm text-zinc-500">
                  Track your progress, review your goals, or relax with a break task here.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside className="w-[500px] min-w-[300px] p-6 border-l border-gray-200 bg-white shadow-sm pt-10">
        <div className="mb-6 justify-start">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Calendar</h2>
          <EventCalendar />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Quiz</h2>
          <Image
            src="/images/quiz.png"
            alt="token"
            width={272}
            height={314}
            className=""
          />
        </div>
      </aside>
    </>
  );
}

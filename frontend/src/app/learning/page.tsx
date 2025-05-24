"use client";

import { useState } from "react";
import Progress from "@/components/Progress";
import PomodoroTimer from "@/components/PomodoroTimer";
import EventCalendar from "@/components/calendar/EventCalendar";

import Image from "next/image";

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
            <div className="w-1/2 flex justify-center ">
              <div className="bg-white rounded-lg shadow p-6 text-center w-full ">
                <p className="text-zinc-700 text-lg font-semibold mb-4">
                  Why did the developer go broke? Because he used up all his
                  cache!
                </p>
                <div className="flex justify-center">
                  <Image
                    src="/characters/charact2.png"
                    alt="Character"
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                </div>
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

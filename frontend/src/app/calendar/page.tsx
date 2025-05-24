"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SessionCalendar from "@/components/SessionCalendar";

export default function Home() {
  const [progress, setProgress] = useState(30);
  return (
    <main className="flex-1 p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Plan Session</h1>
      </header>

      <SessionCalendar />
    </main>
  );
}

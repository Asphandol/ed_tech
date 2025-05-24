"use client";

import { useState } from "react";
import { LucideTrophy } from "lucide-react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import OverviewCards from "@/components/OverviewCards";

const Dashboard = () => {
  const [progress, setProgress] = useState(45);

  const newTokens = [
    { icon: "/characters/charact1.png", text: "Happy 1 week streak!" },
    { icon: "/characters/charact2.png", text: "3 quizzes in row" },
    { icon: "/characters/charact3.png", text: "Progress +5%" },
  ];

  const quizzes = [
    {
      image: "/dashboard/quiz1.png",
    },
    {
      image: "/dashboard/quiz2.png",
    },
    {
      image: "/dashboard/quiz3.png",
    },
  ];

  return (
    <>
      <main className="flex-1 px-8 pt-10 space-y-10">
        <h1 className="text-2xl font-semibold text-zinc-800 mb-4">Dashboard</h1>

        <OverviewCards />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Image
            src="/dashboard/barchart.png"
            alt="Study stats"
            className="w-[700px] h-[295px]"
            width={700}
            height={295}
          />
          <Image
            src="/dashboard/circular-chart.png"
            alt="Study stats"
            className="w-[262px] h-[295px]"
            width={262}
            height={295}
          />
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-3">MY QUIZZES</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {quizzes.map((quiz, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src={quiz.image}
                  alt={`Quiz ${i + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <aside className="w-[500px] min-w-[300px] p-6 border-l border-gray-200 bg-white shadow-sm pt-10">
        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold mb-2">NEW TOKENS</p>
          <ul className="space-y-4">
            {newTokens.map((token, i) => (
              <li
                key={i}
                className="flex items-center gap-4 border-l-8 border-blue-600 "
              >
                <Image
                  src={token.icon}
                  alt="token"
                  width={40}
                  height={40}
                  className="rounded-full ms-4"
                />
                <span>{token.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex bg-gray-300 text-center mt-10 h-[400px] text-2xl justify-center items-center">
          <p>
            ТУТ МОЖЕ БУТИ <br /> ВАША <br /> РЕКЛАМА
          </p>
        </div>
      </aside>
    </>
  );
};

export default Dashboard;

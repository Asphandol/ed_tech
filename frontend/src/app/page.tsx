"use client";

import { useState } from "react";
import { LucideTrophy } from "lucide-react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const [progress, setProgress] = useState(45);

  const newTokens = [
    { icon: "/characters/charact1.png", text: "Happy 1 week streak!" },
    { icon: "/characters/charact2.png", text: "3 quizzes in row" },
    { icon: "/characters/charact3.png", text: "Progress +5%" },
  ];

  const quizzes = [
    {
      title: "Introduction to lorem ipsum...",
      image: "/cat1.png",
    },
    {
      title: "English for today",
      image: "/cat2.png",
    },
    {
      title: "Basic of Lorem ipsum color...",
      image: "/cat3.png",
    },
  ];

  return (
    <main className="flex-1 px-8 pt-10 space-y-10">
      <h1 className="text-2xl font-semibold text-zinc-800 mb-4">Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 shadow rounded bg-white text-center">
          <p className="text-sm text-gray-500">Active Prototypes</p>
          <p className="text-2xl font-bold">7</p>
        </div>
        <div className="p-4 shadow rounded bg-white text-center">
          <p className="text-sm text-gray-500">Hours Learning</p>
          <p className="text-2xl font-bold">3h 15m</p>
        </div>
        <div className="p-4 shadow rounded bg-white text-center">
          <p className="text-sm text-gray-500">Community score</p>
          <p className="text-2xl font-bold">240</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold mb-2">STUDY STATISTICS</p>
          <Image
            src="/images/stats.png"
            alt="Study stats"
            width={400}
            height={200}
            className="w-full"
          />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold mb-2">PROGRESS</p>
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="64"
                cy="64"
                r="54"
                stroke="#eee"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="54"
                stroke="#0284c7"
                strokeWidth="10"
                fill="none"
                strokeDasharray="339.29"
                strokeDashoffset={`${339.29 * (1 - progress / 100)}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <p className="text-xl font-bold">{progress}%</p>
              <p className="text-sm text-blue-500">80%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold mb-2">NEW TOKENS</p>
          <ul className="space-y-4">
            {newTokens.map((token, i) => (
              <li key={i} className="flex items-center gap-4">
                <Image
                  src={token.icon}
                  alt="token"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>{token.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-3">MY QUIZZES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quizzes.map((quiz, i) => (
            <div
              key={i}
              className="bg-blue-50 p-4 rounded-xl shadow text-center"
            >
              <Image
                src={quiz.image}
                alt={quiz.title}
                width={160}
                height={160}
                className="mx-auto mb-2"
              />
              <p className="font-medium text-sm text-gray-700">{quiz.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

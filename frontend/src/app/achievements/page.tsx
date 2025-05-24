import React from "react";

import Image from "next/image";

const tokens = [
  [
    { icon: "/characters/charact1.png", text: "Happy 1 week streak!" },
    { icon: "/characters/charact2.png", text: "3 quizzes in row" },
    { icon: "/characters/charact3.png", text: "Progress +5%" },
    { icon: "/shop/question.png", text: "Happy 2 weeks streak!" },
    { icon: "/shop/question.png", text: "5 quizzes in row" },
    { icon: "/shop/question.png", text: "Progress +7%" },
    { icon: "/shop/question.png", text: "5 quizzes in row" },
    { icon: "/shop/question.png", text: "Progress +8%" },
  ],
  [
    { icon: "/shop/question.png", text: "Happy 1 month streak!" },
    { icon: "/shop/question.png", text: "10 quizzes in row" },
    { icon: "/shop/question.png", text: "Progress +10%" },
    { icon: "/shop/question.png", text: "Happy 3 weeks streak!" },
    { icon: "/characters/charact3.png", text: "Shopper" },
    { icon: "/shop/question.png", text: "Done friend!" },
    { icon: "/characters/charact1.png", text: "question guru" },
    { icon: "/characters/charact1.png", text: "Time manager Senior" },
  ],
  [
    { icon: "/shop/question.png", text: "Happy 1 year streak!" },
    { icon: "/shop/question.png", text: "20 quizzes in row" },
    { icon: "/shop/question.png", text: "Progress +15%" },
    { icon: "/shop/question.png", text: "Happy 1 week streak!" },
    { icon: "/shop/question.png", text: "Focus master!" },
    { icon: "/shop/question.png", text: "Premium guru" },
    { icon: "/shop/question.png", text: "All correct answers" },
    { icon: "/shop/question.png", text: "Winner today" },
  ],
];

const Achievements = () => {
  return (
    <main className="p-8 bg-white min-h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Tokens</h1>
        <div className="flex items-center gap-2 text-yellow-500 font-semibold">
          <span>1000</span>
          <Image src="/shop/coin.png" alt="coin" width={20} height={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tokens.map((column, colIdx) => (
          <ul key={colIdx} className="space-y-4">
            {column.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 border-l-4 border-blue-400 pl-4 h-20 rounded-md"
              >
                {item.icon !== "?" ? (
                  <Image
                    src={item.icon}
                    alt="token"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-200 text-center text-xl font-bold text-gray-500 flex items-center justify-center">
                    ?
                  </div>
                )}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </main>
  );
};

export default Achievements;

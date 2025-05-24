"use client";

import { useState } from "react";

const quizData = [
  {
    id: 5,
    question: "What color do you get when you mix red and white?",
    options: ["Pink", "Purple", "Orange", "Brown"],
  },
  {
    id: 6,
    question: "What is the boiling point of water?",
    options: ["90°C", "80°C", "100°C", "120°C"],
  },
  {
    id: 9,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
  },
  {
    id: 13,
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Gorilla"],
  },
  {
    id: 19,
    question: "What does DNA stand for?",
    options: [
      "Deoxyribonucleic Acid",
      "Dinucleic Acid",
      "Deoxynucleic Acid",
      "Ribonucleic Acid",
    ],
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    const formatted = {
      answers: Object.entries(answers).map(([id, selected_option]) => ({
        question_id: Number(id),
        selected_option,
      })),
    };

    console.log("Submitted:", formatted);
    setSubmitted(true);
  };

  return (
    <main className="p-8 bg-white  text-zinc-800  mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quiz</h1>

      {quizData.map((q) => (
        <div key={q.id} className="mb-6 border-b pb-4">
          <p className="font-medium mb-2">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt) => (
              <label
                key={opt}
                className={`block px-4 py-2 border rounded cursor-pointer transition ${
                  answers[q.id] === opt
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  onChange={() => handleOptionSelect(q.id, opt)}
                  className="mr-2"
                  checked={answers[q.id] === opt}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>

      {submitted && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded text-sm">
          ✅ Answers submitted! Check console for payload.
        </div>
      )}
    </main>
  );
}

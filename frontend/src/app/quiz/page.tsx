"use client";

import { useEffect, useState } from "react";
import {get, post} from "../../utils/api";


type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
};

type SubmitResponse = {
  score: number;
  points_awarded: number;
  correct_answers: {
    question_id: number;
    selected_option: string;
  }[];
};

export default function QuizPage() {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<SubmitResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Fetch quiz questions on mount
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await get("/quiz/questions/");
        if (!res.ok) throw new Error("Failed to load quiz questions");
        const data: QuizQuestion[] = await res.json();
        setQuizData(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitted(false);
    setResult(null);

    // Prepare payload
    const payload = {
      answers: Object.entries(answers).map(([id, selected_option]) => ({
        question_id: Number(id),
        selected_option,
      })),
    };
    try {
      const res = await post ("/quiz/submit/", payload);
      if (!res.ok) throw new Error("Failed to submit answers");

      const data: SubmitResponse = await res.json();
      setResult(data);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Submission error");
    }
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <main className="p-8 bg-white text-zinc-800 mx-auto max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Quiz</h1>

      {quizData.map((q) => {
        // Find correct answer for this question if submitted
        const correctAnswerObj = result?.correct_answers.find(
          (ca) => ca.question_id === q.id
        );
        const correctOption = correctAnswerObj?.selected_option;

        return (
          <div key={q.id} className="mb-6 border-b pb-4">
            <p className="font-medium mb-2">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt;
                const isCorrect = submitted && opt === correctOption;
                const isWrongSelected = submitted && isSelected && opt !== correctOption;

                return (
                  <label
                    key={opt}
                    className={`block px-4 py-2 border rounded cursor-pointer transition
                      ${
                        isCorrect
                          ? "bg-green-200 border-green-600"
                          : isWrongSelected
                          ? "bg-red-200 border-red-600"
                          : isSelected
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      onChange={() => handleOptionSelect(q.id, opt)}
                      className="mr-2"
                      checked={isSelected}
                      disabled={submitted}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      <button
        onClick={handleSubmit}
        disabled={submitted}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        Submit
      </button>

      {submitted && result && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded text-sm">
          <p>
            🎉 Your Score: <strong>{result.score}</strong>
          </p>
          <p>
            🏆 Points Awarded: <strong>{result.points_awarded}</strong>
          </p>
        </div>
      )}
    </main>
  );
}

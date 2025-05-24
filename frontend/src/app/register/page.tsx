"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import Image from "next/image";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
}

const mentors: Mentor[] = [
  {
    id: "hector",
    name: "Hector",
    avatar: "/characters/hector.png",
  },
  {
    id: "selesta",
    name: "Selesta",
    avatar: "/characters/salesta.png",
  },
  {
    id: "lora",
    name: "Lora",
    avatar: "/characters/lora.png",
  },
];

const topics = [
  "IT",
  "Languages",
  "Art",
  "Nature",
  "Sport",
  "Money",
  "History",
  "Math",
  "Cosmos",
];

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleEmailPasswordNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setStep(2);
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleFinish = async () => {
    if (!selectedMentor) {
      setError("Please select a mentor");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const registrationData = {
        email,
        password,
        username,
        mentor: selectedMentor,
        interests: selectedTopics,
      };

      const success = await register(email, password, registrationData);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="h-screen flex-1 bg-gray-50 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-right mb-8">
            <Link href="/login" className="text-gray-600 hover:text-gray-800">
              Sign Up
            </Link>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Register
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleEmailPasswordNext} className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="username"
                    placeholder="Username"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Next
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-12">
                {/* Mentor Selection */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                    Choose mentor
                  </h2>
                  <div className="flex justify-center space-x-12">
                    {mentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className={`text-center cursor-pointer transition-transform hover:scale-105 ${
                          selectedMentor === mentor.id
                            ? "transform scale-105"
                            : ""
                        }`}
                        onClick={() => setSelectedMentor(mentor.id)}
                      >
                        <div
                          className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-3 transition-all ${
                            selectedMentor === mentor.id
                              ? "bg-blue-100 ring-4 ring-blue-500"
                              : "bg-blue-50 hover:bg-blue-100"
                          }`}
                        >
                          <Image
                            src={mentor.avatar}
                            alt="Description of image"
                            width={70}
                            height={70}
                          />
                        </div>
                        <p className="text-lg font-medium text-gray-700">
                          {mentor.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topics Selection */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                    Choose interesting topics
                  </h2>
                  <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                    {topics.map((topic) => (
                      <label
                        key={topic}
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic)}
                          onChange={() => handleTopicToggle(topic)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium">
                          {topic}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinish}
                    disabled={isLoading || !selectedMentor}
                    className="px-8 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating account..." : "Finish"}
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="text-center mt-6">
                <span className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

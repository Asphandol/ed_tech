import React from "react";

interface ProgressProps {
  streakDays?: number;
}

const Progress: React.FC<ProgressProps> = ({ streakDays = 1 }) => {
  const progressPercent = Math.min((streakDays / 14) * 100, 100);

  let trophySrc: string;
  let trophyAlt: string;

  if (streakDays >= 14) {
    trophySrc = "/levels/gold_trophy.svg";
    trophyAlt = "Gold Trophy";
  } else if (streakDays >= 7) {
    trophySrc = "/levels/silver_trophy.svg";
    trophyAlt = "Silver Trophy";
  } else {
    trophySrc = "/levels/bronze_trophy.svg";
    trophyAlt = "Bronze Trophy";
  }

  return (
    <section className="mb-8 relative w-full rounded-xl overflow-hidden">
      <img
        src="/images/progress-mock.png"
        alt="Progress background"
        className="w-full"
      />
      <div className="absolute bottom-6 left-6 right-6 h-3 bg-purple-200 rounded-full">
        <div
          className="h-3 bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div
        className="absolute bottom-12 transition-all duration-300"
        style={{ left: `calc(${progressPercent}% - 24px)` }}
      >
        <img
          src="/characters/charact1.png"
          alt="Character"
          className="w-20 h-20 object-contain"
        />
        <div className="text-center text-l font-bold text-black mt-1 bg-white rounded ">
          {streakDays} days
        </div>
      </div>

      <div className="absolute bottom-12 right-6 text-center">
        <img src={trophySrc} alt={trophyAlt} className="w-20 h-20 mx-auto" />
        <div className="text-l font-semibold text-black bg-white rounded">
          {streakDays >= 14 ? "Gold" : streakDays >= 7 ? "Silver" : "Bronze"}
        </div>
      </div>
    </section>
  );
};

export default Progress;

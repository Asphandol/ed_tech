import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css";
import { get } from "../../utils/api";

type PomodoroHistoryItem = {
  date: string; // expected format: "YYYY-MM-DD"
  cycles: number;
};


function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}


function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function StreakCalendar() {
  const [history, setHistory] = useState<PomodoroHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await get("/pomodoro/history"); 
        if (!res.ok) throw new Error("Failed to fetch history");
        const data: PomodoroHistoryItem[] = await res.json();
        setHistory(data);
      } catch (error) {
        console.error(error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  // Convert backend date strings to local Date objects
  const streakDates = history.map((item) => parseLocalDate(item.date));

  // Create lookup for cycles by local date string key
  const cyclesByDate = history.reduce<Record<string, number>>((acc, item) => {
    acc[item.date] = item.cycles;
    return acc;
  }, {});

  // Determine CSS class for each calendar tile
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      const isStreakDate = cyclesByDate.hasOwnProperty(dateStr);
      const isToday = new Date().toDateString() === date.toDateString();

      return [
        isStreakDate ? "streak-date" : "",
        isToday ? "today" : "",
      ].join(" ");
    }
    return null;
  };

  // Calculate current streak (consecutive days)
  const currentStreakLength = () => {
    if (streakDates.length === 0) return 0;

    // Sort dates ascending
    const sorted = [...streakDates].sort((a, b) => a.getTime() - b.getTime());

    let streak = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      const currentDate = sorted[i];
      const prevDate = sorted[i - 1];

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
  };

  if (loading) {
    return <div>Loading calendar...</div>;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Your streak 🔥</h2>
        <div className="streak-counter">
          {currentStreakLength()} day{currentStreakLength() !== 1 ? "s" : ""}
        </div>
      </div>
      <Calendar
        onChange={() => {}}
        value={null}
        tileClassName={tileClassName}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateStr = formatDate(date);
            const cycles = cyclesByDate[dateStr];
            if (cycles) {
              return <div className="cycles-indicator">🔄 {cycles}</div>;
            }
          }
          return null;
        }}
        selectRange={false}
        prev2Label={null}
        next2Label={null}
        onClickDay={undefined}
      />
    </div>
  );
}

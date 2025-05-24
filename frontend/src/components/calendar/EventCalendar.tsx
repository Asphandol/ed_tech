import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';

// Mock data - replace with your actual streak dates
const MOCK_STREAK_DATES = [
  new Date(2023, 5, 15),
  new Date(2023, 5, 16),
  new Date(2023, 5, 17),
  new Date(2023, 5, 20),
  new Date(2023, 5, 21),
  new Date(2023, 5, 22),
  new Date(2023, 5, 23),
  new Date(), // Today
];

export default function StreakCalendar() {
  const [streakDates] = useState<Date[]>(MOCK_STREAK_DATES);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isStreakDate = streakDates.some(
        streakDate => streakDate.toDateString() === date.toDateString()
      );
      const isToday = new Date().toDateString() === date.toDateString();

      return [
        isStreakDate ? 'streak-date' : '',
        isToday ? 'today' : '',
      ].join(' ');
    }
    return null;
  };

  // Calculate current streak length
  const currentStreakLength = () => {
    if (streakDates.length === 0) return 0;
    
    const sorted = [...streakDates].sort((a, b) => b.getTime() - a.getTime());
    let streak = 1;
    
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i-1]);
      const currentDate = sorted[i];
      
      const prevDay = new Date(prevDate);
      prevDay.setDate(prevDate.getDate() - 1);
      
      if (
        currentDate.getDate() === prevDay.getDate() &&
        currentDate.getMonth() === prevDay.getMonth() &&
        currentDate.getFullYear() === prevDay.getFullYear()
      ) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Your streak 🔥</h2>
        <div className="streak-counter">
          {currentStreakLength()} day{currentStreakLength() !== 1 ? 's' : ''}
        </div>
      </div>
      <Calendar
        onChange={() => {}}
        value={null}
        tileClassName={tileClassName}
        selectRange={false}
        prev2Label={null}
        next2Label={null}
        onClickDay={undefined} // Disable date selection
      />
    </div>
  );
}   
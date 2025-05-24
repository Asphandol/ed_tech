import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EventCalendar() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateClick = (date: Date) => {
    const isSelected = selectedDates.some(
      selectedDate => selectedDate.toDateString() === date.toDateString()
    );

    if (isSelected) {
      setSelectedDates(selectedDates.filter(
        selectedDate => selectedDate.toDateString() !== date.toDateString()
      ));
    } else if (selectedDates.length < 3) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (selectedDates.some(selectedDate => 
        selectedDate.toDateString() === date.toDateString()
      )) {
        return 'selected-date';
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={() => {}} // Required prop but we handle selection differently
        onClickDay={handleDateClick}
        value={null} // We manage selection state separately
        tileClassName={tileClassName}
        selectRange={false}
      />
      <div className="selected-dates">
        <h3>Selected Dates:</h3>
        <ul>
          {selectedDates.map((date, index) => (
            <li key={index}>
              {date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
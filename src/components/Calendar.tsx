import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Calendar.css';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  events: { date: Date; color: string }[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  // Update current month if selectedDate changes externally
  useEffect(() => {
    if (selectedDate.getMonth() !== currentMonth.getMonth() || selectedDate.getFullYear() !== currentMonth.getFullYear()) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const today = new Date();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="btn-month-nav" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
        <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
        <button className="btn-month-nav" onClick={handleNextMonth}><ChevronRight size={20} /></button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
        </div>
        
        <div className="calendar-days">
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div key={`empty-${idx}`} className="calendar-day empty"></div>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), idx + 1);
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);
            
            const dayEvents = events.filter(e => isSameDay(e.date, date));

            return (
              <div 
                key={idx} 
                className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => onDateSelect(date)}
              >
                {idx + 1}
                {dayEvents.length > 0 && (
                  <div className="day-dots">
                    {dayEvents.slice(0, 3).map((ev, eIdx) => (
                      <div key={eIdx} className="event-dot" style={{ backgroundColor: ev.color }}></div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

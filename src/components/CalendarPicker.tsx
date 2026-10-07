import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  startOfDay,
} from 'date-fns';
import { DateRange } from '../types/villa';

interface CalendarPickerProps {
  id?: string;
  selected?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  className?: string;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selected = {},
  onSelect,
  className = '',
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => selected.from || new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Sync displayed month when selected.from is set
  useEffect(() => {
    if (selected.from) {
      setCurrentMonth(selected.from);
    }
  }, [selected.from]);

  const today = startOfDay(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;

    if (!selected.from || (selected.from && selected.to)) {
      // Start new selection
      onSelect({ from: day, to: undefined });
    } else if (selected.from && !selected.to) {
      if (isBefore(day, selected.from)) {
        onSelect({ from: day, to: undefined });
      } else if (isSameDay(day, selected.from)) {
        // Can't checkout same day
        onSelect({ from: day, to: undefined });
      } else {
        onSelect({ from: selected.from, to: day });
      }
    }
  };

  const isDaySelectedStart = (day: Date) => {
    return selected.from ? isSameDay(day, selected.from) : false;
  };

  const isDaySelectedEnd = (day: Date) => {
    return selected.to ? isSameDay(day, selected.to) : false;
  };

  const isDayInRange = (day: Date) => {
    if (selected.from && selected.to) {
      return isAfter(day, selected.from) && isBefore(day, selected.to);
    }
    if (selected.from && hoverDate && isAfter(hoverDate, selected.from)) {
      return isAfter(day, selected.from) && isBefore(day, hoverDate);
    }
    return false;
  };

  return (
    <div className={`w-full max-w-[340px] select-none p-2 ${className}`}>
      {/* Month Navigation */}
      <div className="flex items-center justify-between px-2 pb-3 pt-1">
        <h4 className="font-serif text-lg font-bold text-foreground">
          {format(currentMonth, 'MMMM yyyy')}
        </h4>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isBefore(monthStart, startOfMonth(today))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground pb-2">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isPast = isBefore(day, today);
          const isToday = isSameDay(day, today);
          const isStart = isDaySelectedStart(day);
          const isEnd = isDaySelectedEnd(day);
          const inRange = isDayInRange(day);

          let cellClass = 'h-9 w-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all relative cursor-pointer';

          if (!isCurrentMonth) {
            cellClass += ' text-muted-foreground/30';
          } else if (isPast) {
            cellClass += ' text-muted-foreground/35 cursor-not-allowed';
          } else {
            cellClass += ' text-foreground hover:bg-[#C5A880]/20';
          }

          if (isStart && !selected.to) {
            // Golden selected single/start date (e.g. today selected by default upon Continue to Dates)
            cellClass += ' bg-[#C5A880] text-[#1c1917] font-bold rounded-md z-10 shadow-sm ring-2 ring-[#C5A880]/60';
          } else if (isStart) {
            cellClass += ' bg-[#C5A880] text-[#1c1917] font-bold rounded-l-md z-10 shadow-sm';
          } else if (isEnd) {
            cellClass += ' bg-[#C5A880] text-[#1c1917] font-bold rounded-r-md z-10 shadow-sm';
          } else if (inRange && isCurrentMonth) {
            cellClass += ' bg-[#C5A880]/25 text-[#1c1917] rounded-none';
          } else if (isToday && isCurrentMonth && !isPast) {
            cellClass += ' rounded-md border border-[#C5A880]/70 font-semibold';
          } else if (!isPast && isCurrentMonth) {
            cellClass += ' rounded-md';
          }

          return (
            <div
              key={day.toISOString()}
              onClick={() => !isPast && handleDayClick(day)}
              onMouseEnter={() => !isPast && setHoverDate(day)}
              onMouseLeave={() => setHoverDate(null)}
              className={cellClass}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

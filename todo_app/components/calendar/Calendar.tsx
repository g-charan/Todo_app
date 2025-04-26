import { useEffect, useState } from "react";

type CalendarProps = {
  initialDate?: Date;
  onDateSelect?: (date: Date) => void;
  showYearNavigation?: boolean;
  showMonthNavigation?: boolean;
  showYearSelection?: boolean;
  showMonthSelection?: boolean;
  customDayRenderer?: (
    date: Date,
    isSelected: boolean | null,
    isToday: boolean,
    isCurrentMonth: boolean
  ) => React.ReactNode;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
};

const Calendar = ({
  initialDate = new Date(),
  onDateSelect,
  showYearNavigation = true,
  showMonthNavigation = true,
  showYearSelection = true,
  showMonthSelection = true,
  customDayRenderer,
  className = "",
  minDate,
  maxDate,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [yearsRange, setYearsRange] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize years range for year picker
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const range = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
    setYearsRange(range);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const navigateYear = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + direction, currentDate.getMonth(), 1)
    );
  };

  const selectYear = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setViewMode("months");
  };

  const selectMonth = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setViewMode("days");
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Calculate days from previous month to display
    const daysFromPrevMonth = firstDayOfMonth;
    const prevMonthDays = getDaysInMonth(
      month === 0 ? year - 1 : year,
      month === 0 ? 11 : month - 1
    );

    // Calculate days from next month to display
    const totalDaysToShow = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
    const daysFromNextMonth = totalDaysToShow - (daysInMonth + firstDayOfMonth);

    const days = [];

    // Previous month days
    for (let i = 0; i < daysFromPrevMonth; i++) {
      const day = prevMonthDays - daysFromPrevMonth + i + 1;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const date = new Date(prevYear, prevMonth, day);
      const isDisabled = isDateDisabled(date);

      days.push(
        <div
          key={`prev-${i}`}
          className={`flex items-center justify-center h-10 ${
            isDisabled ? "text-gray-300" : "text-gray-400"
          } bg-gray-50`}
        >
          {day}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();
      const isDisabled = isDateDisabled(date);

      if (customDayRenderer) {
        days.push(
          <div
            key={`current-${day}`}
            className={`flex items-center justify-center h-10 cursor-pointer transition-colors ${
              isDisabled
                ? "text-gray-300 cursor-not-allowed"
                : isSelected
                ? "bg-blue-500 text-white"
                : isToday
                ? "border-2 border-blue-500"
                : "hover:bg-gray-100"
            }`}
            onClick={!isDisabled ? () => handleDateClick(day) : undefined}
          >
            {customDayRenderer(date, isSelected, isToday, true)}
          </div>
        );
      } else {
        days.push(
          <div
            key={`current-${day}`}
            className={`flex items-center justify-center h-10 cursor-pointer transition-colors ${
              isDisabled
                ? "text-gray-300 cursor-not-allowed"
                : isSelected
                ? "bg-blue-500 text-white"
                : isToday
                ? "border-2 border-blue-500"
                : "hover:bg-gray-100"
            }`}
            onClick={!isDisabled ? () => handleDateClick(day) : undefined}
          >
            {day}
          </div>
        );
      }
    }

    // Next month days
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const date = new Date(nextYear, nextMonth, i);
      const isDisabled = isDateDisabled(date);

      days.push(
        <div
          key={`next-${i}`}
          className={`flex items-center justify-center h-10 ${
            isDisabled ? "text-gray-700" : "text-gray-400"
          } bg-gray-50`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const renderMonths = () => {
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {months.map((month, index) => {
          const date = new Date(currentDate.getFullYear(), index, 1);
          const isDisabled = isDateDisabled(date);

          return (
            <button
              key={month}
              className={`p-2 rounded-lg transition-colors ${
                isDisabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              } ${
                currentDate.getMonth() === index
                  ? "bg-blue-100 text-blue-600"
                  : ""
              }`}
              onClick={!isDisabled ? () => selectMonth(index) : undefined}
              disabled={isDisabled}
            >
              {month.substring(0, 3)}
            </button>
          );
        })}
      </div>
    );
  };

  const renderYears = () => {
    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        {yearsRange.map((year) => {
          const date = new Date(year, currentDate.getMonth(), 1);
          const isDisabled = isDateDisabled(date);

          return (
            <button
              key={year}
              className={`p-2 rounded-lg transition-colors ${
                isDisabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              } ${
                currentDate.getFullYear() === year
                  ? "bg-blue-100 text-blue-600"
                  : ""
              }`}
              onClick={!isDisabled ? () => selectYear(year) : undefined}
              disabled={isDisabled}
            >
              {year}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <div className="flex items-center space-x-2">
          {showMonthNavigation && viewMode === "days" && (
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 rounded-full hover:bg-blue-600 transition-colors"
              disabled={
                minDate &&
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                ) < minDate
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <button
            className="px-2 py-1 rounded hover:bg-blue-600 transition-colors"
            onClick={() => setViewMode("months")}
          >
            {months[currentDate.getMonth()]}
          </button>

          <button
            className="px-2 py-1 rounded hover:bg-blue-600 transition-colors"
            onClick={() => setViewMode("years")}
          >
            {currentDate.getFullYear()}
          </button>

          {showMonthNavigation && viewMode === "days" && (
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 rounded-full hover:bg-blue-600 transition-colors"
              disabled={
                maxDate &&
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                ) > maxDate
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {showYearNavigation && viewMode === "days" && (
          <div className="flex space-x-2">
            <button
              onClick={() => navigateYear(-1)}
              className="p-1 rounded-full hover:bg-blue-600 transition-colors"
              disabled={
                minDate &&
                new Date(
                  currentDate.getFullYear() - 1,
                  currentDate.getMonth(),
                  1
                ) < minDate
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => navigateYear(1)}
              className="p-1 rounded-full hover:bg-blue-600 transition-colors"
              disabled={
                maxDate &&
                new Date(
                  currentDate.getFullYear() + 1,
                  currentDate.getMonth(),
                  1
                ) > maxDate
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {viewMode === "days" && (
        <>
          <div className="grid grid-cols-7 bg-gray-100 p-1">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px p-1 bg-gray-100">
            {renderDays()}
          </div>
        </>
      )}

      {viewMode === "months" && renderMonths()}
      {viewMode === "years" && renderYears()}

      {/* Selected date display */}
      {selectedDate && (
        <div className="p-4 border-t text-center">
          <p className="text-sm text-gray-500">Selected:</p>
          <p className="font-medium">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default Calendar;

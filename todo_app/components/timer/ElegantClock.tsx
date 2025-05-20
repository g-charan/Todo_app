"use client";

import { useEffect, useState } from "react";

export default function ElegantClock() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const clientFormattedDate = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setFormattedDate(clientFormattedDate);
    // Update time immediately and then every second
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString(undefined, options));
    };

    updateTime(); // Initial call
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-3xl font-mono tracking-tighter text-gray-800 dark:text-gray-100">
          {currentTime}
        </div>
        <div className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          {formattedDate || "Loading..."}
        </div>
      </div>
    </div>
  );
}

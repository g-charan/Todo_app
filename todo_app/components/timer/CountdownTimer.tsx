"use client";
import { useEffect } from "react";
export const CountdownTimer = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  isRunning,
  setIsRunning,
  time,
  setTime,
  setPercentage,
}: any) => {
  const totalTime = time.hours * 3600 + time.minutes * 60 + time.seconds; // Total time in seconds

  useEffect(() => {
    let timer: any;

    // let newHours = hours,
    //   newMinutes = minutes,
    //   newSeconds = seconds;

    // if (seconds > 0) {
    //   newSeconds -= 1;
    // } else if (minutes > 0) {
    //   newMinutes -= 1;
    //   newSeconds = 59;
    // } else if (hours > 0) {
    //   newHours -= 1;
    //   newMinutes = 59;
    //   newSeconds = 59;
    // }
    if (isRunning) {
      timer = setInterval(() => {
        updateCountdown();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [time, isRunning]);

  const updateCountdown = () => {
    const { hours, minutes, seconds } = time;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      setIsRunning(false);
      return;
    }
    let newHours = hours,
      newMinutes = minutes,
      newSeconds = seconds;

    if (seconds > 0) {
      newSeconds -= 1;
    } else if (minutes > 0) {
      newMinutes -= 1;
      newSeconds = 59;
    } else if (hours > 0) {
      newHours -= 1;
      newMinutes = 59;
      newSeconds = 59;
    }

    if (seconds > 0) {
      setTime((prevTime: any) => ({
        ...prevTime,
        seconds: prevTime.seconds - 1,
      }));
    } else if (minutes > 0) {
      setTime((prevTime: any) => ({
        ...prevTime,
        seconds: 59,
        minutes: prevTime.minutes - 1,
      }));
    } else if (hours > 0) {
      setTime((prevTime: any) => ({
        ...prevTime,
        seconds: 59,
        minutes: 59,
        hours: prevTime.hours - 1,
      }));
    }
    const remainingTime = newHours * 3600 + newMinutes * 60 + newSeconds;
    const elapsedTime = totalTime - remainingTime;
    console.log((remainingTime / elapsedTime) * 100);
    setPercentage((remainingTime / totalTime) * 100);
  };

  const handlePause = () => setIsRunning(false);

  const handleStart = () => setIsRunning(true);

  const handleReset = () => {
    setIsRunning(false);
    setTime({ hours, minutes, seconds });
    setPercentage(100);
  };
  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="bg-zinc-700 text-white text-lg font-semibold p-4  shadow-md w-20 text-center">
            {String(time.hours).padStart(2, "0")}
          </span>
          <span className="text-sm text-gray-500 mt-2">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-zinc-700 text-white text-lg font-semibold p-4  shadow-md w-20 text-center">
            {String(time.minutes).padStart(2, "0")}
          </span>
          <span className="text-sm text-gray-500 mt-2">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-zinc-700 text-white text-lg font-semibold p-4  shadow-md w-20 text-center">
            {String(time.seconds).padStart(2, "0")}
          </span>
          <span className="text-sm text-gray-500 mt-2">Seconds</span>
        </div>
      </div>
    </>
  );
};

"use client";

import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Pause,
  Play,
  Square,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// const Progressbar = () => {
//   const [percentage, setPercentage] = useState(65);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <CircularProgressBar percentage={percentage} />
//       <div className="mt-4">
//         <button
//           onClick={() => setPercentage((prev) => Math.min(prev + 5, 100))}
//           className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
//         >
//           Increase
//         </button>
//         <button
//           onClick={() => setPercentage((prev) => Math.max(prev - 5, 0))}
//           className="px-4 py-2 ml-2 text-white bg-red-500 rounded shadow hover:bg-red-600"
//         >
//           Decrease
//         </button>
//       </div>
//     </div>
//   );
// };

const CircularProgressBar = ({ percentage }: any) => {
  const strokeWidth = 10;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      className="w-24 h-24 transform "
      width={"100%"}
      height={"100%"}
      viewBox="0 0 100 100"
    >
      <circle
        className="text-gray-300"
        stroke="currentColor"
        fill="white"
        strokeWidth={0}
        r={radius}
        cx="50"
        cy="50"
      />
      <circle
        className="text-blue-500 transition-all duration-300 ease-out"
        stroke="currentColor"
        fill="blue"
        strokeLinecap="round"
        r={radius}
        cx="50"
        cy="50"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xl font-bold fill-current text-gray-700"
      >
        {percentage}%
      </text>
    </svg>
  );
};

const TimerCircularProgressBar = ({ percentage, size = 150 }: any) => {
  const strokeWidth = 10;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Dynamically calculate the timer hand position
  const angle = (percentage / 100) * 360;
  const handLength = radius + 5; // Shorter than the outer radius
  const handX =
    size / 2 + handLength * Math.cos((angle - 90) * (Math.PI / 180));
  const handY =
    size / 2 + handLength * Math.sin((angle - 90) * (Math.PI / 180));

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer Circle */}
      <svg
        className="absolute"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle */}
        <circle
          className="text-gray-300"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          className="text-blue-500 transition-all duration-300 ease-out"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {/* Filled Color Circle */}
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(#3b82f6 ${
            percentage * 3.6
          }deg, #e5e7eb 0deg)`,
        }}
      ></div>
      {/* Timer Hand */}
      <svg
        className="absolute z-10"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <line
          x1={size / 2}
          y1={size / 2}
          x2={handX}
          y2={handY}
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {/* Timer Text */}
      <div className="absolute w-4 h-4 flex justify-center rounded-full bg-black">
        {/* <div className=" z-10 w-4 h-4 bg-black shadow-sm border shadow-white self-center rounded-full"></div> */}
      </div>
    </div>
  );
};

const CountdownTimer = ({
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
    </>
  );
};

const page = () => {
  const [percentage, setPercentage] = useState(100);
  // const [isRunning, setIsRunning] = useState(false);
  const route = useRouter();
  const Items = [
    { name: "smtg" },
    { name: "smtg" },
    { name: "smtg" },
    { name: "smtg" },
  ];
  const schedules = [
    { name: 1, status: true },
    { name: 1, status: true },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
    { name: 1 },
  ];

  const [isRunning, setIsRunning] = useState(false);

  const [timerValue, setTimerValue] = useState(0);
  const [dropDown, setDropDown] = useState(false);

  const timerValues = [
    { time: { hours: 1, minutes: 0, seconds: 0 } },
    { time: { hours: 0, minutes: 1, seconds: 0 } },
    { time: { hours: 0, minutes: 0, seconds: 2 } },
  ];
  const [time, setTime] = useState(timerValues[timerValue].time);
  useEffect(() => {
    // const interval = setInterval(() => {
    //   setPercentage((prev) => (prev > 0 ? prev - 1 : 0));
    // }, 1000); // Adjust for faster/slower timer
    // return () => clearInterval(interval);
  }, [time]);
  const handleReset = () => {
    setIsRunning(false);
    setTime(timerValues[timerValue].time);
    setPercentage(100);
  };
  useEffect(() => setTime(timerValues[timerValue].time), [timerValue]);
  return (
    <div className="flex w-full h-[85%] justify-center ">
      <div className="w-2/3 mt-10 flex border rounded-2xl shadow-lg px-4  h-full flex-col gap-4">
        <div className="  py-4 gap-8 w-full flex">
          <ArrowLeft
            size={20}
            onClick={() => route.push("/pages/list")}
            className=" hover:cursor-pointer self-center"
          />

          <p> Simple Timer</p>
        </div>
        <div className=" w-full grid grid-cols-2 h-[85%] grid-rows-3">
          <div className=" relative row-span-2 col-span-1 flex justify-center">
            <div className=" absolute mr-6 top-2">
              <div className="border px-4 w-[7vw] rounded-full flex justify-around items-center gap-2 relative ">
                {timerValues[timerValue].time.hours != 0 && (
                  <button>{timerValues[timerValue].time.hours} hours</button>
                )}
                {timerValues[timerValue].time.minutes != 0 && (
                  <button>
                    {timerValues[timerValue].time.minutes} minutes
                  </button>
                )}
                {timerValues[timerValue].time.seconds != 0 && (
                  <button>
                    {timerValues[timerValue].time.seconds} seconds
                  </button>
                )}
                <ChevronDown
                  size={18}
                  className=" hover:cursor-pointer"
                  onClick={() => setDropDown(!dropDown)}
                />
                <div
                  className={`${
                    !dropDown && "invisible"
                  } visible absolute top-7 -right-[5%] rounded-md bg-zinc-50  border py-1 w-[15vh]`}
                >
                  {timerValues.map((data, key) => (
                    <div key={key}>
                      {data != timerValues[timerValue] && (
                        <div
                          key={key}
                          className=" w-full px-2 hover:bg-zinc-200 hover:cursor-pointer"
                          onClick={() => setTimerValue(key)}
                        >
                          {data.time.hours != 0 && (
                            <button>{data.time.hours} hours</button>
                          )}
                          {data.time.minutes != 0 && (
                            <button>{data.time.minutes} minutes</button>
                          )}
                          {data.time.seconds != 0 && (
                            <button>{data.time.seconds} seconds</button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className=" flex flex-col self-center">
              {/* <TimerCircularProgressBar percentage={percentage} size={300} /> */}
              {/* <div className=" flex justify-center py-4">
                <p className=" text-lg font-medium">{percentage}s</p>
              </div> */}
              <div className=" flex justify-center py-4 scale-[120%] mr-5">
                {/* <p className=" text-lg font-medium">{percentage}s</p> */}
                <CountdownTimer
                  hours={time.hours}
                  isRunning={isRunning}
                  setIsRunning={setIsRunning}
                  time={time}
                  setTime={setTime}
                  setPercentage={setPercentage}
                />
              </div>
              <div className=" flex justify-center py-2 gap-4 mt-5 mr-5">
                {isRunning ? (
                  <Pause
                    onClick={() => setIsRunning(false)}
                    className=" hover:cursor-pointer"
                  />
                ) : (
                  <Play
                    onClick={() => setIsRunning(true)}
                    className=" hover:cursor-pointer"
                  />
                )}
                <Square
                  onClick={() => handleReset()}
                  className=" hover:cursor-pointer"
                />
              </div>
              <div className=" absolute right-5 top-[40%] flex gap-2 ">
                <div className=" flex-col">
                  <p className=" font-semibold">Coming Next</p>
                  <p className=" text-sm flex justify-center">5min Break</p>
                </div>
                <ChevronRight className=" self-center" size={18} />
              </div>
            </div>
          </div>
          <div className=" row-span-2 col-span-1  p-4">
            <div className=" w-full h-full border rounded-xl">
              <p className=" px-4 pt-2 text-lg font-semibold">Sessions</p>
              <div className=" w-full h-[80%] px-4 py-2">
                <div className="grid grid-cols-12 grid-rows-6  w-full h-full">
                  {schedules.map((data, key) => (
                    <div
                      key={key}
                      className={` col-span-1 row-span-1 rounded-lg border ${
                        data.status && "bg-black"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className=" px-4 flex gap-2">
                <p>Total Number of Schedules:20</p>
                <p> Completed: 2</p>
              </div>
            </div>
          </div>
          <div className=" row-span-1 col-span-2 ">
            <p className=" px-4 font-semibold w-full py-1">Notes</p>
            <div className=" h-[80%] flex gap-2 px-4">
              <div className=" relative w-2/3 flex border p-2 rounded-xl flex-col   ">
                <textarea className=" w-full h-4/5  rounded-xl border-none outline-none p-4"></textarea>
                <button className=" self-end px-4 text-sm border rounded-md py-1 bg-zinc-400">
                  Send
                </button>
              </div>
              <div className=" flex-1 rounded-xl  h-full border"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

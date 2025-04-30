"use client";

import { CountdownTimer } from "@/components/timer/CountdownTimer";
import MusicPlayer from "@/components/timer/MusicPlayer";
import QuoteGenerator from "@/components/timer/QuoteGenerator";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Pause,
  Play,
  Plus,
  Square,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TimerPage = () => {
  const router = useRouter();
  const [percentage, setPercentage] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTimerIndex, setSelectedTimerIndex] = useState(0);
  const [showTimerDropdown, setShowTimerDropdown] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  // Timer configurations
  const timerPresets = [
    { label: "1 hour", time: { hours: 1, minutes: 0, seconds: 0 } },
    { label: "1 minute", time: { hours: 0, minutes: 1, seconds: 0 } },
    { label: "2 seconds", time: { hours: 0, minutes: 0, seconds: 2 } },
  ];

  // Session tracking
  const totalSessions = 20;
  const sessions = Array(totalSessions)
    .fill(null)
    .map((_, i) => ({
      id: i,
      completed: i < completedSessions,
    }));

  // Current timer state
  const [currentTime, setCurrentTime] = useState(
    timerPresets[selectedTimerIndex].time
  );

  // Handle timer completion
  const handleTimerComplete = () => {
    if (completedSessions < totalSessions) {
      setCompletedSessions((prev) => prev + 1);
      handleReset();
    } else {
      console.log("All sessions completed");
    }
  };

  // Reset timer
  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(timerPresets[selectedTimerIndex].time);
    setPercentage(100);
  };

  // Update timer when preset changes
  useEffect(() => {
    setCurrentTime(timerPresets[selectedTimerIndex].time);
    handleReset();
  }, [selectedTimerIndex]);

  // Check for timer completion
  useEffect(() => {
    if (percentage === 0) {
      setIsRunning(false);
      handleTimerComplete();
    }
  }, [percentage]);

  return (
    <div className="flex justify-center w-full h-[85%]">
      <div className="flex flex-col w-2/3 h-full gap-4 p-4 mt-10 border rounded-2xl bg-zinc-900 border-zinc-700 shadow-lg">
        {/* Header */}
        <div className="flex items-center w-full gap-4 py-4">
          <button
            onClick={() => router.push("/pages/list")}
            className="p-1 rounded-full hover:bg-zinc-800"
          >
            <ArrowLeft size={20} className="text-zinc-200" />
          </button>
          <h1 className="text-xl font-medium text-zinc-100">Focus Timer</h1>
          <div className="flex-1 flex justify-end px-2 gap-1">
            <div className=" items-center gap-1 flex px-2 py-1 text-sm bg-slate-600 rounded-md border border-slate-700 ">
              Deep work{" "}
              <X size={16} className=" text-zinc-400 cursor-pointer" />
            </div>
            <div className=" flex justify-center items-center px-2 py-1 border border-zinc-800 rounded-md bg-zinc-800">
              <Plus size={18} className=" cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid w-full h-[85%] grid-cols-2 grid-rows-3 gap-4">
          {/* Timer Section */}
          <div className="relative flex flex-col items-center justify-center row-span-2 col-span-1">
            {/* Timer Preset Selector */}
            <div className="absolute top-0 right-0">
              <div className="relative">
                <button
                  onClick={() => setShowTimerDropdown(!showTimerDropdown)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border rounded-full text-zinc-200 border-zinc-600 bg-zinc-800 hover:bg-zinc-700"
                >
                  {timerPresets[selectedTimerIndex].label}
                  <ChevronDown size={16} />
                </button>

                {showTimerDropdown && (
                  <div className="absolute right-0 z-10 w-40 mt-2 overflow-hidden bg-zinc-800 border rounded-md shadow-lg border-zinc-700">
                    {timerPresets.map(
                      (preset, index) =>
                        index !== selectedTimerIndex && (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedTimerIndex(index);
                              setShowTimerDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-zinc-200 hover:bg-zinc-700"
                          >
                            {preset.label}
                          </button>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Timer Display */}
            <CountdownTimer
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              time={currentTime}
              setTime={setCurrentTime}
              setPercentage={setPercentage}
            />

            {/* Timer Controls */}
            <div className="flex gap-4 mt-6">
              {isRunning ? (
                <button
                  onClick={() => setIsRunning(false)}
                  className="p-3 rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
                >
                  <Pause size={20} />
                </button>
              ) : (
                <button
                  onClick={() => setIsRunning(true)}
                  className="p-3 rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
                >
                  <Play size={20} />
                </button>
              )}
              <button
                onClick={handleReset}
                className="p-3 rounded-full bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
              >
                <Square size={20} />
              </button>
            </div>

            {/* Next Session Indicator */}
            <div className="absolute flex items-center gap-2 right-4 top-1/2">
              <div className="text-right">
                <p className="text-sm font-medium text-zinc-200">
                  Next Session
                </p>
                <p className="text-xs text-zinc-400">5 min Break</p>
              </div>
              <ChevronRight size={18} className="text-zinc-400" />
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="row-span-2 col-span-1 p-4">
            <div className="flex flex-col h-full border rounded-xl border-zinc-700">
              <h2 className="p-4 text-lg font-semibold text-zinc-200">
                Sessions
              </h2>
              <div className="grid grid-cols-10 grid-rows-2 gap-2 p-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`aspect-square rounded-lg border ${
                      session.completed
                        ? "bg-blue-600 border-blue-700"
                        : "bg-zinc-800 border-zinc-700"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between p-4 mt-auto text-sm">
                <div className="text-zinc-400">
                  Completed:{" "}
                  <span className="font-medium text-zinc-200">
                    {completedSessions}
                  </span>
                </div>
                <div className="text-zinc-400">
                  Total:{" "}
                  <span className="font-medium text-zinc-200">
                    {totalSessions}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Quotes & Music */}
          <div className="row-span-1 col-span-2">
            <h2 className="px-4 py-2 text-lg font-semibold text-zinc-200">
              Quotes
            </h2>
            <div className="flex h-[80%] gap-4 px-4">
              <div className="w-2/3">
                <QuoteGenerator />
              </div>
              <div className="flex-1">
                <MusicPlayer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;

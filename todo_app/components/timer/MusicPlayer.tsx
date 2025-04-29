"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const tracks = [
  {
    title: "Focus Flow",
    src: "/audio/focus-flow.mp3",
    duration: "3:45",
  },
  {
    title: "Study Piano",
    src: "/audio/study-piano.mp3",
    duration: "5:20",
  },
  {
    title: "Rain Sounds",
    src: "/audio/rain-sounds.mp3",
    duration: "8:00",
  },
  {
    title: "White Noise",
    src: "/audio/white-noise.mp3",
    duration: "10:00",
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current
        ?.play()
        .catch((e) => console.error("Playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
      setIsMuted(!isMuted);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(clickPosition * 100);
  };

  // Update progress and time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate remaining time
  const remainingTime = duration - currentTime;

  return (
    <div className="flex flex-col h-full p-3">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={tracks[0]?.src} />

      {/* Track Info */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium text-zinc-200 truncate max-w-[140px]">
          {tracks[0]?.title || "No track"}
        </div>
        <div className="text-xs text-zinc-400">
          -{formatTime(remainingTime)}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        className="w-full bg-zinc-700 rounded-full h-1.5 mb-3 cursor-pointer"
      >
        <div
          className="bg-blue-500 h-1.5 rounded-full relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={togglePlay}
          className="p-1.5 rounded-full bg-zinc-700 hover:bg-zinc-600 transition"
        >
          {isPlaying ? (
            <Pause size={16} className="text-zinc-200" />
          ) : (
            <Play size={16} className="text-zinc-200" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-1 text-zinc-400 hover:text-zinc-200 transition"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

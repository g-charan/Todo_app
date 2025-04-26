import React, { useState } from 'react';

const AppPreferences = () => {
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [darkMode, setDarkMode] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(true);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">App Preferences</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Timer Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-zinc-400 mb-2">Pomodoro (min)</label>
              <input
                type="number"
                value={pomodoroDuration}
                onChange={(e) => setPomodoroDuration(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-2">Short Break (min)</label>
              <input
                type="number"
                value={shortBreakDuration}
                onChange={(e) => setShortBreakDuration(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-2">Long Break (min)</label>
              <input
                type="number"
                value={longBreakDuration}
                onChange={(e) => setLongBreakDuration(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Appearance</h3>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-zinc-100">Dark Mode</p>
              <p className="text-zinc-400 text-sm">Toggle between light and dark theme</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full p-1 transition ${darkMode ? 'bg-blue-600' : 'bg-zinc-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'transform translate-x-6' : ''}`}></div>
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Behavior</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-zinc-100">Auto-start Breaks</p>
                <p className="text-zinc-400 text-sm">Timer starts immediately when break begins</p>
              </div>
              <button
                onClick={() => setAutoStartBreaks(!autoStartBreaks)}
                className={`w-12 h-6 rounded-full p-1 transition ${autoStartBreaks ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoStartBreaks ? 'transform translate-x-6' : ''}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-zinc-100">Auto-start Pomodoros</p>
                <p className="text-zinc-400 text-sm">Timer starts immediately when pomodoro begins</p>
              </div>
              <button
                onClick={() => setAutoStartPomodoros(!autoStartPomodoros)}
                className={`w-12 h-6 rounded-full p-1 transition ${autoStartPomodoros ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoStartPomodoros ? 'transform translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default AppPreferences;
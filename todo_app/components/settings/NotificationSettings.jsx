import React, { useState } from 'react';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    pomodoroEnd: true,
    breakEnd: true,
    taskDue: true,
    dailySummary: false,
    weeklyReport: true,
    soundEnabled: true,
    desktopNotifications: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Timer Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-zinc-100">Pomodoro End</p>
                <p className="text-zinc-400 text-sm">Notify when a pomodoro session completes</p>
              </div>
              <button
                onClick={() => toggleSetting('pomodoroEnd')}
                className={`w-12 h-6 rounded-full p-1 transition ${settings.pomodoroEnd ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.pomodoroEnd ? 'transform translate-x-6' : ''}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-zinc-100">Break End</p>
                <p className="text-zinc-400 text-sm">Notify when a break period completes</p>
              </div>
              <button
                onClick={() => toggleSetting('breakEnd')}
                className={`w-12 h-6 rounded-full p-1 transition ${settings.breakEnd ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.breakEnd ? 'transform translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Task Notifications</h3>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-zinc-100">Task Due</p>
              <p className="text-zinc-400 text-sm">Notify when tasks are due soon</p>
            </div>
            <button
              onClick={() => toggleSetting('taskDue')}
              className={`w-12 h-6 rounded-full p-1 transition ${settings.taskDue ? 'bg-blue-600' : 'bg-zinc-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.taskDue ? 'transform translate-x-6' : ''}`}></div>
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Reports</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-zinc-100">Daily Summary</p>
                <p className="text-zinc-400 text-sm">Receive a daily productivity report</p>
              </div>
              <button
                onClick={() => toggleSetting('dailySummary')}
                className={`w-12 h-6 rounded-full p-1 transition ${settings.dailySummary ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.dailySummary ? 'transform translate-x-6' : ''}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-zinc-100">Weekly Report</p>
                <p className="text-zinc-400 text-sm">Receive a weekly productivity report</p>
              </div>
              <button
                onClick={() => toggleSetting('weeklyReport')}
                className={`w-12 h-6 rounded-full p-1 transition ${settings.weeklyReport ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.weeklyReport ? 'transform translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-zinc-100">Enable Sounds</p>
                <p className="text-zinc-400 text-sm">Play sounds for notifications</p>
              </div>
              <button
                onClick={() => toggleSetting('soundEnabled')}
                className={`w-12 h-6 rounded-full p-1 transition ${settings.soundEnabled ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.soundEnabled ? 'transform translate-x-6' : ''}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-zinc-100">Desktop Notifications</p>
                <p className="text-zinc-400 text-sm">Show desktop notifications</p>
              </div>
              <button
                onClick={() => toggleSetting('desktopNotifications')}
                className={`w-12 h-6 rounded-full p-1 transition ${settings.desktopNotifications ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.desktopNotifications ? 'transform translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
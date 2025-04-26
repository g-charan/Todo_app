import React, { useState } from 'react';

const DangerZone = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Danger Zone</h2>
      
      <div className="space-y-6">
        <div className="border border-red-500 rounded-lg p-4">
          <h3 className="text-lg font-medium text-red-500 mb-2">Export Data</h3>
          <p className="text-zinc-400 mb-4">Download all your tasks, timers, and settings as a backup</p>
          <button className="bg-red-500/10 text-red-500 px-4 py-2 rounded-md hover:bg-red-500/20 transition border border-red-500/50">
            Export All Data
          </button>
        </div>
        
        <div className="border border-red-500 rounded-lg p-4">
          <h3 className="text-lg font-medium text-red-500 mb-2">Reset All Data</h3>
          <p className="text-zinc-400 mb-4">This will delete all your tasks, timers, and settings</p>
          <button className="bg-red-500/10 text-red-500 px-4 py-2 rounded-md hover:bg-red-500/20 transition border border-red-500/50">
            Reset Everything
          </button>
        </div>
        
        <div className="border border-red-500 rounded-lg p-4">
          <h3 className="text-lg font-medium text-red-500 mb-2">Delete Account</h3>
          <p className="text-zinc-400 mb-4">Permanently delete your account and all associated data</p>
          
          {!showDeleteConfirmation ? (
            <button 
              onClick={() => setShowDeleteConfirmation(true)}
              className="bg-red-500/10 text-red-500 px-4 py-2 rounded-md hover:bg-red-500/20 transition border border-red-500/50"
            >
              Delete Account
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-zinc-100">Are you sure you want to delete your account? This action cannot be undone.</p>
              <div className="flex gap-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                  Confirm Deletion
                </button>
                <button 
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="bg-zinc-800 text-zinc-100 px-4 py-2 rounded-md hover:bg-zinc-700 transition border border-zinc-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
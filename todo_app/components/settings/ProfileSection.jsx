import React from 'react';

const ProfileSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4 flex items-center justify-center text-3xl">
            👤
          </div>
          <button className="text-sm text-blue-500 hover:text-blue-400">
            Change Avatar
          </button>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-zinc-400 mb-2">Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-zinc-400 mb-2">Bio</label>
            <textarea
              defaultValue="Productivity enthusiast focused on deep work"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
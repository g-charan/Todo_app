import React from 'react';

const AccountSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Email Address</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-zinc-800 text-zinc-100 px-4 py-2 rounded-md border border-zinc-700 hover:bg-zinc-700 transition whitespace-nowrap">
              Change Email
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Update Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
const FocusSessions = () => {
  const sessions = [
    { day: "Mon", completed: 4, goal: 5 },
    { day: "Tue", completed: 5, goal: 5 },
    { day: "Wed", completed: 3, goal: 5 },
    { day: "Thu", completed: 6, goal: 5 },
    { day: "Fri", completed: 4, goal: 5 },
    { day: "Sat", completed: 2, goal: 3 },
    { day: "Sun", completed: 1, goal: 3 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Focus Sessions</h2>

      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-300">{session.day}</span>
              <span className="text-zinc-400">
                {session.completed}/{session.goal}
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full overflow-hidden h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                style={{
                  width: `${(session.completed / session.goal) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-800">
        <div className="flex justify-between">
          <div>
            <p className="text-zinc-400 text-sm">Weekly Average</p>
            <p className="text-xl font-medium">3.6/4.3</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-400 text-sm">Completion Rate</p>
            <p className="text-xl font-medium text-green-400">83%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusSessions;

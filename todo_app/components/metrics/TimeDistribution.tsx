const TimeDistribution = () => {
  const categories = [
    { name: "Deep Work", value: 12, color: "bg-blue-500" },
    { name: "Meetings", value: 8, color: "bg-purple-500" },
    { name: "Email", value: 5, color: "bg-indigo-500" },
    { name: "Planning", value: 4, color: "bg-violet-500" },
    { name: "Break", value: 6, color: "bg-zinc-600" },
  ];

  const totalHours = categories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Time Distribution (hrs)</h2>

      <div className="space-y-4 mb-8">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-zinc-300 text-sm">{category.name}</div>
            <div className="flex-1 flex items-center">
              <div
                className={`h-4 rounded-full ${category.color}`}
                style={{ width: `${(category.value / totalHours) * 100}%` }}
              ></div>
              <span className="ml-2 text-zinc-400 text-sm">
                {category.value}h
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t border-zinc-800">
        <div>
          <p className="text-zinc-400 text-sm">Total Tracked</p>
          <p className="text-xl font-medium">{totalHours}h</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-400 text-sm">Most Time Spent</p>
          <p className="text-xl font-medium">Deep Work</p>
        </div>
      </div>
    </div>
  );
};

export default TimeDistribution;

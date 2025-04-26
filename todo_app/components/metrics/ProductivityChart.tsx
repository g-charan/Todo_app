const ProductivityChart = () => {
  // Mock data - in a real app, you would use a charting library like Chart.js
  const productivityData = [65, 59, 80, 81, 56, 72, 45];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxValue = Math.max(...productivityData);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Weekly Productivity</h2>
        <select className="bg-zinc-800 text-zinc-100 border border-zinc-700 rounded px-3 py-1 text-sm">
          <option>This Week</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="h-64 flex items-end gap-2 mt-8">
        {productivityData.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-zinc-600 to-zinc-400 rounded-t-sm"
              style={{ height: `${(value / maxValue) * 100}%` }}
            ></div>
            <span className="text-xs text-zinc-400 mt-2">{days[index]}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 text-sm text-zinc-400">
        <span>Low</span>
        <span>Productivity Score</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default ProductivityChart;

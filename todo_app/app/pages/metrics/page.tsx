import FocusSessions from "@/components/metrics/FocusSessions";
import ProductivityChart from "@/components/metrics/ProductivityChart";
import TaskCompletion from "@/components/metrics/TaskCompletion";
import TimeDistribution from "@/components/metrics/TimeDistribution";

const MetricsPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-12">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Your Productivity Metrics</h1>
          <p className="text-zinc-400">
            Track and optimize your performance over time
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <ProductivityChart />
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <TimeDistribution />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <FocusSessions />
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <TaskCompletion />
          </div>
        </div>

        <div className="mt-8 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Weekly Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Peak Hours"
              value="9-11 AM"
              change="+12% efficiency"
              positive
            />
            <MetricCard
              title="Distractions"
              value="3.2 avg/day"
              change="-18% from last week"
              positive
            />
            <MetricCard
              title="Deep Work"
              value="2.1 hrs/day"
              change="+27% from last week"
              positive
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, positive }: any) => {
  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <h3 className="text-zinc-400 text-sm mb-1">{title}</h3>
      <p className="text-xl font-medium mb-1">{value}</p>
      <p className={`text-sm ${positive ? "text-green-400" : "text-red-400"}`}>
        {change}
      </p>
    </div>
  );
};

export default MetricsPage;

const Features = () => {
  const features = [
    {
      icon: "⏱️",
      title: "Focus Timer",
      description:
        "Boost productivity with customizable Pomodoro timers and focus sessions.",
    },
    {
      icon: "✅",
      title: "Task Management",
      description: "Organize your to-dos with priority levels and due dates.",
    },
    {
      icon: "🔔",
      title: "Smart Reminders",
      description:
        "Never miss important events with intelligent notifications.",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Visualize your productivity trends and accomplishments.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-zinc-100 mb-12">
          One Tool for All Your Productivity Needs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition"
            >
              <div className="text-3xl mb-4 text-zinc-300">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-100">
                {feature.title}
              </h3>
              <p className="text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

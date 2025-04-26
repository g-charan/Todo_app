const Hero = () => {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
          Get It Done with <span className="text-zinc-300">GID</span>
        </h1>
        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          The all-in-one productivity app to manage your focus sessions, tasks,
          and reminders. Achieve more with less stress.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 w-full sm:w-80 placeholder-zinc-500"
          />
          <button className="bg-zinc-100 text-zinc-900 px-6 py-3 rounded-md hover:bg-white transition whitespace-nowrap font-medium">
            Start for Free
          </button>
        </div>
        <div className="mt-12 border border-zinc-800 rounded-xl overflow-hidden max-w-4xl mx-auto">
          <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
          </div>
          <div className="bg-zinc-900 p-8 h-64 flex items-center justify-center">
            <div className="text-zinc-500">App preview coming soon</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

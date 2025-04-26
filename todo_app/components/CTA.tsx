const CTA = () => {
  return (
    <section className="bg-zinc-900 text-zinc-100 py-16 border-t border-zinc-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to boost your productivity?
        </h2>
        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are getting more done with GID.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <button className="bg-zinc-100 text-zinc-900 px-8 py-3 rounded-md font-semibold hover:bg-white transition">
            Get Started - It's Free
          </button>
          <button className="border border-zinc-700 text-zinc-100 px-8 py-3 rounded-md hover:bg-zinc-800 transition">
            See Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;

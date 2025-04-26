const Navbar = () => {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-zinc-100">GID</div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-zinc-400 hover:text-zinc-100 transition"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-zinc-400 hover:text-zinc-100 transition"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-zinc-400 hover:text-zinc-100 transition"
          >
            About
          </a>
          <a
            href="/login"
            className="text-zinc-400 hover:text-zinc-100 transition"
          >
            Login
          </a>
        </div>
        <button className="bg-zinc-100 text-zinc-900 px-4 py-2 rounded-md hover:bg-white transition font-medium">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

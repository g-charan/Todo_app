import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
const page = () => {
  return (
    <div className="min-h-screen font-sans bg-zinc-950 text-zinc-100">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <footer className="bg-zinc-900 py-8 text-center text-zinc-400 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} GID. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-zinc-400 hover:text-zinc-100">
              Privacy
            </a>
            <a href="#" className="text-zinc-400 hover:text-zinc-100">
              Terms
            </a>
            <a href="#" className="text-zinc-400 hover:text-zinc-100">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;

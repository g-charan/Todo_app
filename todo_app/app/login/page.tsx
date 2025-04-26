import LoginForm from "@/components/auth/LoginForm";
import SocialAuth from "@/components/auth/SocialAuth";

const page = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back to <span className="text-zinc-300">GID</span>
          </h1>
          <p className="text-zinc-400">Get back to being productive</p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-lg">
          <LoginForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-zinc-900 text-zinc-400">
                or continue with
              </span>
            </div>
          </div>

          <SocialAuth />

          <div className="mt-6 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Sign up
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default page;

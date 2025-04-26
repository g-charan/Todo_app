import { GitHubIcon, GoogleIcon } from "./AuthIcons";

const SocialAuth = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-zinc-700 rounded-md shadow-sm bg-zinc-800 text-sm font-medium text-zinc-100 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <GoogleIcon className="h-5 w-5" />
        <span className="ml-2">Google</span>
      </button>

      <button
        type="button"
        className="w-full inline-flex justify-center py-2 px-4 border border-zinc-700 rounded-md shadow-sm bg-zinc-800 text-sm font-medium text-zinc-100 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <GitHubIcon className="h-5 w-5" />
        <span className="ml-2">GitHub</span>
      </button>
    </div>
  );
};

export default SocialAuth;

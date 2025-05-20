"use client";
import { useAuth } from "@/components/context/auth";
import {
  ChartColumn,
  ChevronDown,
  House,
  LogOut,
  Settings,
  Sun,
  SunMoon,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ElegantClock from "../timer/ElegantClock";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userMenu, setUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenu(false);
  };
  return (
    <div className="flex w-full items-center justify-center">
      <div className="px-8 py-4 rounded-full flex items-center justify-between w-1/3 border bg-zinc-900 border-zinc-700">
        <Link href={"/pages/list"}>
          <House className="hover:cursor-pointer" />
        </Link>
        <Link href={"/pages/metrics"}>
          <ChartColumn className="hover:cursor-pointer" />
        </Link>
        <Link href={""}>
          {darkMode ? (
            <SunMoon
              className="hover:cursor-pointer transition-all duration-300"
              onClick={() => setDarkMode(!darkMode)}
            />
          ) : (
            <Sun
              className="hover:cursor-pointer transition-all duration-300"
              onClick={() => setDarkMode(!darkMode)}
            />
          )}
        </Link>
        <Link href={"/pages/settings"}>
          <Settings className="hover:cursor-pointer" />
        </Link>

        <div className="relative border border-zinc-800 px-2 rounded-xl gap-4 flex">
          <p className="text-sm self-center p-1">{user?.name || "User"}</p>
          <ChevronDown
            size={18}
            className="self-center cursor-pointer"
            onClick={() => setUserMenu(!userMenu)}
          />
          {userMenu && (
            <div className="absolute left-0 text-zinc-100 bg-zinc-800 w-[10rem] mt-7 z-10 rounded-xl shadow-lg flex flex-col gap-2 p-4">
              <div className="flex flex-col gap-2">
                <button
                  className="flex items-center gap-2 hover:bg-zinc-700 p-2 rounded-md transition-colors"
                  onClick={() => router.push("/pages/profile")}
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button
                  className="flex items-center gap-2 hover:bg-zinc-700 p-2 rounded-md transition-colors"
                  onClick={() => router.push("/pages/settings")}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button
                  className="flex items-center gap-2 hover:bg-zinc-700 p-2 rounded-md transition-colors text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute right-5">
        <ElegantClock />
      </div>
    </div>
  );
};

export default Navbar;

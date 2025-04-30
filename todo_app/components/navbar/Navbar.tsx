"use client";
import {
  ChartColumn,
  ChevronDown,
  House,
  Settings,
  Sun,
  SunMoon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [users, setUsers] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className=" flex w-full items-center justify-center ">
      <div className=" px-8 py-4 rounded-full flex items-center justify-between w-1/3 border bg-zinc-900 border-zinc-700">
        <Link href={"/pages/list"}>
          <House className=" hover:cursor-pointer" />
        </Link>
        <Link href={"/pages/metrics"}>
          <ChartColumn className=" hover:cursor-pointer" />
        </Link>
        <Link href={""}>
          {darkMode ? (
            <SunMoon
              className=" hover:cursor-pointer transition-all duration-300"
              onClick={() => setDarkMode(!darkMode)}
            />
          ) : (
            <Sun
              className=" hover:cursor-pointer transition-all duration-300"
              onClick={() => setDarkMode(!darkMode)}
            />
          )}
        </Link>
        <Link href={"/pages/settings"}>
          <Settings className=" hover:cursor-pointer" />
        </Link>

        <div className=" relative border border-zinc-800 px-2 rounded-xl gap-4 flex">
          <p className=" text-sm self-center p-1">Charan Gutti</p>
          <ChevronDown
            size={18}
            className=" self-center cursor-pointer"
            onClick={() => setUsers(!users)}
          />
          {users && (
            <div className=" absolute  left-0 text-black bg-white w-[10rem] mt-7 z-10 rounded-xl shadow-lg flex flex-col gap-4 p-4">
              <div className=" flex flex-col gap-4 ">
                <p>Profile</p>
                <p>Settings</p>
                <p>Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

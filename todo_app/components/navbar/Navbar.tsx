"use client";
import {
  ChartColumn,
  ChevronDown,
  House,
  Settings,
  SunMoon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [users, setUsers] = useState(false);
  return (
    <div className=" flex w-full justify-center ">
      <div className=" px-8 py-4 rounded-full flex justify-between w-1/3 border bg-zinc-900 border-zinc-700">
        <Link href={"/pages/list"}>
          <House className=" hover:cursor-pointer" />
        </Link>
        <Link href={"/pages/metrics"}>
          <ChartColumn className=" hover:cursor-pointer" />
        </Link>
        <Link href={""}>
          <SunMoon className=" hover:cursor-pointer" />
        </Link>
        <Link href={"/pages/settings"}>
          <Settings className=" hover:cursor-pointer" />
        </Link>

        <div className=" relative border px-2 rounded-xl gap-4 flex">
          <p>Charan Gutti</p>
          <ChevronDown
            size={18}
            className=" self-center"
            onClick={() => setUsers(!users)}
          />
          {users && (
            <div className=" absolute  left-0 bg-white w-[10rem] mt-7 z-10 rounded-xl shadow-lg flex flex-col gap-4 p-4">
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

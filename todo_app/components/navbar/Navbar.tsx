import {
  ChartColumn,
  ChevronDown,
  House,
  Settings,
  SunMoon,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" flex w-full justify-center ">
      <div className=" px-8 py-4 rounded-full flex justify-between w-1/3 border-2">
        <Link href={"/pages/list"}>
          <House className=" hover:cursor-pointer" />
        </Link>
        <Link href={""}>
          <ChartColumn className=" hover:cursor-pointer" />
        </Link>
        <Link href={""}>
          <SunMoon className=" hover:cursor-pointer" />
        </Link>
        <Link href={""}>
          <Settings className=" hover:cursor-pointer" />
        </Link>

        <div className=" border px-2 rounded-xl gap-4 flex">
          <p>Charan Gutti</p>
          <ChevronDown size={18} className=" self-center" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

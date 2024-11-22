import {
  ChartColumn,
  ChevronDown,
  House,
  Settings,
  SunMoon,
} from "lucide-react";

const Navbar = () => {
  return (
    <div className=" flex w-full justify-center ">
      <div className=" px-8 py-4 rounded-full flex justify-between w-1/3 border-2">
        <House className=" hover:cursor-pointer" />
        <ChartColumn className=" hover:cursor-pointer" />
        <SunMoon className=" hover:cursor-pointer" />
        <Settings className=" hover:cursor-pointer" />

        <div className=" border px-2 rounded-xl gap-4 flex">
          <p>Charan Gutti</p>
          <ChevronDown size={18} className=" self-center" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

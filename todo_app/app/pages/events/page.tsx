"use client";

import Calendar from "@/components/calendar/Calendar";
import CustomDialog from "@/components/dialog/CustomDialog";
import {
  ArrowLeft,
  ChevronDown,
  ListFilter,
  Pencil,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const route = useRouter();
  const [number, setNumber] = useState<any>(0);
  const [showDialog, setShowDialog] = useState(false);
  const Items = [
    { name: "Charan's Birthday", pos: 1 },
    { name: "Task 1", pos: 2 },
    { name: "Task 1", pos: 3 },
    { name: "Task 1", pos: 4 },
  ];
  const HandleEnter = (data: any) => {
    setNumber(data.pos);
    console.log(data.pos);
  };

  const CustomElement2 = () => {
    return (
      <>
        <div className="flex justify-between w-full px-4 py-2 gap-1">
          <Calendar className="text-black w-1/2 " />
          <div>
            <input
              type="text"
              className=" w-full border-b p-2 outline-none text-black"
              placeholder="smtg"
            ></input>
            <input
              type="text"
              className=" w-full border-b p-2 outline-none text-black"
              placeholder="Category"
            ></input>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex w-full h-[85%] justify-center ">
      <div className="w-2/3 bg-zinc-900 mt-10 flex border border-zinc-700 rounded-2xl shadow-lg px-4  h-full flex-col gap-4">
        <div className=" border-b border-zinc-800 py-4 gap-8 w-full flex">
          <ArrowLeft
            size={20}
            onClick={() => route.push("/pages/list")}
            className=" hover:cursor-pointer self-center"
          />
          <p> Simple EVENT List</p>
        </div>
        <CustomDialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          CustomElement2={<CustomElement2 />}
        ></CustomDialog>
        <div className="w-full py-4  px-10">
          <div className="  flex justify-center w-full gap-8 h-fit ">
            <button
              className=" px-8 border hover:scale-[102%] rounded-md py-4 text-lg"
              onClick={() => setShowDialog(true)}
            >
              Add a new Event
            </button>
          </div>
        </div>
        <div className="w-full py-4  px-10">
          <div className=" flex justify-end w-full ">
            <div className=" self-end flex gap-4">
              <button className=" hover:bg-zinc-200 px-6 flex gap-2 py-1 border text-sm rounded-xl">
                <ListFilter size={16} className=" self-center" />
                <p>Filter</p>
              </button>
              <button className=" px-4 hover:bg-zinc-200 flex gap-2 py-1 border text-sm rounded-xl">
                <p>All Time</p>
                <ChevronDown size={16} className=" self-center" />
              </button>
              <button className=" px-4 hover:bg-zinc-200 flex gap-2 py-1 border text-sm rounded-xl">
                <p>Sort by</p>
                <ChevronDown size={16} className=" self-center" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 overflow-auto py-2 px-4 w-full ">
          {Items.map((data, key) => (
            <div
              key={key}
              onMouseOver={() => HandleEnter(data)}
              className="  px-8 rounded-xl hover:scale-[101%] transition-all duration-100 cursor-pointer flex justify-between relative border border-zinc-500 py-4 "
            >
              <div className="flex gap-4">
                <p className=" self-center text-base">{data.name}</p>
                <p className=" text-xs opacity-65 text-gray-400 self-center font-semibold">
                  19-11-2022
                </p>
              </div>
              <div className=" absolute left-[20%]  w-2/3 px-2 flex justify-center">
                <div className=" flex justify-center w-fit rounded-lg py-[0.1rem] px-2 bg-green-200">
                  <p className=" text-green-600 font-medium text-sm">
                    BIRTHDAY
                  </p>
                </div>
              </div>
              {data.pos == number && (
                <div className={`flex gap-4  h-full w-2/3 justify-end`}>
                  <button className=" hover:scale-110 hover:bg-zinc-200 border px-4 rounded-lg text-sm">
                    <Pencil size={18} />
                  </button>
                  <button className=" hover:scale-110 hover:bg-zinc-200 border px-4 rounded-lg text-sm">
                    <Trash size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

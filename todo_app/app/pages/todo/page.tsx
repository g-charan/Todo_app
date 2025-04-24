"use client";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  ListFilter,
  Pencil,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const page = () => {
  const route = useRouter();
  const [number, setNumber] = useState<any>(0);
  const [text, setText] = useState("");
  const Items = [
    { name: "Task 1", pos: 1 },
    { name: "Task 1", pos: 2 },
    { name: "Task 1", pos: 3 },
    { name: "Task 1", pos: 4 },
  ];
  const mouseRef = useRef<any>();

  const HandleEnter = (data: any) => {
    setNumber(data.pos);
    console.log(data.pos);
  };

  const HandleLeave = () => {
    setTimeout(() => {
      setNumber(0);
    }, 100);
  };

  return (
    <div className="flex w-full h-[85%] justify-center ">
      <div className="w-2/3 mt-10 flex border border-zinc-700 rounded-2xl shadow-lg px-4  h-full flex-col gap-4">
        <div className=" border-b border-zinc-800 py-4 gap-8 w-full flex">
          <ArrowLeft
            size={20}
            onClick={() => route.push("/pages/list")}
            className=" hover:cursor-pointer self-center"
          />
          <span className=" text-lg ">Simple TODO list</span>
        </div>
        <div className="w-full py-4  px-10">
          <div className="  flex justify-center w-full gap-8 h-fit ">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className=" w-2/3 border-b px-2 py-1 outline-none text-zinc-900 rounded-md"
              placeholder="Title/Heading"
            ></input>
            <button className=" px-8 border hover:scale-[102%] rounded-xl">
              Add
            </button>
          </div>
        </div>
        <div className="w-full py-2  px-10">
          <div className="relative flex justify-end w-full ">
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
            <div className="absolute -bottom-8 right-0 flex text-center items-center gap-1">
              <p className=" font-light italic text-xs text-zinc-500 ">
                Total number of tasks is
              </p>
              <p className=" text-sm text-zinc-300">20</p>
            </div>
          </div>
        </div>
        <div className=" relative flex flex-col gap-2 overflow-auto py-2 px-4 w-full ">
          {Items.map((data, key) => (
            <div
              ref={mouseRef}
              key={key}
              onMouseOver={() => HandleEnter(data)}
              className="  px-8 rounded-md hover:scale-[101%] transition-all duration-100 cursor-pointer flex justify-between relative border py-2 "
            >
              <p className=" ">{data.name}</p>
              <div className=" absolute left-[45%]"></div>
              {data.pos == number && (
                <div className={`flex gap-4  h-full w-2/3 justify-end`}>
                  <button className=" hover:scale-110 hover:bg-zinc-200 border px-4 rounded-lg text-sm">
                    <Check size={18} />
                  </button>
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

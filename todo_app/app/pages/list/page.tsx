"use client";
import CustomDialog from "@/components/dialog/CustomDialog";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CustomElement2 = () => {
  return <>SMTG</>;
};

const page = () => {
  const RedElement = () => {
    return (
      <div className="absolute right-5 bottom-4 flex gap-1">
        <div className=" self-center  h-3 w-3 shadow-lg shadow-red-400 bg-red-600 rounded-full"></div>
        <p className=" text-xs font-semibold">TODO</p>
      </div>
    );
  };
  const GreenElement = () => {
    return (
      <div className="absolute right-5 bottom-4 flex gap-1">
        <div className=" self-center  h-3 w-3 shadow-lg shadow-green-400 bg-green-600 rounded-full"></div>
        <p className=" text-xs font-semibold">TIMER</p>
      </div>
    );
  };
  const YellowElement = () => {
    return (
      <div className="absolute right-5 bottom-4 flex gap-1">
        <div className=" self-center  h-3 w-3 shadow-lg shadow-yellow-400 bg-yellow-600 rounded-full"></div>
        <p className=" text-xs font-semibold">EVENTS</p>
      </div>
    );
  };
  const [show, setShow] = useState(false);
  const Items = [
    { name: "Simple Todo app", type: "todo", element: <RedElement /> },
    { name: "Simple Timer app", type: "timer", element: <GreenElement /> },
    { name: "Simple Event app", type: "events", element: <YellowElement /> },
  ];
  return (
    <div className=" flex w-full justify-center ">
      <CustomDialog
        showDialog={show}
        setShowDialog={setShow}
        CustomElement2={<CustomElement2 />}
      />
      <div className="w-2/3 mt-10 flex flex-col gap-4">
        <div className="self-end px-4">
          <button
            className="flex gap-4 py-2 border rounded-lg px-6"
            onClick={() => setShow(true)}
          >
            <p>Add New List</p>
            <Plus size={20} className=" self-center" />
          </button>
        </div>
        {Items.map((data, key) => (
          <Link href={data.type ? data.type : ""} key={key}>
            <div
              key={key}
              className=" flex flex-col gap-1 px-4 rounded-3xl hover:scale-[102%] transition-all duration-100 cursor-pointer relative border-2 py-6"
            >
              <p className=" text-lg">{data.name}</p>
              <p className=" text-sm font-semibold">
                This is my personal todo list
              </p>
              {data.element}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;

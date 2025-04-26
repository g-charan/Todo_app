"use client";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type props = {
  showDialog: any;
  setShowDialog: any;
  CustomElement2: any;
};

const CustomDialog = ({ showDialog, setShowDialog, CustomElement2 }: props) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const boxRef = useRef<any>();

  const handler = (e: any) => {
    if (!boxRef.current.contains(e.target)) {
      setShowDialog(false);
      console.log(showDialog);
    }
  };

  useEffect(() => {}, [handler]);
  return (
    <dialog
      open={false}
      className={`flex justify-center ${
        !showDialog && "hidden"
      } absolute top-0 ${
        darkTheme && "bg-zinc-950"
      } bg-gray-800 bg-opacity-80 w-[100vw] z-10 h-[100vh]`}
      onClick={(e) => handler(e)}
    >
      <div className=" self-center">
        <div
          className={`bg-white rounded-xl ${
            darkTheme && "bg-zinc-900 text-white"
          }`}
          ref={boxRef}
        >
          <div className=" w-[42rem] h-[30rem]">
            <div
              className={`w-full justify-between pl-2 pb-2 border-b-[1px] pr-3 pt-2 flex ${
                darkTheme && " border-zinc-700"
              }`}
            >
              <p> </p>
              <p>Enter New Bill</p>
              <X
                className=" hover:cursor-pointer "
                onClick={() => setShowDialog(false)}
              />
            </div>
            {/* <CustomInputField2 placeholder={"Input"} mainClassName={"w-full"} /> */}
            {CustomElement2}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CustomDialog;

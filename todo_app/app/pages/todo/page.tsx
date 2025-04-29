"use client";

import { deleteTodo, getData, postTodo } from "@/components/server/todo";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ListFilter,
  Pencil,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [hoveredPos, setHoveredPos] = useState<number | null>(null);
  const [newTask, setNewTask] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const mouseRef = useRef(null);

  const fetchTodos = async () => {
    const todoList = await getData();
    setItems(todoList);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const { isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getData,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const addTodo = async (name: string) => {
    if (!name.trim()) {
      alert("Please enter a task");
      return;
    }
    const res = await postTodo(name);
    if (res === "success") {
      fetchTodos();
      setNewTask("");
    }
  };

  const removeTodo = async (pos: number) => {
    const res = await deleteTodo(pos);
    if (res === "success") fetchTodos();
  };

  return (
    <div className="flex justify-center items-start  w-full bg-zinc-950 text-white px-4 pt-10  h-[85%] ">
      <div className="w-2/3  bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-zinc-700 pb-4">
          <ArrowLeft
            size={20}
            onClick={() => router.push("/pages/list")}
            className="cursor-pointer hover:text-zinc-400 transition"
          />
          <h1 className="text-xl font-semibold">Simple TODO List</h1>
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="Enter a new task"
            className="w-full sm:w-2/3 px-4 py-2 rounded-lg border border-zinc-600 bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <button
            onClick={() => addTodo(newTask)}
            className="px-6 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
          >
            Add
          </button>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center text-sm text-zinc-400 border-b border-zinc-700 pb-4">
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-1 border border-zinc-600 rounded-md hover:bg-zinc-800 transition">
              <ListFilter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-1 border border-zinc-600 rounded-md hover:bg-zinc-800 transition">
              All Time <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-1 border border-zinc-600 rounded-md hover:bg-zinc-800 transition">
              Sort by <ChevronDown size={16} />
            </button>
          </div>
          <div className="italic text-xs">
            Total tasks: <span className="font-medium">{items.length}</span>
          </div>
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
          {items.map((item, key) => (
            <div
              key={key}
              onMouseEnter={() => setHoveredPos(item.pos)}
              onMouseLeave={() => setHoveredPos(null)}
              className="flex justify-between items-center px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition group"
            >
              <span className="truncate">{item.name}</span>

              {hoveredPos === item.pos && (
                <div className="flex gap-3">
                  <button className="p-2 rounded-md hover:bg-zinc-600 transition">
                    <Check size={18} />
                  </button>
                  <button className="p-2 rounded-md hover:bg-zinc-600 transition">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => removeTodo(item.pos)}
                    className="p-2 rounded-md hover:bg-red-500 transition"
                  >
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

export default Page;

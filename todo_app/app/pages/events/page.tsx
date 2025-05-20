"use client";

import Calendar from "@/components/calendar/Calendar";
import CustomDialog from "@/components/dialog/CustomDialog";
import EventCategoryBadge from "@/components/events/EventCategoryBadge";
import {
  ArrowLeft,
  ChevronDown,
  ListFilter,
  Pencil,
  Plus,
  Trash,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Event = {
  id: string;
  name: string;
  date: string;
  category: "BIRTHDAY" | "MEETING" | "TASK" | "REMINDER";
};

const EventsPage = () => {
  const router = useRouter();
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Sample events data - replace with actual data fetching
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Charan's Birthday",
      date: "2022-11-19",
      category: "BIRTHDAY",
    },
    { id: "2", name: "Team Meeting", date: "2022-11-20", category: "MEETING" },
    { id: "3", name: "Project Deadline", date: "2022-11-25", category: "TASK" },
    {
      id: "4",
      name: "Doctor Appointment",
      date: "2022-11-28",
      category: "REMINDER",
    },
  ]);

  const EventForm = () => (
    <div className="flex flex-col w-full gap-4 p-4 text-black">
      <div className="flex gap-4">
        <Calendar className="w-1/2 border rounded-lg p-2" />
        <div className="flex flex-col w-1/2 gap-3">
          <input
            type="text"
            className="w-full p-2 border-b outline-none"
            placeholder="Event name"
          />
          <select className="w-full p-2 border-b outline-none">
            <option value="">Select category</option>
            <option value="BIRTHDAY">Birthday</option>
            <option value="MEETING">Meeting</option>
            <option value="TASK">Task</option>
            <option value="REMINDER">Reminder</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 text-sm border rounded-lg hover:bg-zinc-100 hover:text-black text-white"
          onClick={() => setShowDialog(false)}
        >
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Event
        </button>
      </div>
    </div>
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex justify-center w-full h-[85%]">
      <div className="flex flex-col w-2/3 h-full gap-4 p-4 mt-10 border rounded-2xl bg-zinc-900 border-zinc-700 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-4 py-4 border-b border-zinc-800">
          <button
            onClick={() => router.push("/pages/list")}
            className="p-1 rounded-full hover:bg-zinc-800 text-zinc-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-medium text-zinc-200">Event List</h1>
          <div className="flex-1 flex justify-end px-2 gap-1">
            <div className=" items-center gap-1 flex px-2 py-1 text-sm bg-slate-600 rounded-md border border-slate-700 ">
              Deep work{" "}
              <X size={16} className=" text-zinc-400 cursor-pointer" />
            </div>
            <div className=" flex justify-center items-center px-2 py-1 border border-zinc-800 rounded-md bg-zinc-800">
              <Plus size={18} className=" cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Add Event Button */}
        <div className="flex justify-center px-6">
          <button
            onClick={() => setShowDialog(true)}
            className="px-6 py-3 text-lg font-medium border rounded-lg bg-blue-600 text-zinc-100 hover:bg-blue-700"
          >
            Add New Event
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col px-6 gap-2">
          <div className="flex justify-end gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
              <ListFilter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
              All Time
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
              Sort by
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {events.length === 0 ? (
            <div className="flex items-center justify-center h-full text-zinc-500">
              No events yet. Add your first event!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  onMouseEnter={() => setHoveredEventId(event.id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                  className="relative flex items-center justify-between p-4 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-750 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <p className="text-zinc-200">{event.name}</p>
                    <p className="text-xs text-zinc-400">
                      {formatDate(event.date)}
                    </p>
                  </div>

                  <div className="absolute left-1/3">
                    <EventCategoryBadge category={event.category} />
                  </div>

                  {hoveredEventId === event.id && (
                    <div className="flex gap-2">
                      <button className="p-2 rounded-md text-blue-500 hover:bg-zinc-700">
                        <Pencil size={18} />
                      </button>
                      <button className="p-2 rounded-md text-red-500 hover:bg-zinc-700">
                        <Trash size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Event Dialog */}
        <CustomDialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          // title="Add New Event"
          CustomElement2={<EventForm />}
        >
          {/* <EventForm /> */}
        </CustomDialog>
      </div>
    </div>
  );
};

export default EventsPage;

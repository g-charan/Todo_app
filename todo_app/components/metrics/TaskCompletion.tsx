const TaskCompletion = () => {
  const tasks = {
    completed: 24,
    overdue: 3,
    remaining: 7,
  };

  const totalTasks = tasks.completed + tasks.overdue + tasks.remaining;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Task Completion</h2>

      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          {/* Completed slice */}
          <div
            className="absolute inset-0 rounded-full border-[12px] border-green-500"
            style={{ clipPath: `circle(50% at 50% 50%)` }}
          ></div>
          {/* Overdue slice */}
          <div
            className="absolute inset-0 rounded-full border-[12px] border-red-500"
            style={{
              clipPath: `circle(50% at 50% 50%), 
                         polygon(50% 50%, 50% 0%, ${
                           50 +
                           50 *
                             Math.cos(
                               (2 * Math.PI * tasks.completed) / totalTasks
                             )
                         }% ${
                50 + 50 * Math.sin((2 * Math.PI * tasks.completed) / totalTasks)
              }%)`,
            }}
          ></div>
          {/* Remaining slice */}
          <div
            className="absolute inset-0 rounded-full border-[12px] border-zinc-600"
            style={{
              clipPath: `circle(50% at 50% 50%), 
                         polygon(50% 50%, 50% 0%, ${
                           50 +
                           50 *
                             Math.cos(
                               (2 *
                                 Math.PI *
                                 (tasks.completed + tasks.overdue)) /
                                 totalTasks
                             )
                         }% ${
                50 +
                50 *
                  Math.sin(
                    (2 * Math.PI * (tasks.completed + tasks.overdue)) /
                      totalTasks
                  )
              }%)`,
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold">
                {Math.round((tasks.completed / totalTasks) * 100)}%
              </p>
              <p className="text-zinc-400 text-sm">Completion</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-green-500">{tasks.completed}</p>
          <p className="text-zinc-400 text-sm">Completed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-500">{tasks.overdue}</p>
          <p className="text-zinc-400 text-sm">Overdue</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-zinc-400">{tasks.remaining}</p>
          <p className="text-zinc-400 text-sm">Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletion;

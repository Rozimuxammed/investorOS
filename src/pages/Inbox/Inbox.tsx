import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Check, Clock, AlertCircle, Search } from "lucide-react";

function Inbox() {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = state.tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !task.completed) ||
      (filter === "completed" && task.completed);
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCompleteTask = (taskId: string) => {
    dispatch({ type: "COMPLETE_TASK", payload: taskId });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-900/20";
      case "medium":
        return "text-[#FFCD58] bg-yellow-900/20";
      case "low":
        return "text-[#2CB67D] bg-green-900/20";
      default:
        return "text-gray-400 bg-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "review":
        return "📋";
      case "call":
        return "📞";
      case "research":
        return "🔍";
      case "follow-up":
        return "📧";
      default:
        return "📝";
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Inbox & Tasks
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7F5AF0]"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-full sm:w-auto bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F5AF0]"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">
            {state.tasks.length}
          </div>
          <div className="text-sm text-gray-400">Total Tasks</div>
        </div>
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#FFCD58]">
            {state.tasks.filter((t) => !t.completed).length}
          </div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-400">
            {
              state.tasks.filter((t) => !t.completed && t.priority === "high")
                .length
            }
          </div>
          <div className="text-sm text-gray-400">High Priority</div>
        </div>
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#2CB67D]">
            {state.tasks.filter((t) => t.completed).length}
          </div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Tasks</h2>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg transition-colors ${
                task.completed
                  ? "bg-green-900/10 border border-green-800"
                  : "bg-[#1A1A1A] hover:bg-gray-800"
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => !task.completed && handleCompleteTask(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? "bg-[#2CB67D] border-[#2CB67D]"
                    : "border-gray-600 hover:border-[#2CB67D]"
                }`}
              >
                {task.completed && <Check className="w-4 h-4 text-white" />}
              </button>

              {/* Task Info */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-lg">{getTypeIcon(task.type)}</span>
                  <h3
                    className={`font-medium break-words ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
                  <span>Due: {task.dueDate}</span>
                  <span>•</span>
                  <span>Assigned to: {task.assignee}</span>
                  {task.dealId && (
                    <>
                      <span>•</span>
                      <span>
                        Deal:{" "}
                        {state.deals.find((d) => d.id === task.dealId)?.name}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Priority + Status */}
              <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto">
                <span
                  className={`text-xs px-2 py-1 rounded ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>

                {!task.completed && (
                  <div className="flex items-center gap-1 text-gray-500">
                    {new Date(task.dueDate) < new Date() ? (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No tasks found
            </h3>
            <p className="text-gray-400">
              {filter === "all"
                ? "All tasks completed!"
                : `No ${filter} tasks.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;

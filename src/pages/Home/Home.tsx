import { useApp } from "../../context/AppContext";
import { AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const { state } = useApp();

  const priorityTasks = state.tasks
    .filter((task) => !task.completed)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })
    .slice(0, 3);

  const runwayAlerts = state.deals.filter((deal) => deal.runway < 12);
  const recentDeals = state.deals.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Morning Brief
        </h1>
        <div className="text-xs sm:text-sm text-gray-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Priority Tasks */}
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-[#FFCD58]" />
            <h2 className="text-lg font-semibold text-white">Priority Tasks</h2>
          </div>
          <div className="space-y-3">
            {priorityTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 bg-[#1A1A1A] rounded-lg"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{task.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Due: {task.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/inbox"
            className="block mt-4 text-sm text-[#7F5AF0] hover:text-purple-400 transition-colors"
          >
            View all tasks →
          </Link>
        </div>

        {/* Runway Alerts */}
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-white">Runway Alerts</h2>
          </div>
          <div className="space-y-3">
            {runwayAlerts.map((deal) => (
              <div
                key={deal.id}
                className="p-3 bg-red-900/20 border border-red-800 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    {deal.name}
                  </span>
                  <span className="text-xs text-red-400">
                    {deal.runway} months
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{deal.sector}</p>
              </div>
            ))}
          </div>
          <Link
            to="/portfolio"
            className="block mt-4 text-sm text-[#7F5AF0] hover:text-purple-400 transition-colors"
          >
            View portfolio →
          </Link>
        </div>

        {/* Top Deals */}
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#2CB67D]" />
            <h2 className="text-lg font-semibold text-white">Top Deals</h2>
          </div>
          <div className="space-y-3">
            {recentDeals.map((deal) => (
              <Link
                key={deal.id}
                to={`/diligence/${deal.id}`}
                className="block p-3 bg-[#1A1A1A] hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    {deal.name}
                  </span>
                  <span className="text-xs text-[#2CB67D] bg-green-900/20 px-2 py-1 rounded">
                    {deal.score}/10
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {deal.amount} • {deal.sector}
                </p>
              </Link>
            ))}
          </div>
          <Link
            to="/pipeline"
            className="block mt-4 text-sm text-[#7F5AF0] hover:text-purple-400 transition-colors"
          >
            View pipeline →
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">
            {state.deals.length}
          </div>
          <div className="text-sm text-gray-400">Active Deals</div>
        </div>
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#2CB67D]">
            {state.portfolio.length}
          </div>
          <div className="text-sm text-gray-400">Portfolio Companies</div>
        </div>
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#FFCD58]">
            {state.tasks.filter((t) => !t.completed).length}
          </div>
          <div className="text-sm text-gray-400">Pending Tasks</div>
        </div>
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#7F5AF0]">
            {state.people.length}
          </div>
          <div className="text-sm text-gray-400">Network Contacts</div>
        </div>
      </div>
    </div>
  );
}

export default Home;

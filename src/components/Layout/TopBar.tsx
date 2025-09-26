import { Bell, Search, User } from "lucide-react";

function TopBar() {
  return (
    <div className="h-16 bg-[#121212] border-b border-gray-800 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative hidden sm:block w-full max-w-xs lg:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search deals, people, tasks... (⌘K)"
            className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7F5AF0] transition-colors"
          />
        </div>

        <button className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFCD58] rounded-full"></span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#7F5AF0] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline text-sm font-medium text-white">
            Alex Chen
          </span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;

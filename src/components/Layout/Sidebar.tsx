import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  GitBranch,
  FileText,
  Briefcase,
  Network,
  Inbox,
  Settings,
  TrendingUp,
} from "lucide-react";

const navigation = [
  { name: "Morning Brief", href: "/", icon: Home },
  { name: "Pipeline", href: "/pipeline", icon: GitBranch },
  { name: "Diligence", href: "/diligence", icon: FileText },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Network", href: "/network", icon: Network },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Settings", href: "/settings", icon: Settings },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-[#121212] border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-8 h-8 text-[#7F5AF0]" />
          <span className="text-xl font-bold text-white">InvestorOS</span>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/" && location.pathname.startsWith(item.href));

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#7F5AF0] text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;

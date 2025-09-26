import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbMap: { [key: string]: string } = {
    "": "Morning Brief",
    pipeline: "Pipeline",
    diligence: "Diligence",
    portfolio: "Portfolio",
    network: "Network",
    inbox: "Inbox",
    settings: "Settings",
  };

  if (pathnames.length === 0) return null;

  return (
    <div className="px-6 py-3 border-b border-gray-800">
      <nav className="flex items-center space-x-2 text-sm">
        <Link
          to="/"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Home
        </Link>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbMap[pathname] || pathname;

          return (
            <React.Fragment key={pathname}>
              <ChevronRight className="w-4 h-4 text-gray-600" />
              {isLast ? (
                <span className="text-white font-medium">{displayName}</span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}

export default Breadcrumbs;

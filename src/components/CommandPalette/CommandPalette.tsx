import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { state } = useApp();

  const commands = [
    { id: "home", name: "Morning Brief", path: "/", category: "Navigation" },
    {
      id: "pipeline",
      name: "Pipeline",
      path: "/pipeline",
      category: "Navigation",
    },
    {
      id: "diligence",
      name: "Diligence",
      path: "/diligence",
      category: "Navigation",
    },
    {
      id: "portfolio",
      name: "Portfolio",
      path: "/portfolio",
      category: "Navigation",
    },
    {
      id: "network",
      name: "Network",
      path: "/network",
      category: "Navigation",
    },
    { id: "inbox", name: "Inbox", path: "/inbox", category: "Navigation" },
    ...state.deals.map((deal) => ({
      id: deal.id,
      name: deal.name,
      path: `/diligence/${deal.id}`,
      category: "Deals",
    })),
    ...state.people.map((person) => ({
      id: person.id,
      name: person.name,
      path: `/network`,
      category: "People",
    })),
  ];

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (command: (typeof commands)[0]) => {
    navigate(command.path);
    onClose();
    setQuery("");
  };

  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center lg:pt-16">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full h-full lg:h-auto lg:max-h-[90vh] lg:max-w-lg bg-[#1A1A1A] border border-gray-700 rounded-none lg:rounded-xl shadow-xl flex flex-col">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search deals, people, or navigate..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          ) : (
            <div className="p-2">
              {["Navigation", "Deals", "People"].map((category) => {
                const categoryCommands = filteredCommands.filter(
                  (cmd) => cmd.category === category
                );
                if (categoryCommands.length === 0) return null;

                return (
                  <div key={category} className="mb-2">
                    <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {category}
                    </div>
                    {categoryCommands.map((command) => (
                      <button
                        key={command.id}
                        onClick={() => handleSelect(command)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-white">{command.name}</span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-between p-3 border-t border-gray-700 text-xs text-gray-500 bg-[#1A1A1A]">
          <span>Type to search</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Plus, Search } from "lucide-react";
import DealCard from "./DealCard";

const stages = [
  { id: "new", name: "New", color: "gray" },
  { id: "screening", name: "Screening", color: "blue" },
  { id: "diligence", name: "Diligence", color: "yellow" },
  { id: "ic-ready", name: "IC Ready", color: "purple" },
  { id: "decided", name: "Decided", color: "green" },
];

function Pipeline() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const filteredDeals = state.deals.filter((deal) => {
    const matchesSearch = deal.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSector =
      selectedSector === "all" || deal.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = [
    "all",
    ...Array.from(new Set(state.deals.map((deal) => deal.sector))),
  ];

  const handleStageChange = (dealId: string, newStage: string) => {
    const deal = state.deals.find((d) => d.id === dealId);
    if (deal) {
      dispatch({
        type: "UPDATE_DEAL",
        payload: { ...deal, stage: newStage as any },
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-white">Deal Pipeline</h1>
          <button className="flex items-center gap-2 bg-[#7F5AF0] text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
            <Plus className="w-4 h-4" />
            Add Deal
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#7F5AF0]"
            />
          </div>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F5AF0]"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector === "all" ? "All Sectors" : sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
          {stages.map((stage) => {
            const stageDeals = filteredDeals.filter(
              (deal) => deal.stage === stage.id
            );

            return (
              <div
                key={stage.id}
                className="w-full lg:w-80 flex-shrink-0 bg-[#111] p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {stage.name}
                  </h3>
                  <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {stageDeals.length}
                  </span>
                </div>

                <div className="space-y-4 min-h-40">
                  {stageDeals.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onStageChange={handleStageChange}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Pipeline;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  FileText,
  Download,
  Plus,
  Link as LinkIcon,
  StickyNote,
} from "lucide-react";
import EvidenceDrawer from "./EvidenceDrawer";
import MemoGenerator from "./MemoGenerator";

function Diligence() {
  const { id } = useParams();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEvidenceDrawer, setShowEvidenceDrawer] = useState(false);
  const [showMemoGenerator, setShowMemoGenerator] = useState(false);

  const deal = id ? state.deals.find((d) => d.id === id) : state.deals[0];

  if (!deal) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            No Deal Selected
          </h2>
          <p className="text-gray-400">
            Select a deal from the pipeline to begin diligence.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "metrics", name: "Metrics" },
    { id: "docs", name: "Documents" },
    { id: "notes", name: "Notes" },
    { id: "activity", name: "Activity" },
  ];

  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            {/* Title & Description */}
            <div>
              <h1 className="text-2xl font-bold text-white">{deal.name}</h1>
              <p className="text-gray-400">{deal.description}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <button
                onClick={() => setShowEvidenceDrawer(true)}
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                Evidence
              </button>
              <button
                onClick={() => setShowMemoGenerator(true)}
                className="flex items-center gap-2 bg-[#7F5AF0] text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors w-full sm:w-auto justify-center"
              >
                <Download className="w-4 h-4" />
                Export Memo
              </button>
            </div>
          </div>

          {/* Deal Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#121212] p-4 rounded-lg">
              <div className="text-2xl font-bold text-[#2CB67D]">
                {deal.score}/10
              </div>
              <div className="text-sm text-gray-400">Match Score</div>
            </div>

            <div className="bg-[#121212] p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">{deal.amount}</div>
              <div className="text-sm text-gray-400">Investment Size</div>
            </div>

            <div className="bg-[#121212] p-4 rounded-lg">
              <div className="text-2xl font-bold text-[#FFCD58]">
                {deal.runway}m
              </div>
              <div className="text-sm text-gray-400">Runway</div>
            </div>

            <div className="bg-[#121212] p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">{deal.stage}</div>
              <div className="text-sm text-gray-400">Stage</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800">
            <div className="flex justify-between flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 text-center px-2 sm:px-4 py-2 font-medium tracking-tight text-xs sm:text-sm md:text-base transition-colors ${
                    activeTab === tab.id
                      ? "text-[#7F5AF0] border-b-2 border-[#7F5AF0]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Company Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Sector</label>
                      <p className="text-white">{deal.sector}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Founders</label>
                      <p className="text-white">{deal.founders.join(", ")}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">
                        Description
                      </label>
                      <p className="text-white">{deal.description}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Key Metrics
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Revenue</label>
                      <p className="text-white">{deal.metrics.revenue}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">
                        Growth Rate
                      </label>
                      <p className="text-white">{deal.metrics.growth}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Customers</label>
                      <p className="text-white">{deal.metrics.customers}</p>
                    </div>
                  </div>
                </div>
              </div>

              {deal.evidence.length > 0 && (
                <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recent Evidence
                  </h3>
                  <div className="space-y-3">
                    {deal.evidence.slice(0, 3).map((evidence) => (
                      <div
                        key={evidence.id}
                        className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-lg"
                      >
                        {evidence.type === "link" ? (
                          <LinkIcon className="w-4 h-4 text-[#7F5AF0]" />
                        ) : (
                          <StickyNote className="w-4 h-4 text-[#FFCD58]" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            {evidence.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {evidence.createdAt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="text-center py-12">
              <p className="text-gray-400">Metrics dashboard coming soon...</p>
            </div>
          )}

          {activeTab === "docs" && (
            <div className="text-center py-12">
              <p className="text-gray-400">
                Document management coming soon...
              </p>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="text-center py-12">
              <p className="text-gray-400">Notes editor coming soon...</p>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="text-center py-12">
              <p className="text-gray-400">Activity feed coming soon...</p>
            </div>
          )}
        </div>
      </div>

      <EvidenceDrawer
        isOpen={showEvidenceDrawer}
        onClose={() => setShowEvidenceDrawer(false)}
        deal={deal}
      />

      <MemoGenerator
        isOpen={showMemoGenerator}
        onClose={() => setShowMemoGenerator(false)}
        deal={deal}
      />
    </div>
  );
}

export default Diligence;

import React, { useState } from "react";
import { X, Plus, Link as LinkIcon, StickyNote, FileText } from "lucide-react";
import { Deal } from "../../types";

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal;
}

function EvidenceDrawer({ isOpen, onClose, deal }: EvidenceDrawerProps) {
  const [newEvidence, setNewEvidence] = useState({
    type: "note" as "link" | "note" | "document",
    title: "",
    content: "",
    url: "",
    tags: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding evidence:", newEvidence);
    setNewEvidence({
      type: "note",
      title: "",
      content: "",
      url: "",
      tags: "",
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#121212] border-l border-gray-800 z-40 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">
          Evidence & Citations
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Add Evidence Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-[#1A1A1A] rounded-lg space-y-3"
        >
          <h3 className="text-sm font-medium text-white mb-2">Add Evidence</h3>

          {/* Type Selector */}
          <div className="flex flex-wrap gap-2">
            {(["note", "link", "document"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setNewEvidence((prev) => ({ ...prev, type }))}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  newEvidence.type === type
                    ? "bg-[#7F5AF0] text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <input
            type="text"
            placeholder="Title"
            value={newEvidence.title}
            onChange={(e) =>
              setNewEvidence((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full bg-[#0D0D0D] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F5AF0]"
          />

          {newEvidence.type === "link" && (
            <input
              type="url"
              placeholder="URL"
              value={newEvidence.url}
              onChange={(e) =>
                setNewEvidence((prev) => ({ ...prev, url: e.target.value }))
              }
              className="w-full bg-[#0D0D0D] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F5AF0]"
            />
          )}

          <textarea
            placeholder="Content or notes"
            value={newEvidence.content}
            onChange={(e) =>
              setNewEvidence((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={3}
            className="w-full bg-[#0D0D0D] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F5AF0]"
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newEvidence.tags}
            onChange={(e) =>
              setNewEvidence((prev) => ({ ...prev, tags: e.target.value }))
            }
            className="w-full bg-[#0D0D0D] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F5AF0]"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#7F5AF0] text-white px-3 py-2 rounded text-sm hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Evidence
          </button>
        </form>

        {/* Existing Evidence */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white">Existing Evidence</h3>
          {deal.evidence.map((evidence) => (
            <div key={evidence.id} className="p-3 bg-[#1A1A1A] rounded-lg">
              <div className="flex items-start gap-2">
                {evidence.type === "link" ? (
                  <LinkIcon className="w-4 h-4 text-[#7F5AF0] mt-0.5" />
                ) : evidence.type === "document" ? (
                  <FileText className="w-4 h-4 text-[#FFCD58] mt-0.5" />
                ) : (
                  <StickyNote className="w-4 h-4 text-[#2CB67D] mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">
                    {evidence.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {evidence.content}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {evidence.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EvidenceDrawer;

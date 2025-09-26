import { useState, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { ZoomIn, ZoomOut, Search, Filter } from "lucide-react";

interface Node {
  id: string;
  name: string;
  type: "person" | "company";
  x: number;
  y: number;
  connections: string[];
}

function Network() {
  const { state } = useApp();
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Create network nodes from data
  const nodes: Node[] = [
    ...state.people.map((person) => ({
      id: person.id,
      name: person.name,
      type: "person" as const,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      connections: person.connections,
    })),
    ...state.deals.map((deal) => ({
      id: deal.id,
      name: deal.name,
      type: "company" as const,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      connections: [],
    })),
  ];

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.3));

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Network Visualization */}
      <div className="relative w-full h-[60vh] md:h-screen bg-[#0D0D0D] overflow-hidden">
        {/* Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-[#121212] border border-gray-800 rounded-lg text-white hover:bg-gray-800 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-[#121212] border border-gray-800 rounded-lg text-white hover:bg-gray-800 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Network Graph */}
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: "center center",
          }}
        >
          {/* Connections */}
          {nodes.map((node) =>
            node.connections.map((connId) => {
              const connectedNode = nodes.find((n) => n.id === connId);
              if (!connectedNode) return null;

              return (
                <line
                  key={`${node.id}-${connId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={connectedNode.x}
                  y2={connectedNode.y}
                  stroke="#374151"
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })
          )}

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={node.type === "person" ? "#7F5AF0" : "#2CB67D"}
                stroke={
                  selectedNode?.id === node.id ? "#FFCD58" : "transparent"
                }
                strokeWidth="3"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleNodeClick(node)}
              />
              <text
                x={node.x}
                y={node.y + 35}
                textAnchor="middle"
                className="fill-white text-xs font-medium"
                style={{ pointerEvents: "none" }}
              >
                {node.name.length > 12
                  ? `${node.name.slice(0, 12)}...`
                  : node.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-[#121212] border border-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-2">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#7F5AF0]"></div>
              <span className="text-xs text-gray-400">People</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#2CB67D]"></div>
              <span className="text-xs text-gray-400">Companies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-full md:w-80 bg-[#121212] border-t md:border-t-0 md:border-l border-gray-800 p-6 h-[40vh] md:h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Network</h2>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {selectedNode ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white">
                {selectedNode.name}
              </h3>
              <p className="text-sm text-gray-400 capitalize">
                {selectedNode.type}
              </p>
            </div>

            {selectedNode.type === "person" && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">
                    Connections
                  </h4>
                  <div className="space-y-1">
                    {selectedNode.connections.map((connId) => {
                      const connectedNode = nodes.find((n) => n.id === connId);
                      return connectedNode ? (
                        <div key={connId} className="text-sm text-gray-400">
                          {connectedNode.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-sm font-medium text-white mb-2">Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-[#1A1A1A] hover:bg-gray-800 rounded-lg text-white transition-colors">
                  View Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-[#1A1A1A] hover:bg-gray-800 rounded-lg text-white transition-colors">
                  Add Connection
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#7F5AF0] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#7F5AF0]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-white">Select a node</h3>
            <p className="text-xs text-gray-400 mt-1">
              Click on a person or company to view details
            </p>
          </div>
        )}

        {/* Network Stats */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h4 className="text-sm font-medium text-white mb-3">Network Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Total Contacts</span>
              <span className="text-xs text-white">{state.people.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Companies</span>
              <span className="text-xs text-white">{state.deals.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Connections</span>
              <span className="text-xs text-white">
                {state.people.reduce(
                  (acc, person) => acc + person.connections.length,
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Network;

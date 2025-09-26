import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Download, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

function Portfolio() {
  const { state } = useApp();
  const [filter, setFilter] = useState<"all" | "active" | "at-risk" | "exited">(
    "all"
  );

  const filteredPortfolio = state.portfolio.filter(
    (company) => filter === "all" || company.status === filter
  );

  const generateLPReport = () => {
    const reportContent = `# LP Report - ${new Date().toLocaleDateString()}

## Portfolio Overview
Total Companies: ${state.portfolio.length}
Active Companies: ${state.portfolio.filter((c) => c.status === "active").length}
At Risk: ${state.portfolio.filter((c) => c.status === "at-risk").length}

## Portfolio Companies

${state.portfolio
  .map(
    (company) => `
### ${company.name}
- **Status**: ${company.status}
- **Investment**: ${company.investment}
- **Valuation**: ${company.valuation}
- **Ownership**: ${company.ownership}
- **ARR**: ${company.metrics.arr}
- **Growth**: ${company.metrics.growth}
- **Runway**: ${company.metrics.runway} months
- **Last Update**: ${company.lastUpdate}
`
  )
  .join("\n")}

---
Generated on ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([reportContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LP_Report_${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-[#2CB67D]" />;
      case "at-risk":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-[#2CB67D] bg-green-900/20";
      case "at-risk":
        return "text-red-400 bg-red-900/20";
      default:
        return "text-gray-400 bg-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#7F5AF0] w-full sm:w-auto"
          >
            <option value="all">All Companies</option>
            <option value="active">Active</option>
            <option value="at-risk">At Risk</option>
            <option value="exited">Exited</option>
          </select>

          <button
            onClick={generateLPReport}
            className="flex items-center justify-center gap-2 bg-[#7F5AF0] text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            Export LP Report
          </button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-white">
            {state.portfolio.length}
          </div>
          <div className="text-sm text-gray-400">Total Companies</div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#2CB67D]">
            {state.portfolio.filter((c) => c.status === "active").length}
          </div>
          <div className="text-sm text-gray-400">Active</div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-400">
            {state.portfolio.filter((c) => c.status === "at-risk").length}
          </div>
          <div className="text-sm text-gray-400">At Risk</div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#FFCD58]">
            {state.portfolio
              .reduce(
                (acc, c) =>
                  acc + parseFloat(c.investment.replace(/[$M,]/g, "")),
                0
              )
              .toFixed(1)}
            M
          </div>
          <div className="text-sm text-gray-400">Total Invested</div>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden">
        {/* Desktop / Tablet Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Company
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Investment
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Valuation
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Ownership
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  ARR
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Growth
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Runway
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPortfolio.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-gray-800 hover:bg-[#1A1A1A] transition-colors"
                >
                  <td className="p-4 text-white">{company.name}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(company.status)}
                      <span
                        className={`text-xs px-2 py-1 rounded ${getStatusColor(
                          company.status
                        )}`}
                      >
                        {company.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{company.investment}</td>
                  <td className="p-4 text-white">{company.valuation}</td>
                  <td className="p-4 text-white">{company.ownership}</td>
                  <td className="p-4 text-white">{company.metrics.arr}</td>
                  <td className="p-4">
                    <span
                      className={`text-sm ${
                        parseFloat(company.metrics.growth) >= 15
                          ? "text-[#2CB67D]"
                          : parseFloat(company.metrics.growth) >= 5
                          ? "text-[#FFCD58]"
                          : "text-red-400"
                      }`}
                    >
                      {company.metrics.growth}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-sm ${
                        company.metrics.runway >= 18
                          ? "text-[#2CB67D]"
                          : company.metrics.runway >= 12
                          ? "text-[#FFCD58]"
                          : "text-red-400"
                      }`}
                    >
                      {company.metrics.runway}m
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {company.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden divide-y divide-gray-800">
          {filteredPortfolio.map((company) => (
            <div key={company.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{company.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${getStatusColor(
                    company.status
                  )}`}
                >
                  {company.status}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Investment:{" "}
                <span className="text-white">{company.investment}</span>
              </div>
              <div className="text-sm text-gray-400">
                Valuation:{" "}
                <span className="text-white">{company.valuation}</span>
              </div>
              <div className="text-sm text-gray-400">
                Ownership:{" "}
                <span className="text-white">{company.ownership}</span>
              </div>
              <div className="text-sm text-gray-400">
                ARR: <span className="text-white">{company.metrics.arr}</span>
              </div>
              <div className="text-sm text-gray-400">
                Growth:{" "}
                <span
                  className={`${
                    parseFloat(company.metrics.growth) >= 15
                      ? "text-[#2CB67D]"
                      : parseFloat(company.metrics.growth) >= 5
                      ? "text-[#FFCD58]"
                      : "text-red-400"
                  }`}
                >
                  {company.metrics.growth}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Runway:{" "}
                <span
                  className={`${
                    company.metrics.runway >= 18
                      ? "text-[#2CB67D]"
                      : company.metrics.runway >= 12
                      ? "text-[#FFCD58]"
                      : "text-red-400"
                  }`}
                >
                  {company.metrics.runway}m
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Last Update: {company.lastUpdate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;

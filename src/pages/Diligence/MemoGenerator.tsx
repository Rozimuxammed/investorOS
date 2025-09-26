import { X, Download } from "lucide-react";
import { Deal } from "../../types";

interface MemoGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal;
}

function MemoGenerator({ isOpen, onClose, deal }: MemoGeneratorProps) {
  if (!isOpen) return null;

  const generateMemo = () => {
    const memoContent = `# Investment Memo: ${deal.name}

## Executive Summary
${deal.description}

## Key Metrics
- **Revenue**: ${deal.metrics.revenue}
- **Growth Rate**: ${deal.metrics.growth}  
- **Customers**: ${deal.metrics.customers}
- **Runway**: ${deal.runway} months

## Investment Details
- **Amount**: ${deal.amount}
- **Sector**: ${deal.sector}
- **Match Score**: ${deal.score}/10

## Founders
${deal.founders.map((founder) => `- ${founder}`).join("\n")}

## Evidence Summary
${deal.evidence
  .map(
    (evidence) => `
### ${evidence.title}
${evidence.content}
Tags: ${evidence.tags.join(", ")}`
  )
  .join("\n")}

## Recommendation
Based on the diligence conducted, this deal shows ${
      deal.score >= 8 ? "strong" : deal.score >= 6 ? "moderate" : "limited"
    } potential.

---
Generated on ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([memoContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${deal.name.replace(/\s+/g, "_")}_investment_memo.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-2xl bg-[#121212] border border-gray-800 rounded-xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">
            Generate Investment Memo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          {/* Preview */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-white font-medium mb-2">Memo Preview</h3>
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-3 sm:p-4 max-h-[70vh] sm:max-h-96 overflow-y-auto">
              <div className="text-sm text-gray-300 space-y-3">
                <div>
                  <h4 className="text-white font-semibold">
                    Investment Memo: {deal.name}
                  </h4>
                </div>

                <div>
                  <h5 className="text-gray-400 font-medium">
                    Executive Summary
                  </h5>
                  <p>{deal.description}</p>
                </div>

                <div>
                  <h5 className="text-gray-400 font-medium">Key Metrics</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Revenue: {deal.metrics.revenue}</li>
                    <li>Growth Rate: {deal.metrics.growth}</li>
                    <li>Customers: {deal.metrics.customers}</li>
                    <li>Runway: {deal.runway} months</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-gray-400 font-medium">
                    Investment Details
                  </h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Amount: {deal.amount}</li>
                    <li>Sector: {deal.sector}</li>
                    <li>Match Score: {deal.score}/10</li>
                  </ul>
                </div>

                {deal.evidence.length > 0 && (
                  <div>
                    <h5 className="text-gray-400 font-medium">
                      Evidence Summary
                    </h5>
                    <p>{deal.evidence.length} pieces of evidence collected</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-sm text-gray-400 text-center sm:text-left">
              Memo will be exported as Markdown format
            </div>
            <button
              onClick={generateMemo}
              className="flex items-center justify-center gap-2 bg-[#7F5AF0] text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              Export Memo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoGenerator;

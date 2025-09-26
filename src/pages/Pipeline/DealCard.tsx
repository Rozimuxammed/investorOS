import React from 'react';
import { Link } from 'react-router-dom';
import { Deal } from '../../types';
import { Clock, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  onStageChange: (dealId: string, newStage: string) => void;
}

const stageOrder = ['new', 'screening', 'diligence', 'ic-ready', 'decided'];

function DealCard({ deal, onStageChange }: DealCardProps) {
  const currentStageIndex = stageOrder.indexOf(deal.stage);
  const canMoveLeft = currentStageIndex > 0;
  const canMoveRight = currentStageIndex < stageOrder.length - 1;

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-[#2CB67D] bg-green-900/20';
    if (score >= 6) return 'text-[#FFCD58] bg-yellow-900/20';
    return 'text-red-400 bg-red-900/20';
  };

  const getRunwayColor = (runway: number) => {
    if (runway >= 18) return 'text-[#2CB67D]';
    if (runway >= 12) return 'text-[#FFCD58]';
    return 'text-red-400';
  };

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <Link 
          to={`/diligence/${deal.id}`}
          className="font-semibold text-white hover:text-[#7F5AF0] transition-colors"
        >
          {deal.name}
        </Link>
        <span className={`text-xs px-2 py-1 rounded ${getScoreColor(deal.score)}`}>
          {deal.score}/10
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-400">{deal.amount}</div>
        <div className="text-sm text-gray-400">{deal.sector}</div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span className={getRunwayColor(deal.runway)}>{deal.runway}m runway</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{deal.founders.length} founders</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => canMoveLeft && onStageChange(deal.id, stageOrder[currentStageIndex - 1])}
            disabled={!canMoveLeft}
            className={`p-1 rounded ${
              canMoveLeft 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 cursor-not-allowed'
            } transition-colors`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => canMoveRight && onStageChange(deal.id, stageOrder[currentStageIndex + 1])}
            disabled={!canMoveRight}
            className={`p-1 rounded ${
              canMoveRight 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 cursor-not-allowed'
            } transition-colors`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-xs text-gray-500">{deal.lastUpdate}</div>
      </div>
    </div>
  );
}

export default DealCard;
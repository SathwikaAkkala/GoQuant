import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, Shield, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { ExecutionGuidance, Portfolio } from '../types';

interface ExecutionGuidancePanelProps {
  guidance: ExecutionGuidance[];
  portfolio: Portfolio;
}

const ExecutionGuidancePanel: React.FC<ExecutionGuidancePanelProps> = ({
  guidance,
  portfolio
}) => {
  const [selectedGuidance, setSelectedGuidance] = useState<string | null>(null);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'buy': return 'text-emerald-400 bg-emerald-400/20';
      case 'sell': return 'text-red-400 bg-red-400/20';
      case 'hold': return 'text-gray-400 bg-gray-400/20';
      case 'rebalance': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'buy': return <TrendingUp className="w-4 h-4" />;
      case 'sell': return <TrendingDown className="w-4 h-4" />;
      case 'hold': return <Shield className="w-4 h-4" />;
      case 'rebalance': return <Target className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-emerald-400';
    if (confidence >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Execution Guidance</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">AI Powered</span>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Portfolio Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(portfolio.totalValue)}
            </div>
            <div className="text-sm text-gray-400">Total Portfolio Value</div>
          </div>
          <div>
            <div className={`text-2xl font-bold flex items-center ${
              portfolio.dayChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {portfolio.dayChangePercent >= 0 ? 
                <TrendingUp className="w-5 h-5 mr-1" /> : 
                <TrendingDown className="w-5 h-5 mr-1" />
              }
              {Math.abs(portfolio.dayChangePercent).toFixed(2)}%
            </div>
            <div className="text-sm text-gray-400">
              {portfolio.dayChangePercent >= 0 ? '+' : ''}{formatCurrency(portfolio.dayChange)}
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {portfolio.assets.map((asset, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">{asset.symbol}</span>
                <span className="text-gray-400 text-sm">{asset.balance.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{formatCurrency(asset.value)}</div>
                <div className={`text-xs ${
                  asset.dayChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {asset.dayChangePercent >= 0 ? '+' : ''}{asset.dayChangePercent.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Guidance */}
      <div className="space-y-4">
        {guidance.map((guide) => (
          <div
            key={guide.id}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:border-blue-500 ${
              selectedGuidance === guide.id
                ? 'border-blue-500 bg-blue-950/20'
                : 'border-gray-700 bg-gray-800/50'
            }`}
            onClick={() => setSelectedGuidance(selectedGuidance === guide.id ? null : guide.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getActionColor(guide.action)}`}>
                  {getActionIcon(guide.action)}
                </div>
                <div>
                  <h3 className="font-semibold text-white capitalize">{guide.action} {guide.asset}</h3>
                  <p className="text-gray-400 text-sm">{guide.reasoning}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${getConfidenceColor(guide.confidence)}`}>
                  {guide.confidence}%
                </div>
                <div className="text-xs text-gray-400">Confidence</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="p-3 bg-gray-800/30 rounded">
                <div className="text-xs text-gray-400">Optimal Timing</div>
                <div className="text-white font-medium">{formatDateTime(guide.optimalTiming)}</div>
              </div>
              <div className="p-3 bg-gray-800/30 rounded">
                <div className="text-xs text-gray-400">Allocation</div>
                <div className="text-white font-medium">{guide.allocation}%</div>
              </div>
            </div>

            {selectedGuidance === guide.id && (
              <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <h4 className="text-white font-medium mb-3">Detailed Analysis</h4>
                
                {guide.priceTarget && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-700">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Price Target</span>
                      </div>
                      <div className="text-white text-xl font-bold">
                        ${guide.priceTarget.toFixed(2)}
                      </div>
                    </div>
                    
                    {guide.stopLoss && (
                      <div className="p-3 bg-red-950/30 rounded-lg border border-red-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-medium">Stop Loss</span>
                        </div>
                        <div className="text-white text-xl font-bold">
                          ${guide.stopLoss.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">Execution Strategy</span>
                  </div>
                  <p className="text-gray-300 mt-2 text-sm">
                    Based on current market conditions and protocol upgrade analysis, 
                    this recommendation offers optimal risk-adjusted returns with 
                    {guide.confidence}% confidence level.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Risk Warning */}
      <div className="mt-6 p-4 bg-amber-950/30 rounded-lg border border-amber-700">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 font-medium">Risk Disclaimer</span>
        </div>
        <p className="text-gray-300 text-sm">
          All trading recommendations are based on algorithmic analysis and should not be 
          considered as financial advice. Past performance does not guarantee future results. 
          Always conduct your own research and consider your risk tolerance.
        </p>
      </div>
    </div>
  );
};

export default ExecutionGuidancePanel;
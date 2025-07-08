import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { ProtocolUpgrade, MarketData } from '../types';

interface ProtocolUpgradeTimelineProps {
  upgrades: ProtocolUpgrade[];
  marketData: MarketData[];
}

const ProtocolUpgradeTimeline: React.FC<ProtocolUpgradeTimelineProps> = ({
  upgrades,
  marketData
}) => {
  const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposed': return 'text-amber-400 bg-amber-400/20';
      case 'active': return 'text-blue-400 bg-blue-400/20';
      case 'executed': return 'text-emerald-400 bg-emerald-400/20';
      case 'failed': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'proposed': return <Clock className="w-4 h-4" />;
      case 'active': return <Activity className="w-4 h-4" />;
      case 'executed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 75) return 'text-red-400';
    if (risk >= 50) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const filteredUpgrades = upgrades.filter(upgrade => 
    filterType === 'all' || upgrade.type === filterType
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMarketDataForAsset = (symbol: string) => {
    return marketData.find(data => data.symbol === symbol);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Protocol Upgrades</h2>
        <div className="flex items-center space-x-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded-lg border border-gray-700 text-sm"
          >
            <option value="all">All Types</option>
            <option value="governance">Governance</option>
            <option value="implementation">Implementation</option>
            <option value="parameter">Parameter</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredUpgrades.map((upgrade) => (
          <div
            key={upgrade.id}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:border-blue-500 ${
              selectedUpgrade === upgrade.id
                ? 'border-blue-500 bg-blue-950/20'
                : 'border-gray-700 bg-gray-800/50'
            }`}
            onClick={() => setSelectedUpgrade(selectedUpgrade === upgrade.id ? null : upgrade.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-white">{upgrade.protocol}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(upgrade.status)}`}>
                    {getStatusIcon(upgrade.status)}
                    <span className="ml-1 capitalize">{upgrade.status}</span>
                  </span>
                </div>
                <h4 className="text-white font-medium mb-1">{upgrade.title}</h4>
                <p className="text-gray-400 text-sm">{upgrade.description}</p>
              </div>
              <div className="text-right">
                <div className={`font-bold ${getRiskColor(upgrade.riskScore)}`}>
                  Risk: {upgrade.riskScore}%
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(upgrade.proposalDate)}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Voting Progress</span>
                <span>{upgrade.votingProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    upgrade.votingProgress >= 80 ? 'bg-emerald-500' :
                    upgrade.votingProgress >= 50 ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${upgrade.votingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center p-2 bg-gray-800/30 rounded">
                <div className="text-xs text-gray-400">Volatility Impact</div>
                <div className="text-white font-semibold">{upgrade.volatilityImpact}%</div>
              </div>
              <div className="text-center p-2 bg-gray-800/30 rounded">
                <div className="text-xs text-gray-400">Liquidity Shift</div>
                <div className="text-white font-semibold">{upgrade.liquidityShift}%</div>
              </div>
              <div className="text-center p-2 bg-gray-800/30 rounded">
                <div className="text-xs text-gray-400">Type</div>
                <div className="text-white font-semibold capitalize">{upgrade.type}</div>
              </div>
            </div>

            {/* Affected Assets */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm text-gray-400">Affected Assets:</span>
              <div className="flex flex-wrap gap-1">
                {upgrade.affectedAssets.map((asset, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700 text-white text-xs rounded-full"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </div>

            {/* Expanded Details */}
            {selectedUpgrade === upgrade.id && (
              <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <h4 className="text-white font-medium mb-3">Market Impact Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upgrade.affectedAssets.map((asset, index) => {
                    const marketInfo = getMarketDataForAsset(asset);
                    return marketInfo ? (
                      <div key={index} className="p-3 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{asset}</span>
                          <span className="text-gray-400">${marketInfo.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">24h Change</span>
                          <span className={`flex items-center ${
                            marketInfo.changePercent24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {marketInfo.changePercent24h >= 0 ? 
                              <TrendingUp className="w-3 h-3 mr-1" /> : 
                              <TrendingDown className="w-3 h-3 mr-1" />
                            }
                            {Math.abs(marketInfo.changePercent24h).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Volatility</span>
                          <span className="text-white">{marketInfo.volatility}%</span>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
                
                {upgrade.executionDate && (
                  <div className="mt-4 p-3 bg-blue-950/30 rounded-lg border border-blue-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-medium">
                        Execution scheduled for {formatDate(upgrade.executionDate)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolUpgradeTimeline;
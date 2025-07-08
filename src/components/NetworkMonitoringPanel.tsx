import React, { useState } from 'react';
import { Activity, TrendingUp, Zap, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { NetworkData, RiskMetrics, SentimentData } from '../types';

interface NetworkMonitoringPanelProps {
  networks: NetworkData[];
  riskMetrics: RiskMetrics;
  sentimentData: SentimentData[];
}

const NetworkMonitoringPanel: React.FC<NetworkMonitoringPanelProps> = ({
  networks,
  riskMetrics,
  sentimentData
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-400';
      case 'degraded': return 'text-amber-400';
      case 'inactive': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 75) return 'text-red-400';
    if (risk >= 50) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getSentimentTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return 'text-emerald-400';
      case 'bearish': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Network Monitoring</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>

      {/* Network Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {networks.map((network) => (
          <div
            key={network.id}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:border-blue-500 ${
              selectedNetwork === network.id
                ? 'border-blue-500 bg-blue-950/20'
                : 'border-gray-700 bg-gray-800/50'
            }`}
            onClick={() => setSelectedNetwork(network.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white">{network.name}</h3>
              <div className={`flex items-center space-x-1 ${getStatusColor(network.status)}`}>
                {getStatusIcon(network.status)}
                <span className="text-xs capitalize">{network.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Block Height:</span>
                <p className="text-white font-mono">{network.blockHeight.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-400">Gas Price:</span>
                <p className="text-white font-mono">{network.gasPrice} gwei</p>
              </div>
              <div>
                <span className="text-gray-400">TPS:</span>
                <p className="text-white font-mono">{network.tps}</p>
              </div>
              <div>
                <span className="text-gray-400">TVL:</span>
                <p className="text-white font-mono">${formatNumber(network.tvl)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Metrics */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Overall Risk</span>
              <span className={`font-bold ${getRiskColor(riskMetrics.overallRisk)}`}>
                {riskMetrics.overallRisk}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  riskMetrics.overallRisk >= 75 ? 'bg-red-500' :
                  riskMetrics.overallRisk >= 50 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${riskMetrics.overallRisk}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Volatility Forecast</span>
              <span className="font-bold text-white">{riskMetrics.volatilityForecast}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${riskMetrics.volatilityForecast}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="text-center p-3 bg-gray-800/30 rounded-lg">
            <div className="text-xs text-gray-400">Technical</div>
            <div className={`font-bold ${getRiskColor(riskMetrics.technicalRisk)}`}>
              {riskMetrics.technicalRisk}%
            </div>
          </div>
          <div className="text-center p-3 bg-gray-800/30 rounded-lg">
            <div className="text-xs text-gray-400">Governance</div>
            <div className={`font-bold ${getRiskColor(riskMetrics.governanceRisk)}`}>
              {riskMetrics.governanceRisk}%
            </div>
          </div>
          <div className="text-center p-3 bg-gray-800/30 rounded-lg">
            <div className="text-xs text-gray-400">Market</div>
            <div className={`font-bold ${getRiskColor(riskMetrics.marketRisk)}`}>
              {riskMetrics.marketRisk}%
            </div>
          </div>
          <div className="text-center p-3 bg-gray-800/30 rounded-lg">
            <div className="text-xs text-gray-400">Liquidity</div>
            <div className={`font-bold ${getRiskColor(riskMetrics.liquidityRisk)}`}>
              {riskMetrics.liquidityRisk}%
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Social Sentiment</h3>
        <div className="space-y-3">
          {sentimentData.map((sentiment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{sentiment.platform}</div>
                  <div className="text-xs text-gray-400">{formatNumber(sentiment.volume)} mentions</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${getSentimentTrendColor(sentiment.trend)}`}>
                  {sentiment.score}%
                </div>
                <div className={`text-xs capitalize ${getSentimentTrendColor(sentiment.trend)}`}>
                  {sentiment.trend}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkMonitoringPanel;
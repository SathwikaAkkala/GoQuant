export interface NetworkData {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'degraded';
  blockHeight: number;
  gasPrice: number;
  tps: number;
  tvl: number;
  lastUpdated: Date;
}

export interface ProtocolUpgrade {
  id: string;
  protocol: string;
  title: string;
  description: string;
  type: 'governance' | 'implementation' | 'parameter';
  status: 'proposed' | 'active' | 'executed' | 'failed';
  riskScore: number;
  volatilityImpact: number;
  liquidityShift: number;
  proposalDate: Date;
  executionDate?: Date;
  votingProgress: number;
  affectedAssets: string[];
}

export interface RiskMetrics {
  overallRisk: number;
  technicalRisk: number;
  governanceRisk: number;
  marketRisk: number;
  liquidityRisk: number;
  sentimentScore: number;
  volatilityForecast: number;
  lastUpdated: Date;
}

export interface ExecutionGuidance {
  id: string;
  action: 'buy' | 'sell' | 'hold' | 'rebalance';
  confidence: number;
  reasoning: string;
  optimalTiming: Date;
  priceTarget?: number;
  stopLoss?: number;
  allocation: number;
  asset: string;
}

export interface Portfolio {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  assets: PortfolioAsset[];
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  allocation: number;
  dayChange: number;
  dayChangePercent: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  volatility: number;
}

export interface SentimentData {
  platform: string;
  score: number;
  volume: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  lastUpdated: Date;
}
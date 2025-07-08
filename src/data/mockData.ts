import { NetworkData, ProtocolUpgrade, RiskMetrics, ExecutionGuidance, Portfolio, MarketData, SentimentData } from '../types';

export const mockNetworks: NetworkData[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    status: 'active',
    blockHeight: 21250234,
    gasPrice: 25,
    tps: 15,
    tvl: 45200000000,
    lastUpdated: new Date()
  },
  {
    id: 'polygon',
    name: 'Polygon',
    status: 'active',
    blockHeight: 65123456,
    gasPrice: 30,
    tps: 7000,
    tvl: 8500000000,
    lastUpdated: new Date()
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    status: 'active',
    blockHeight: 280987654,
    gasPrice: 0.1,
    tps: 4000,
    tvl: 12300000000,
    lastUpdated: new Date()
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    status: 'active',
    blockHeight: 875456,
    gasPrice: 50,
    tps: 7,
    tvl: 0,
    lastUpdated: new Date()
  }
];

export const mockUpgrades: ProtocolUpgrade[] = [
  {
    id: '1',
    protocol: 'Uniswap V4',
    title: 'Hooks Implementation Phase 2',
    description: 'Advanced customizable hooks for enhanced liquidity management and MEV protection',
    type: 'implementation',
    status: 'proposed',
    riskScore: 75,
    volatilityImpact: 15,
    liquidityShift: 8,
    proposalDate: new Date('2025-01-15'),
    executionDate: new Date('2025-02-01'),
    votingProgress: 67,
    affectedAssets: ['UNI', 'ETH', 'USDC']
  },
  {
    id: '2',
    protocol: 'Compound V3',
    title: 'Dynamic Interest Rate Model',
    description: 'AI-driven interest rate adjustments for optimal capital efficiency and risk management',
    type: 'parameter',
    status: 'active',
    riskScore: 45,
    volatilityImpact: 8,
    liquidityShift: 12,
    proposalDate: new Date('2025-01-10'),
    executionDate: new Date('2025-01-25'),
    votingProgress: 89,
    affectedAssets: ['COMP', 'DAI', 'USDT']
  },
  {
    id: '3',
    protocol: 'Aave V4',
    title: 'Cross-Chain Risk Parameters',
    description: 'Unified risk management across multiple blockchain networks with real-time adjustments',
    type: 'parameter',
    status: 'executed',
    riskScore: 30,
    volatilityImpact: 5,
    liquidityShift: 15,
    proposalDate: new Date('2025-01-05'),
    executionDate: new Date('2025-01-20'),
    votingProgress: 100,
    affectedAssets: ['AAVE', 'WETH', 'USDC']
  },
  {
    id: '4',
    protocol: 'MakerDAO',
    title: 'Real World Assets Integration',
    description: 'Expansion of collateral types to include tokenized real estate and commodities',
    type: 'governance',
    status: 'proposed',
    riskScore: 85,
    volatilityImpact: 20,
    liquidityShift: 25,
    proposalDate: new Date('2025-01-18'),
    executionDate: new Date('2025-02-15'),
    votingProgress: 42,
    affectedAssets: ['MKR', 'DAI', 'WBTC']
  },
  {
    id: '5',
    protocol: 'Lido',
    title: 'Ethereum Staking Rewards Optimization',
    description: 'Enhanced validator selection and MEV rewards distribution mechanism',
    type: 'implementation',
    status: 'active',
    riskScore: 55,
    volatilityImpact: 12,
    liquidityShift: 18,
    proposalDate: new Date('2025-01-12'),
    executionDate: new Date('2025-01-28'),
    votingProgress: 78,
    affectedAssets: ['LDO', 'stETH', 'ETH']
  }
];

export const mockRiskMetrics: RiskMetrics = {
  overallRisk: 65,
  technicalRisk: 70,
  governanceRisk: 55,
  marketRisk: 75,
  liquidityRisk: 60,
  sentimentScore: 68,
  volatilityForecast: 22,
  lastUpdated: new Date()
};

export const mockExecutionGuidance: ExecutionGuidance[] = [
  {
    id: '1',
    action: 'buy',
    confidence: 85,
    reasoning: 'Strong technical indicators suggest upward movement post-upgrade. ETH 2.0 staking rewards optimization expected to drive demand.',
    optimalTiming: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    priceTarget: 3850,
    stopLoss: 3250,
    allocation: 15,
    asset: 'ETH'
  },
  {
    id: '2',
    action: 'rebalance',
    confidence: 72,
    reasoning: 'Uniswap V4 hooks implementation may significantly affect liquidity distribution across DEX protocols',
    optimalTiming: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    allocation: 25,
    asset: 'UNI'
  },
  {
    id: '3',
    action: 'hold',
    confidence: 90,
    reasoning: 'Stable fundamentals with low volatility risk. USDC maintains strong peg and regulatory clarity',
    optimalTiming: new Date(),
    allocation: 20,
    asset: 'USDC'
  },
  {
    id: '4',
    action: 'sell',
    confidence: 78,
    reasoning: 'MakerDAO RWA integration introduces regulatory uncertainty. Consider reducing exposure before implementation',
    optimalTiming: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    priceTarget: 1850,
    stopLoss: 2200,
    allocation: 10,
    asset: 'MKR'
  }
];

export const mockPortfolio: Portfolio = {
  totalValue: 125000,
  dayChange: 2850,
  dayChangePercent: 2.34,
  assets: [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 32.5,
      value: 98500,
      allocation: 78.8,
      dayChange: 2200,
      dayChangePercent: 2.28
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      balance: 1250,
      value: 15000,
      allocation: 12.0,
      dayChange: 450,
      dayChangePercent: 3.09
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 11500,
      value: 11500,
      allocation: 9.2,
      dayChange: 0,
      dayChangePercent: 0
    }
  ]
};

export const mockMarketData: MarketData[] = [
  {
    symbol: 'ETH',
    price: 3285.50,
    change24h: 125.25,
    changePercent24h: 3.96,
    volume24h: 18200000000,
    marketCap: 395000000000,
    volatility: 18.5
  },
  {
    symbol: 'UNI',
    price: 15.45,
    change24h: 1.25,
    changePercent24h: 8.8,
    volume24h: 650000000,
    marketCap: 12500000000,
    volatility: 25.2
  },
  {
    symbol: 'COMP',
    price: 78.90,
    change24h: 3.15,
    changePercent24h: 4.2,
    volume24h: 185000000,
    marketCap: 1800000000,
    volatility: 32.1
  },
  {
    symbol: 'MKR',
    price: 2150.00,
    change24h: -45.50,
    changePercent24h: -2.1,
    volume24h: 95000000,
    marketCap: 2100000000,
    volatility: 28.7
  },
  {
    symbol: 'LDO',
    price: 2.85,
    change24h: 0.15,
    changePercent24h: 5.6,
    volume24h: 125000000,
    marketCap: 2850000000,
    volatility: 35.4
  }
];

export const mockSentimentData: SentimentData[] = [
  {
    platform: 'Twitter',
    score: 72,
    volume: 25420,
    trend: 'bullish',
    lastUpdated: new Date()
  },
  {
    platform: 'Reddit',
    score: 68,
    volume: 12930,
    trend: 'bullish',
    lastUpdated: new Date()
  },
  {
    platform: 'Telegram',
    score: 58,
    volume: 8670,
    trend: 'neutral',
    lastUpdated: new Date()
  },
  {
    platform: 'Discord',
    score: 75,
    volume: 15240,
    trend: 'bullish',
    lastUpdated: new Date()
  }
];
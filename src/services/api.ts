import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const ETHERSCAN_API_KEY = 'YourEtherscanAPIKey'; // Replace with actual API key
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/api';

// CoinGecko API service
export const coinGeckoApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Etherscan API service
export const etherscanApi = axios.create({
  baseURL: ETHERSCAN_BASE_URL,
  timeout: 10000,
});

// Market data fetching
export const fetchMarketData = async (coins: string[]) => {
  try {
    const response = await coinGeckoApi.get('/simple/price', {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
        include_24hr_change: true,
        include_24hr_vol: true,
        include_market_cap: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

// Network stats fetching
export const fetchNetworkStats = async () => {
  try {
    const [ethGasResponse, ethStatsResponse] = await Promise.all([
      etherscanApi.get('', {
        params: {
          module: 'gastracker',
          action: 'gasoracle',
          apikey: ETHERSCAN_API_KEY,
        },
      }),
      etherscanApi.get('', {
        params: {
          module: 'stats',
          action: 'ethsupply',
          apikey: ETHERSCAN_API_KEY,
        },
      }),
    ]);

    return {
      gasPrice: ethGasResponse.data.result?.ProposeGasPrice || 25,
      ethSupply: ethStatsResponse.data.result || '120000000',
    };
  } catch (error) {
    console.error('Error fetching network stats:', error);
    return { gasPrice: 25, ethSupply: '120000000' };
  }
};

// DeFi TVL data
export const fetchDeFiTVL = async () => {
  try {
    const response = await axios.get('https://api.llama.fi/protocols');
    return response.data.slice(0, 10); // Top 10 protocols
  } catch (error) {
    console.error('Error fetching DeFi TVL:', error);
    return [];
  }
};

// Governance proposals (mock for now, would integrate with Snapshot/Tally)
export const fetchGovernanceProposals = async () => {
  // This would integrate with real governance APIs like Snapshot, Tally, etc.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Uniswap V4 Hooks Implementation Phase 2',
          protocol: 'Uniswap',
          status: 'active',
          votesFor: 18420000,
          votesAgainst: 3240000,
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: '2',
          title: 'MakerDAO Real World Assets Integration',
          protocol: 'MakerDAO',
          status: 'pending',
          votesFor: 12900000,
          votesAgainst: 4200000,
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: '3',
          title: 'Lido Staking Rewards Optimization',
          protocol: 'Lido',
          status: 'active',
          votesFor: 9800000,
          votesAgainst: 1800000,
          endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        },
      ]);
    }, 1000);
  });
};
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketData, fetchNetworkStats, fetchDeFiTVL } from '../services/api';

export const useRealTimeData = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Market data query
  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ['marketData'],
    queryFn: () => fetchMarketData(['ethereum', 'uniswap', 'compound-governance-token', 'aave']),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Network stats query
  const { data: networkStats, isLoading: networkLoading } = useQuery({
    queryKey: ['networkStats'],
    queryFn: fetchNetworkStats,
    refetchInterval: 60000, // Refetch every minute
  });

  // DeFi TVL query
  const { data: defiTVL, isLoading: tvlLoading } = useQuery({
    queryKey: ['defiTVL'],
    queryFn: fetchDeFiTVL,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    marketData,
    networkStats,
    defiTVL,
    lastUpdate,
    isLoading: marketLoading || networkLoading || tvlLoading,
  };
};
import React, { useState, useEffect, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import NotificationCenter from './components/NotificationCenter';
import SettingsPanel from './components/SettingsPanel';
import UserProfile from './components/UserProfile';
import AuthModal from './components/AuthModal';
import RealTimeChart from './components/RealTimeChart';
import NetworkMonitoringPanel from './components/NetworkMonitoringPanel';
import ProtocolUpgradeTimeline from './components/ProtocolUpgradeTimeline';
import ExecutionGuidancePanel from './components/ExecutionGuidancePanel';
import { useRealTimeData } from './hooks/useRealTimeData';
import { 
  mockNetworks, 
  mockUpgrades, 
  mockRiskMetrics, 
  mockExecutionGuidance, 
  mockPortfolio, 
  mockMarketData, 
  mockSentimentData 
} from './data/mockData';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const { marketData, networkStats, lastUpdate, isLoading: dataLoading } = useRealTimeData();

  // Generate mock chart data
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Generate initial chart data
    const generateChartData = () => {
      const data = [];
      const now = new Date();
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: 2700 + Math.random() * 200 - 100,
          volume: Math.random() * 1000000,
        });
      }
      return data;
    };

    setChartData(generateChartData());

    // Update chart data every minute
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: 2700 + Math.random() * 200 - 100,
          volume: Math.random() * 1000000,
        });
        return newData;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Check if user is already authenticated
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const userData = localStorage.getItem('userProfile');
    
    if (isAuth && userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
    }
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = useCallback((userData: any) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setShowProfile(false);
    setShowSettings(false);
    setShowNotifications(false);
  }, []);

  const handleProfileClick = useCallback(() => {
    if (isAuthenticated) {
      setShowProfile(true);
    } else {
      setShowAuth(true);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Initializing Protocol Monitor</h2>
          <p className="text-gray-400">Connecting to blockchain networks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header 
        onNotificationsClick={() => setShowNotifications(true)}
        onSettingsClick={() => setShowSettings(true)}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
        notificationCount={notificationCount}
        isAuthenticated={isAuthenticated}
        userName={currentUser?.name?.split(' ')[0] || 'User'}
      />
      
      <main className="p-6">
        {/* Real-time Market Overview */}
        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">ETH Price</span>
                <span className="text-emerald-400 text-sm">+3.96%</span>
              </div>
              <div className="text-2xl font-bold text-white">
                ${marketData?.ethereum?.usd?.toFixed(2) || '3,285.50'}
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Gas Price</span>
                <span className="text-blue-400 text-sm">Live</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {networkStats?.gasPrice || 25} gwei
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Proposals</span>
                <span className="text-amber-400 text-sm">5 Active</span>
              </div>
              <div className="text-2xl font-bold text-white">15</div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Risk Level</span>
                <span className="text-amber-400 text-sm">Medium-High</span>
              </div>
              <div className="text-2xl font-bold text-white">68%</div>
            </div>
          </div>
          
          {/* Real-time Chart */}
          <RealTimeChart 
            data={chartData}
            title="ETH/USD Price Movement (24H) - Live Data"
            color="#10B981"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Panel - Network Monitoring */}
          <div className="xl:col-span-1">
            <NetworkMonitoringPanel 
              networks={mockNetworks}
              riskMetrics={mockRiskMetrics}
              sentimentData={mockSentimentData}
            />
          </div>
          
          {/* Center Panel - Protocol Upgrades */}
          <div className="xl:col-span-1">
            <ProtocolUpgradeTimeline 
              upgrades={mockUpgrades}
              marketData={mockMarketData}
            />
          </div>
          
          {/* Right Panel - Execution Guidance */}
          <div className="xl:col-span-1">
            <ExecutionGuidancePanel 
              guidance={mockExecutionGuidance}
              portfolio={mockPortfolio}
            />
          </div>
        </div>
      </main>
      
      {/* Modals */}
      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
      />
      
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      
      <SettingsPanel 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      
      <UserProfile 
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        userData={currentUser}
        isAuthenticated={isAuthenticated}
        onLogin={() => {
          setShowProfile(false);
          setShowAuth(true);
        }}
      />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
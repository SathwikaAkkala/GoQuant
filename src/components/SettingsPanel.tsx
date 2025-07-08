import React, { useState } from 'react';
import { Settings, X, Save, Bell, Shield, Database, Palette } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserSettings {
  notifications: {
    priceAlerts: boolean;
    governanceUpdates: boolean;
    riskAlerts: boolean;
    portfolioUpdates: boolean;
  };
  trading: {
    riskTolerance: number;
    autoRebalance: boolean;
    maxAllocation: number;
    stopLossEnabled: boolean;
  };
  display: {
    theme: 'dark' | 'light';
    currency: 'USD' | 'EUR' | 'BTC' | 'ETH';
    refreshInterval: number;
    compactMode: boolean;
  };
  api: {
    etherscanKey: string;
    coinGeckoKey: string;
    infuraKey: string;
  };
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      priceAlerts: true,
      governanceUpdates: true,
      riskAlerts: true,
      portfolioUpdates: false,
    },
    trading: {
      riskTolerance: 65,
      autoRebalance: false,
      maxAllocation: 25,
      stopLossEnabled: true,
    },
    display: {
      theme: 'dark',
      currency: 'USD',
      refreshInterval: 30,
      compactMode: false,
    },
    api: {
      etherscanKey: '',
      coinGeckoKey: '',
      infuraKey: '',
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (category: keyof UserSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // Save to localStorage or send to backend
    localStorage.setItem('protocolMonitorSettings', JSON.stringify(settings));
    setHasChanges(false);
    
    // Show success notification
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'trading', label: 'Trading', icon: Shield },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'api', label: 'API Keys', icon: Database },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Settings</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-96">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800/50 border-r border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <label className="text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'trading' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Trading Preferences</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Risk Tolerance (%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.trading.riskTolerance}
                      onChange={(e) => updateSetting('trading', 'riskTolerance', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-gray-400 text-sm mt-1">{settings.trading.riskTolerance}%</div>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Max Allocation per Asset (%)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={settings.trading.maxAllocation}
                      onChange={(e) => updateSetting('trading', 'maxAllocation', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-white">Auto Rebalancing</label>
                    <input
                      type="checkbox"
                      checked={settings.trading.autoRebalance}
                      onChange={(e) => updateSetting('trading', 'autoRebalance', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-white">Stop Loss Protection</label>
                    <input
                      type="checkbox"
                      checked={settings.trading.stopLossEnabled}
                      onChange={(e) => updateSetting('trading', 'stopLossEnabled', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'display' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Display Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Currency</label>
                    <select
                      value={settings.display.currency}
                      onChange={(e) => updateSetting('display', 'currency', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Refresh Interval (seconds)</label>
                    <select
                      value={settings.display.refreshInterval}
                      onChange={(e) => updateSetting('display', 'refreshInterval', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    >
                      <option value={10}>10 seconds</option>
                      <option value={30}>30 seconds</option>
                      <option value={60}>1 minute</option>
                      <option value={300}>5 minutes</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-white">Compact Mode</label>
                    <input
                      type="checkbox"
                      checked={settings.display.compactMode}
                      onChange={(e) => updateSetting('display', 'compactMode', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">API Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Etherscan API Key</label>
                    <input
                      type="password"
                      value={settings.api.etherscanKey}
                      onChange={(e) => updateSetting('api', 'etherscanKey', e.target.value)}
                      placeholder="Enter your Etherscan API key"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">CoinGecko API Key (Optional)</label>
                    <input
                      type="password"
                      value={settings.api.coinGeckoKey}
                      onChange={(e) => updateSetting('api', 'coinGeckoKey', e.target.value)}
                      placeholder="Enter your CoinGecko Pro API key"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Infura Project ID</label>
                    <input
                      type="password"
                      value={settings.api.infuraKey}
                      onChange={(e) => updateSetting('api', 'infuraKey', e.target.value)}
                      placeholder="Enter your Infura project ID"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            {hasChanges && 'You have unsaved changes'}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveSettings}
              disabled={!hasChanges}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                hasChanges
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
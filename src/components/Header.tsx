import React from 'react';
import { Activity, Settings, Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onNotificationsClick: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
  onLogout?: () => void;
  notificationCount?: number;
  isAuthenticated?: boolean;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onNotificationsClick, 
  onSettingsClick, 
  onProfileClick, 
  onLogout,
  notificationCount = 0,
  isAuthenticated = false,
  userName = 'User'
}) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-400" />
            <h1 className="text-xl font-bold text-white">Protocol Monitor</h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>System Status: Active</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Last Update:</span>
            <span className="text-white font-mono">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Welcome,</span>
              <span className="text-white font-medium">{userName}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onNotificationsClick}
              className="p-2 text-gray-400 hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
            <button 
              onClick={onSettingsClick}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={onProfileClick}
              className={`p-2 transition-colors ${
                isAuthenticated 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <User className="w-5 h-5" />
            </button>
            {isAuthenticated && onLogout && (
              <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const notificationTypes = [
        {
          type: 'warning' as const,
          title: 'Market Volatility Spike',
          message: 'ETH volatility increased by 18% following Uniswap V4 proposal announcement',
        },
        {
          type: 'success' as const,
          title: 'Governance Update',
          message: 'Aave V4 cross-chain parameters successfully implemented',
        },
        {
          type: 'info' as const,
          title: 'Gas Price Alert',
          message: 'Ethereum gas prices dropped to 18 gwei - optimal for transactions',
        },
        {
          type: 'error' as const,
          title: 'Risk Alert',
          message: 'MakerDAO RWA proposal risk score elevated to 85% - review positions',
        },
      ];

      if (Math.random() > 0.7) { // 30% chance of new notification
        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const newNotification: Notification = {
          id: uuidv4(),
          ...randomNotification,
          timestamp: new Date(),
          read: false,
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep only 20 notifications
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end pt-16 pr-6">
      <div className="bg-gray-900 border border-gray-700 rounded-lg w-96 max-h-96 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearAll}
              className="text-gray-400 hover:text-white text-sm"
            >
              Clear All
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors ${
                  !notification.read ? 'bg-blue-950/20' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
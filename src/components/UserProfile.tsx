import React, { useState } from 'react';
import { User, X, Edit, Camera, Mail, Phone, MapPin, Calendar, Shield, TrendingUp } from 'lucide-react';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: UserData | null;
  isAuthenticated?: boolean;
  onLogin?: () => void;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar: string;
  bio: string;
  tradingLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  totalTrades: number;
  successRate: number;
  totalPnL: number;
  riskScore: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  isOpen, 
  onClose, 
  userData: propUserData, 
  isAuthenticated = false,
  onLogin 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [defaultUserData] = useState<UserData>({
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: '2024-12-15',
    avatar: '',
    bio: 'Active DeFi trader and protocol analyst specializing in governance proposals and cross-chain yield optimization strategies.',
    tradingLevel: 'Advanced',
    totalTrades: 1847,
    successRate: 76.8,
    totalPnL: 67890,
    riskScore: 65,
  });

  const userData = propUserData || defaultUserData;
  const [editData, setEditData] = useState(userData);

  // Update editData when userData changes
  React.useEffect(() => {
    if (propUserData) {
      setEditData(propUserData);
    }
  }, [propUserData]);

  const handleSave = () => {
    setIsEditing(false);
    // Save to backend/localStorage
    localStorage.setItem('userProfile', JSON.stringify(editData));
    // Trigger a page refresh to update the data
    window.location.reload();
  };

  const handleCancel = () => {
    setEditData(propUserData || defaultUserData);
    setIsEditing(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-blue-400 bg-blue-400/20';
      case 'Advanced': return 'text-purple-400 bg-purple-400/20';
      case 'Expert': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (!isOpen) return null;

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-md shadow-2xl">
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">User Profile</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sign In Required</h3>
            <p className="text-gray-400 mb-6">
              Please sign in to view and manage your profile information.
            </p>
            <button
              onClick={() => {
                onClose();
                onLogin?.();
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">User Profile</h2>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="text-2xl font-bold text-white bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 w-full"
                />
              ) : (
                <h3 className="text-2xl font-bold text-white">{userData.name}</h3>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(userData.tradingLevel)}`}>
                  {userData.tradingLevel} Trader
                </span>
                <span className="text-gray-400 text-sm">
                  Joined {new Date(userData.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Information</h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  ) : (
                    <span className="text-gray-300">{userData.email}</span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  ) : (
                    <span className="text-gray-300">{userData.phone}</span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  ) : (
                    <span className="text-gray-300">{userData.location}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Trading Statistics */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Trading Statistics</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{userData.totalTrades.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Trades</div>
                </div>
                
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-400">{userData.successRate}%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    ${userData.totalPnL.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total P&L</div>
                </div>
                
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400">{userData.riskScore}</div>
                  <div className="text-sm text-gray-400">Risk Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">About</h4>
            {isEditing ? (
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                rows={3}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-300">{userData.bio}</p>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-700">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
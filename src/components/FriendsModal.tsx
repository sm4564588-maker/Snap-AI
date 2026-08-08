import React, { useState } from 'react';
import { 
  X, 
  Search, 
  UserPlus, 
  UserCheck, 
  UserMinus, 
  Flame, 
  MessageSquare, 
  Camera, 
  Check, 
  Sparkles, 
  Users
} from 'lucide-react';
import { Friend, UserProfile } from '../types';
import { MOCK_FRIENDS } from '../data/mockSocialData';

interface FriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onOpenChatWithFriend?: (friend: Friend) => void;
  onOpenSnapCameraWithFriend?: (friend: Friend) => void;
}

export const FriendsModal: React.FC<FriendsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onOpenChatWithFriend,
  onOpenSnapCameraWithFriend
}) => {
  const [friendsList, setFriendsList] = useState<Friend[]>(MOCK_FRIENDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'following' | 'followers'>('friends');

  if (!isOpen) return null;

  const handleSendRequest = (id: string) => {
    setFriendsList(prev => prev.map(f => f.id === id ? { ...f, friendRequestStatus: 'pending_sent' } : f));
  };

  const handleAcceptRequest = (id: string) => {
    setFriendsList(prev => prev.map(f => f.id === id ? { ...f, isFriend: true, friendRequestStatus: 'accepted' } : f));
  };

  const handleRejectRequest = (id: string) => {
    setFriendsList(prev => prev.map(f => f.id === id ? { ...f, friendRequestStatus: 'none' } : f));
  };

  const handleToggleFollow = (id: string) => {
    setFriendsList(prev => prev.map(f => f.id === id ? { ...f, isFollowing: !f.isFollowing } : f));
  };

  const handleRemoveFriend = (id: string) => {
    setFriendsList(prev => prev.map(f => f.id === id ? { ...f, isFriend: false, friendRequestStatus: 'none' } : f));
  };

  // Filters
  const filtered = friendsList.filter(f => {
    const matchesSearch = f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === 'friends') return f.isFriend;
    if (activeTab === 'requests') return f.friendRequestStatus === 'pending_received';
    if (activeTab === 'following') return f.isFollowing;
    if (activeTab === 'followers') return true;
    return true;
  });

  const pendingRequestsCount = friendsList.filter(f => f.friendRequestStatus === 'pending_received').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-lg rounded-[36px] bg-[#0c0c12] border-2 border-yellow-400/40 p-6 shadow-[0_0_80px_rgba(255,252,0,0.3)] space-y-5 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black shadow-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-white">Friends & Connections</h2>
              <p className="text-xs text-gray-400">Share food snaps, build streaks & follow fitness journeys</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends by username..."
            className="w-full bg-white/5 border border-white/15 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'friends', label: `Friends (${friendsList.filter(f => f.isFriend).length})` },
            { id: 'requests', label: `Requests (${pendingRequestsCount})`, badge: pendingRequestsCount > 0 },
            { id: 'following', label: `Following (${friendsList.filter(f => f.isFollowing).length})` },
            { id: 'followers', label: `Followers (${userProfile.followersCount || 384})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-yellow-400 text-black shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Friends List Scrollable */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-1">
          {filtered.length > 0 ? (
            filtered.map((friend) => (
              <div
                key={friend.id}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-400/40 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={friend.avatarUrl}
                      alt={friend.displayName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shadow-md"
                    />
                    {friend.streakDays > 0 && (
                      <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-yellow-400 text-black text-[9px] font-black shadow flex items-center gap-0.5">
                        <span>🔥</span>
                        <span>{friend.streakDays}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-heading font-black text-sm text-white">{friend.displayName}</h4>
                    <span className="text-[11px] text-gray-400 block">@{friend.username}</span>
                    <span className="text-[10px] text-yellow-400 font-bold">
                      {friend.todayProteinGrams}g / {friend.proteinGoalGrams}g today
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  {friend.friendRequestStatus === 'pending_received' ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleAcceptRequest(friend.id)}
                        className="px-3 py-1.5 rounded-xl bg-yellow-400 text-black font-black text-xs hover:bg-yellow-300 shadow-md cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(friend.id)}
                        className="px-2.5 py-1.5 rounded-xl bg-white/10 text-gray-400 hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ) : friend.isFriend ? (
                    <div className="flex items-center gap-1.5">
                      {onOpenSnapCameraWithFriend && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenSnapCameraWithFriend(friend);
                          }}
                          className="p-2 rounded-xl bg-yellow-400 text-black hover:scale-105 transition-transform cursor-pointer"
                          title="Send Snap"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                      {onOpenChatWithFriend && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenChatWithFriend(friend);
                          }}
                          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                          title="Direct Message"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveFriend(friend.id)}
                        className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                        title="Remove Friend"
                      >
                        <UserMinus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : friend.friendRequestStatus === 'pending_sent' ? (
                    <span className="px-3 py-1 rounded-xl bg-white/10 text-gray-400 text-xs font-bold">
                      Requested
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSendRequest(friend.id)}
                      className="px-3 py-1.5 rounded-xl bg-yellow-400 text-black font-black text-xs hover:bg-yellow-300 transition-all cursor-pointer flex items-center gap-1 shadow-md"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-xs text-gray-500 italic">No users found in this category.</p>
          )}
        </div>

      </div>
    </div>
  );
};

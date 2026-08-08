import React from 'react';
import { 
  Camera, 
  Sparkles, 
  LayoutDashboard, 
  History, 
  BarChart3, 
  MessageSquare, 
  Dumbbell, 
  Users, 
  Film, 
  Compass, 
  Settings, 
  Smartphone, 
  Flame 
} from 'lucide-react';
import { UserProfile } from '../types';

export type NavTabType = 'landing' | 'dashboard' | 'protein' | 'social' | 'reels' | 'discover' | 'history' | 'analytics' | 'chat';

interface HeaderNavProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  onOpenScanner: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenDownload: () => void;
  onOpenFriends?: () => void;
  userProfile: UserProfile;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenScanner,
  onOpenProfile,
  onOpenSettings,
  onOpenDownload,
  onOpenFriends,
  userProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-6 pt-3 pb-2">
      <div className="max-w-7xl mx-auto snap-glass rounded-full px-3 sm:px-5 py-2.5 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl bg-black/75">
        
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2 sm:gap-3 group text-left transition-transform hover:scale-105 shrink-0"
        >
          <div className="relative w-9 h-9 rounded-2xl bg-yellow-400 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(255,252,0,0.4)] group-hover:shadow-[0_0_30px_rgba(255,252,0,0.7)] transition-all">
            <div className="w-full h-full bg-black rounded-[13px] flex items-center justify-center relative overflow-hidden">
              <Camera className="w-4 h-4 text-yellow-400 transition-transform group-hover:rotate-12" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white">SNAP</span>
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-yellow-400">AI</span>
              <span className="px-1.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[9px] font-bold border border-yellow-400/30">v2.5</span>
            </div>
            <p className="text-[9px] text-gray-400 font-medium -mt-1 hidden lg:block">Snap. Analyze. Eat Smarter.</p>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 overflow-x-auto max-w-2xl">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('protein')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'protein'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            Protein Tracker
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'social'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Community
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reels'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            Food Reels
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'discover'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Discover
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            History
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Analytics
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            AI Coach
          </button>
        </nav>

        {/* Compact Tablet Navigation */}
        <nav className="hidden md:flex xl:hidden items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'dashboard' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('protein')}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'protein' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            Protein
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'social' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            Social
          </button>
          <button
            onClick={() => setActiveTab('reels')}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'reels' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            Reels
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'history' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'chat' ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            Coach
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Friends & Streak button */}
          {onOpenFriends && (
            <button
              onClick={onOpenFriends}
              className="px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-yellow-400 border border-yellow-400/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Friends & Streaks"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono text-[11px] font-extrabold flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                {userProfile.currentStreakDays || 7}d
              </span>
            </button>
          )}

          {/* Download App / APK CTA */}
          <button
            onClick={onOpenDownload}
            className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,252,0,0.2)]"
            title="Download App for Android, iOS & Mac"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">GET APP / APK</span>
          </button>

          {/* Main Snap CTA */}
          <button
            onClick={onOpenScanner}
            className="snap-yellow-btn px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(255,252,0,0.4)]"
          >
            <Camera className="w-3.5 h-3.5 fill-black" />
            <span className="hidden xs:inline text-[11px] font-black">SNAP MEAL</span>
          </button>

          {/* Profile & Settings */}
          <button
            onClick={onOpenProfile}
            className="p-0.5 rounded-full border border-yellow-400/40 hover:border-yellow-400 transition-all cursor-pointer relative shrink-0"
            title="Profile & Settings"
          >
            <img
              src={userProfile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
              alt="Avatar"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-black rounded-full" />
          </button>

          <button
            onClick={onOpenSettings}
            className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-yellow-400 border border-white/10 transition-all cursor-pointer"
            title="Settings"
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Snapchat Style with all core tabs) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
        <div className="snap-glass rounded-full px-3 py-2 flex items-center justify-between border border-yellow-400/30 shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-2xl bg-black/90">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`p-1.5 rounded-2xl flex flex-col items-center gap-0.5 transition-all ${
              activeTab === 'dashboard' ? 'text-yellow-400 scale-105' : 'text-gray-400'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[8px] font-extrabold">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('protein')}
            className={`p-1.5 rounded-2xl flex flex-col items-center gap-0.5 transition-all ${
              activeTab === 'protein' ? 'text-yellow-400 scale-105' : 'text-gray-400'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span className="text-[8px] font-extrabold">Protein</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`p-1.5 rounded-2xl flex flex-col items-center gap-0.5 transition-all ${
              activeTab === 'social' ? 'text-yellow-400 scale-105' : 'text-gray-400'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[8px] font-extrabold">Social</span>
          </button>

          {/* Big Center Snap Button */}
          <button
            onClick={onOpenScanner}
            className="w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,252,0,0.6)] border-2 border-black -mt-5 active:scale-90 transition-transform"
            title="Snap Meal"
          >
            <Camera className="w-5 h-5 fill-black" />
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`p-1.5 rounded-2xl flex flex-col items-center gap-0.5 transition-all ${
              activeTab === 'reels' ? 'text-yellow-400 scale-105' : 'text-gray-400'
            }`}
          >
            <Film className="w-4 h-4" />
            <span className="text-[8px] font-extrabold">Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`p-1.5 rounded-2xl flex flex-col items-center gap-0.5 transition-all ${
              activeTab === 'discover' ? 'text-yellow-400 scale-105' : 'text-gray-400'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[8px] font-extrabold">Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`p-1.5 rounded-2xl flex flex-col items-center gap-0.5 transition-all ${
              activeTab === 'chat' ? 'text-yellow-400 scale-105' : 'text-gray-400'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[8px] font-extrabold">Coach</span>
          </button>
        </div>
      </div>
    </header>
  );
};

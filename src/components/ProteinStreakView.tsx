import React, { useState } from 'react';
import { 
  Flame, 
  Check, 
  Award, 
  Sparkles, 
  Bell, 
  Clock, 
  Share2, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  Trophy,
  RotateCcw
} from 'lucide-react';
import { UserProfile, DayStreakItem, AchievementBadge } from '../types';
import { MOCK_ACHIEVEMENTS, MOCK_STREAK_DAYS, MOCK_FRIENDS } from '../data/mockSocialData';

interface ProteinStreakViewProps {
  userProfile: UserProfile;
  onClose?: () => void;
  onOpenScanner?: () => void;
}

export const ProteinStreakView: React.FC<ProteinStreakViewProps> = ({
  userProfile,
  onClose,
  onOpenScanner
}) => {
  const [streakDays, setStreakDays] = useState<DayStreakItem[]>(MOCK_STREAK_DAYS);
  const [streakReminders, setStreakReminders] = useState<boolean>(userProfile.streakReminders ?? true);
  const [showBreakRecovery, setShowBreakRecovery] = useState<boolean>(false);

  const currentStreak = userProfile.currentStreakDays || 7;
  const longestStreak = userProfile.longestStreakDays || 19;

  const MILESTONES = [
    { days: 3, label: '3 Day Streak', icon: '🔥', reward: '+150 XP', unlocked: currentStreak >= 3 },
    { days: 7, label: '7 Day Streak', icon: '⚡', reward: '+300 XP', unlocked: currentStreak >= 7 },
    { days: 14, label: '14 Day Streak', icon: '🌟', reward: '+600 XP', unlocked: currentStreak >= 14 },
    { days: 30, label: '30 Day Streak', icon: '👑', reward: '+1500 XP', unlocked: currentStreak >= 30 },
    { days: 60, label: '60 Day Streak', icon: '💎', reward: '+3500 XP', unlocked: currentStreak >= 60 },
    { days: 100, label: '100 Day Streak', icon: '🏆', reward: '+10,000 XP', unlocked: currentStreak >= 100 }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in p-3 sm:p-4">
      
      {/* HERO STREAK BANNER */}
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 p-8 sm:p-10 text-black shadow-[0_0_80px_rgba(255,252,0,0.5)]">
        
        {/* Glow & Ghost graphics */}
        <div className="absolute top-2 right-4 text-8xl opacity-15 select-none font-black">
          🔥
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-yellow-400 text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-yellow-400" />
              <span>SNAP PROTEIN STREAK</span>
            </div>

            <h1 className="font-heading font-black text-5xl sm:text-6xl text-black tracking-tight flex items-center justify-center md:justify-start gap-3">
              <span>🔥 {currentStreak} DAY STREAK</span>
            </h1>

            <p className="text-sm font-bold text-black/80 max-w-md">
              You've hit your {userProfile.dailyProteinGoalGrams}g daily protein target for {currentStreak} consecutive days! Keep the flame burning.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-black/15 font-black text-xs">
                Longest: {longestStreak} Days
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-black/15 font-black text-xs">
                Total Tracked: {(userProfile.totalProteinTrackedGrams / 1000).toFixed(1)}kg
              </div>
            </div>
          </div>

          {/* Big Action Shutter for today */}
          <div className="text-center shrink-0 space-y-2">
            {onOpenScanner && (
              <button
                onClick={onOpenScanner}
                className="px-6 py-4 rounded-3xl bg-black text-yellow-400 font-black text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xl flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 fill-yellow-400" />
                <span>SNAP TODAY'S MEAL</span>
              </button>
            )}
            <span className="text-[11px] font-bold text-black/70 block">
              13h remaining before midnight reset
            </span>
          </div>
        </div>

        {/* 7-DAY PROGRESS CHECKMARKS ROW */}
        <div className="mt-8 pt-6 border-t border-black/15 grid grid-cols-7 gap-2">
          {streakDays.map((day, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-black/10 text-center"
            >
              <span className="text-[11px] font-black">{day.dayLabel}</span>
              <div className="w-8 h-8 rounded-full bg-black text-yellow-400 flex items-center justify-center font-black text-xs shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-[10px] font-bold text-black/80">{day.proteinGrams}g</span>
            </div>
          ))}
        </div>

      </div>

      {/* MILESTONE BADGES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-black text-lg text-white">Milestone Badges</h3>
          </div>
          <span className="text-xs text-yellow-400 font-bold">Earn XP & Special Roles</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {MILESTONES.map((badge, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-3xl border text-center space-y-2 transition-all ${
                badge.unlocked
                  ? 'bg-yellow-400/10 border-yellow-400/50 shadow-[0_0_25px_rgba(255,252,0,0.2)]'
                  : 'bg-white/5 border-white/10 opacity-50'
              }`}
            >
              <div className="text-3xl">{badge.icon}</div>
              <div>
                <h4 className="font-heading font-black text-xs text-white leading-tight">{badge.label}</h4>
                <span className="text-[10px] font-bold text-yellow-400 block mt-0.5">{badge.reward}</span>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black ${
                badge.unlocked ? 'bg-yellow-400 text-black' : 'bg-white/10 text-gray-400'
              }`}>
                {badge.unlocked ? 'UNLOCKED' : `${badge.days} Days`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FRIEND STREAKS SECTION */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h3 className="font-heading font-black text-base text-white">Friend Streaks</h3>
          </div>
          <span className="text-xs text-gray-400">Interact daily to grow social streaks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MOCK_FRIENDS.slice(0, 3).map((friend) => (
            <div
              key={friend.id}
              className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <img src={friend.avatarUrl} alt={friend.displayName} className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400" />
                <div>
                  <h4 className="font-bold text-xs text-white">{friend.displayName}</h4>
                  <span className="text-[10px] text-gray-400">@{friend.username}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-400 text-black text-xs font-black">
                  <span>🔥</span>
                  <span>{friend.streakDays}d</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTIFICATION SETTINGS & STREAK BREAK RECOVERY TOGGLE */}
      <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Daily Streak Reminders</h4>
            <p className="text-xs text-gray-400">Get a snappy notification at 6 PM if you haven't reached your protein goal.</p>
          </div>
        </div>

        <button
          onClick={() => setStreakReminders(!streakReminders)}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            streakReminders ? 'bg-yellow-400 text-black font-black shadow-md' : 'bg-white/10 text-gray-400'
          }`}
        >
          {streakReminders ? 'Reminders ON' : 'Reminders OFF'}
        </button>
      </div>

      {/* FRIENDLY STREAK RECOVERY SCREEN TOGGLE */}
      {showBreakRecovery && (
        <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/30 text-center space-y-3 animate-fade-in">
          <span className="text-4xl">💔</span>
          <h3 className="font-heading font-black text-lg text-white">Streak Paused? No Worries!</h3>
          <p className="text-xs text-gray-300 max-w-sm mx-auto">
            Fitness is a lifelong journey. Start a brand-new streak today with a 40g protein meal snap!
          </p>
          <button
            onClick={() => setShowBreakRecovery(false)}
            className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-black text-xs shadow-lg cursor-pointer"
          >
            START FRESH STREAK
          </button>
        </div>
      )}

    </div>
  );
};

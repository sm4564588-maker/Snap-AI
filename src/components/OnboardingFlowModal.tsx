import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Dumbbell, 
  Flame, 
  TrendingUp, 
  Check, 
  Camera, 
  User, 
  ArrowRight, 
  Shield, 
  Zap,
  Target
} from 'lucide-react';
import { UserProfile, FitnessGoal, DietPreference } from '../types';

interface OnboardingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const OnboardingFlowModal: React.FC<OnboardingFlowModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile
}) => {
  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState(userProfile.username.replace('@', '') || 'snap_fitness');
  const [displayName, setDisplayName] = useState(userProfile.displayName || 'Snap Athlete');
  const [bio, setBio] = useState(userProfile.bio || 'Tracking protein with Snap AI 🟡💪');
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>(userProfile.fitnessGoal || 'muscle');
  const [proteinGoalGrams, setProteinGoalGrams] = useState<number>(userProfile.dailyProteinGoalGrams || 150);
  const [dietPreference, setDietPreference] = useState<DietPreference>(userProfile.dietPreference || 'high-protein');
  const [customAvatarUploaded, setCustomAvatarUploaded] = useState(false);

  if (!isOpen) return null;

  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
          setCustomAvatarUploaded(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    const updated: UserProfile = {
      ...userProfile,
      username: username.startsWith('@') ? username : `@${username}`,
      displayName,
      bio,
      avatarUrl,
      fitnessGoal,
      dailyProteinGoalGrams: proteinGoalGrams,
      dietPreference,
      isOnboarded: true,
      isLoggedIn: true,
      xpPoints: (userProfile.xpPoints || 1000) + 150
    };
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg snap-glass rounded-[36px] border-2 border-yellow-400/40 shadow-[0_0_80px_rgba(255,252,0,0.35)] overflow-hidden bg-black/95 flex flex-col my-auto max-h-[95vh]">
        
        {/* Top Progress bar */}
        <div className="w-full bg-white/10 h-1.5">
          <div 
            className="bg-yellow-400 h-full transition-all duration-300 shadow-[0_0_10px_#FFFC00]" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="p-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black shadow-[0_0_20px_rgba(255,252,0,0.5)]">
              <Zap className="w-5 h-5 fill-black" />
            </div>
            <div>
              <h2 className="font-heading font-black text-lg text-white">Snap AI Onboarding</h2>
              <p className="text-[11px] text-gray-400">Step {step} of 3 • Custom profile & protein targets</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: Welcome & Account Info */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-black border border-yellow-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Welcome to Snap AI</span>
                </div>
                <h3 className="font-heading font-black text-2xl text-white">Create Your Snap Identity</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Snap your food, hit your daily protein goal, and build streaks with fitness friends.
                </p>
              </div>

              {/* Avatar Picker */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-200 shadow-[0_0_30px_rgba(255,252,0,0.4)]">
                    <img 
                      src={avatarUrl} 
                      alt="Avatar Preview" 
                      className="w-full h-full rounded-full object-cover bg-black"
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 p-2 rounded-full bg-yellow-400 text-black shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-transform">
                    <Camera className="w-4 h-4" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {/* Preset Avatars */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">Presets:</span>
                  {AVATAR_PRESETS.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAvatarUrl(url)}
                      className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform cursor-pointer ${
                        avatarUrl === url ? 'border-yellow-400 scale-110' : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Username & Name Input */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Username</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-400 font-bold text-sm">@</span>
                    <input 
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="username"
                      className="w-full bg-white/5 border border-white/15 rounded-2xl pl-8 pr-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">Unique handle for your friends to search and send snaps</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Display Name</label>
                  <input 
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">Bio</label>
                  <input 
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Your fitness bio or daily motto"
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Fitness Goal */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center space-y-1">
                <h3 className="font-heading font-black text-2xl text-white">Select Your Fitness Goal</h3>
                <p className="text-xs text-gray-400">
                  We'll calibrate your AI food scanner and daily protein streak targets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'muscle' as FitnessGoal,
                    title: 'Build Muscle',
                    desc: 'Maximize protein synthesis & lean gains',
                    icon: Dumbbell,
                    recommendedProtein: 160
                  },
                  {
                    id: 'fat_loss' as FitnessGoal,
                    title: 'Lose Fat',
                    desc: 'High protein satiety with calorie deficit',
                    icon: Flame,
                    recommendedProtein: 140
                  },
                  {
                    id: 'maintain' as FitnessGoal,
                    title: 'Maintain',
                    desc: 'Healthy body composition & wellness',
                    icon: Target,
                    recommendedProtein: 130
                  },
                  {
                    id: 'general' as FitnessGoal,
                    title: 'General Fitness',
                    desc: 'Clean energy, sports & daily vitality',
                    icon: TrendingUp,
                    recommendedProtein: 120
                  }
                ].map((goalItem) => {
                  const Icon = goalItem.icon;
                  const isSelected = fitnessGoal === goalItem.id;
                  return (
                    <button
                      key={goalItem.id}
                      onClick={() => {
                        setFitnessGoal(goalItem.id);
                        setProteinGoalGrams(goalItem.recommendedProtein);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_25px_rgba(255,252,0,0.3)] font-bold'
                          : 'bg-white/5 text-white border-white/10 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-black text-yellow-400' : 'bg-white/10 text-yellow-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-black stroke-[3]" />}
                      </div>

                      <div>
                        <h4 className="font-heading font-black text-sm">{goalItem.title}</h4>
                        <p className={`text-xs mt-0.5 ${isSelected ? 'text-black/80' : 'text-gray-400'}`}>
                          {goalItem.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Diet Preference Pill Select */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gray-300 block">Diet Preference</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'high-protein' as DietPreference, label: '🥩 High Protein' },
                    { id: 'balanced' as DietPreference, label: '🥗 Balanced' },
                    { id: 'keto' as DietPreference, label: '🥑 Keto / Low Carb' },
                    { id: 'vegan' as DietPreference, label: '🌱 Vegan / Plant' },
                    { id: 'vegetarian' as DietPreference, label: '🥚 Vegetarian' }
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      onClick={() => setDietPreference(diet.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                        dietPreference === diet.id
                          ? 'bg-yellow-400 text-black border-yellow-400'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {diet.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Daily Protein Target */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-black border border-yellow-400/30">
                  <Flame className="w-3.5 h-3.5 fill-yellow-400" />
                  <span>Streak Target</span>
                </div>
                <h3 className="font-heading font-black text-2xl text-white">Daily Protein Goal</h3>
                <p className="text-xs text-gray-400">
                  Hit this amount each day to build your streak and earn XP milestone badges!
                </p>
              </div>

              {/* Big Protein Goal Display */}
              <div className="p-6 rounded-3xl bg-yellow-400/10 border-2 border-yellow-400/40 text-center space-y-2 shadow-[0_0_30px_rgba(255,252,0,0.15)]">
                <span className="text-xs font-black uppercase tracking-wider text-yellow-400">YOUR TARGET</span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="font-heading font-black text-6xl text-yellow-400 tracking-tight">
                    {proteinGoalGrams}
                  </span>
                  <span className="text-xl font-black text-white">grams/day</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  ≈ {Math.round(proteinGoalGrams * 4)} kcal from protein • {Math.round(proteinGoalGrams / 30)} hearty meals
                </p>
              </div>

              {/* Protein Slider & Quick Presets */}
              <div className="space-y-3">
                <input 
                  type="range" 
                  min="60" 
                  max="280" 
                  step="5"
                  value={proteinGoalGrams}
                  onChange={(e) => setProteinGoalGrams(Number(e.target.value))}
                  className="w-full accent-yellow-400 cursor-pointer h-2 bg-white/10 rounded-lg"
                />

                <div className="flex items-center justify-between gap-2">
                  {[100, 130, 150, 180, 200].map((val) => (
                    <button
                      key={val}
                      onClick={() => setProteinGoalGrams(val)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        proteinGoalGrams === val
                          ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_15px_rgba(255,252,0,0.3)]'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {val}g
                    </button>
                  ))}
                </div>
              </div>

              {/* Bonus XP Box */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black">
                    ⚡
                  </div>
                  <div>
                    <span className="font-bold text-white block">Welcome Bonus Ready</span>
                    <span className="text-gray-400 text-[10px]">Earn +150 XP & unlock Level 1 instantly</span>
                  </div>
                </div>
                <span className="font-heading font-black text-yellow-400 text-sm">+150 XP</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-3 border-t border-white/10 bg-black/60 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold transition-all cursor-pointer"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-extrabold transition-all cursor-pointer"
            >
              Skip
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 px-6 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,252,0,0.4)] transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex-1 px-6 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,252,0,0.5)] transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>START TRACKING WITH SNAP AI</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

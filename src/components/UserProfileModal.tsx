import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, User, Save, Target, Flame, Dumbbell, Sparkles } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  const [profile, setProfile] = useState<UserProfile>({ ...userProfile });

  if (!isOpen) return null;

  // Recalculate macro targets based on fitness goals
  const handleCalculateGoals = () => {
    let baseCalories = Math.round(10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + 5);
    
    if (profile.activityLevel === 'moderate') baseCalories = Math.round(baseCalories * 1.375);
    else if (profile.activityLevel === 'active') baseCalories = Math.round(baseCalories * 1.55);
    else if (profile.activityLevel === 'athlete') baseCalories = Math.round(baseCalories * 1.725);
    else baseCalories = Math.round(baseCalories * 1.2);

    if (profile.goal === 'lose') baseCalories -= 400;
    else if (profile.goal === 'gain' || profile.goal === 'muscle') baseCalories += 300;

    const proteinGrams = Math.round(profile.weightKg * 2.2); // ~1g per lb
    const fatGrams = Math.round((baseCalories * 0.25) / 9);
    const carbsGrams = Math.round((baseCalories - (proteinGrams * 4 + fatGrams * 9)) / 4);

    setProfile((prev) => ({
      ...prev,
      dailyCalorieGoal: baseCalories,
      proteinGoalGrams: proteinGrams,
      carbsGoalGrams: Math.max(50, carbsGrams),
      fatGoalGrams: fatGrams,
    }));
  };

  const handleSave = () => {
    onUpdateProfile(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-xl snap-glass rounded-[32px] border-2 border-yellow-400/40 shadow-[0_0_50px_rgba(255,252,0,0.3)] overflow-hidden bg-black/90 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black">
              <User className="w-5 h-5 fill-black" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl text-white">Fitness & Bio Profile</h2>
              <p className="text-xs text-gray-400">Personalize your daily calorie & macro goals</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Name & Basic Bio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Your Display Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="male" className="bg-black">Male</option>
                <option value="female" className="bg-black">Female</option>
                <option value="other" className="bg-black">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={profile.weightKg}
                onChange={(e) => setProfile({ ...profile, weightKg: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={profile.heightCm}
                onChange={(e) => setProfile({ ...profile, heightCm: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Primary Fitness Goal</label>
              <select
                value={profile.goal}
                onChange={(e) => setProfile({ ...profile, goal: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="lose" className="bg-black">Fat Loss (Calorie Deficit)</option>
                <option value="maintain" className="bg-black">Maintain Weight & Recomp</option>
                <option value="muscle" className="bg-black">Muscle Building (Hypertrophy)</option>
                <option value="gain" className="bg-black">Weight Gain</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Dietary Preference</label>
              <select
                value={profile.dietPreference}
                onChange={(e) => setProfile({ ...profile, dietPreference: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="high-protein" className="bg-black">High Protein</option>
                <option value="balanced" className="bg-black">Balanced Macro Ratio</option>
                <option value="keto" className="bg-black">Keto (Low Carb)</option>
                <option value="vegan" className="bg-black">Vegan Plant-Based</option>
                <option value="vegetarian" className="bg-black">Vegetarian</option>
              </select>
            </div>
          </div>

          {/* Auto Calculate Button */}
          <button
            onClick={handleCalculateGoals}
            className="w-full py-2.5 rounded-xl bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 text-xs font-bold border border-yellow-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Recalculate Recommended Daily Macros</span>
          </button>

          {/* Macro Goal Manual Adjusters */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-yellow-400" /> Daily Target Allocations
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">Calories</span>
                <input
                  type="number"
                  value={profile.dailyCalorieGoal}
                  onChange={(e) => setProfile({ ...profile, dailyCalorieGoal: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-yellow-400 font-bold"
                />
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block font-bold">Protein (g)</span>
                <input
                  type="number"
                  value={profile.proteinGoalGrams}
                  onChange={(e) => setProfile({ ...profile, proteinGoalGrams: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-emerald-400 font-bold"
                />
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block font-bold">Carbs (g)</span>
                <input
                  type="number"
                  value={profile.carbsGoalGrams}
                  onChange={(e) => setProfile({ ...profile, carbsGoalGrams: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-blue-400 font-bold"
                />
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block font-bold">Fat (g)</span>
                <input
                  type="number"
                  value={profile.fatGoalGrams}
                  onChange={(e) => setProfile({ ...profile, fatGoalGrams: Number(e.target.value) })}
                  className="w-full px-2 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-orange-400 font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-end gap-3 bg-black/80">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="snap-yellow-btn px-6 py-2.5 rounded-full text-xs font-black flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

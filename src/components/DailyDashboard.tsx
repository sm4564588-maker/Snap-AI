import React from 'react';
import { Camera, Upload, History, Bookmark, TrendingUp, Flame, Dumbbell, Wheat, Droplet, Plus, Sparkles, ChevronRight, Trash2, Heart } from 'lucide-react';
import { MealAnalysisResult, UserProfile } from '../types';

interface DailyDashboardProps {
  userProfile: UserProfile;
  savedMeals: MealAnalysisResult[];
  onOpenScanner: () => void;
  onOpenUpload: () => void;
  onNavigateTab: (tab: 'history' | 'analytics' | 'chat') => void;
  onSelectMeal: (meal: MealAnalysisResult) => void;
  onDeleteMeal: (mealId: string) => void;
  onToggleFavorite: (mealId: string) => void;
  onAddWater: (amountMl: number) => void;
}

export const DailyDashboard: React.FC<DailyDashboardProps> = ({
  userProfile,
  savedMeals,
  onOpenScanner,
  onOpenUpload,
  onNavigateTab,
  onSelectMeal,
  onDeleteMeal,
  onToggleFavorite,
  onAddWater,
}) => {
  // Calculate today's totals from savedMeals
  const totalCalories = savedMeals.reduce((acc, m) => acc + m.totalNutrition.calories, 0);
  const totalProtein = savedMeals.reduce((acc, m) => acc + m.totalNutrition.protein, 0);
  const totalCarbs = savedMeals.reduce((acc, m) => acc + m.totalNutrition.carbs, 0);
  const totalFat = savedMeals.reduce((acc, m) => acc + m.totalNutrition.fat, 0);

  const calPct = Math.min(100, Math.round((totalCalories / userProfile.dailyCalorieGoal) * 100));
  const proteinPct = Math.min(100, Math.round((totalProtein / userProfile.proteinGoalGrams) * 100));
  const carbsPct = Math.min(100, Math.round((totalCarbs / userProfile.carbsGoalGrams) * 100));
  const fatPct = Math.min(100, Math.round((totalFat / userProfile.fatGoalGrams) * 100));
  const waterPct = Math.min(100, Math.round((userProfile.waterIntakeMl / userProfile.waterGoalMl) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 pb-28">
      
      {/* Top Welcome & Quick Snap Banner */}
      <div className="snap-glass rounded-[32px] p-6 sm:p-8 border-2 border-yellow-400/30 relative overflow-hidden bg-gradient-to-r from-black via-zinc-900 to-black">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-extrabold border border-yellow-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SNAP AI DAILY SUMMARY</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Welcome Back, <span className="text-yellow-400">{userProfile.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl font-medium">
              You've logged <strong className="text-white">{savedMeals.length} meals</strong> today. You're <strong className="text-yellow-400">{userProfile.dailyCalorieGoal - totalCalories > 0 ? `${userProfile.dailyCalorieGoal - totalCalories} kcal` : '0 kcal'}</strong> under your daily calorie target!
            </p>
          </div>

          <button
            onClick={onOpenScanner}
            className="snap-yellow-btn px-8 py-4 rounded-full text-sm font-black flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(255,252,0,0.5)] active:scale-95"
          >
            <Camera className="w-5 h-5 fill-black" />
            <span>SNAP TODAY'S MEAL</span>
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          
          <button
            onClick={onOpenScanner}
            className="snap-glass hover:snap-glass-yellow p-4 rounded-2xl border border-white/10 hover:border-yellow-400 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5 fill-black" />
            </div>
            <span className="text-xs font-extrabold text-white">Scan Meal</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="snap-glass hover:snap-glass-yellow p-4 rounded-2xl border border-white/10 hover:border-yellow-400 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 text-yellow-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-white">Upload Photo</span>
          </button>

          <button
            onClick={() => onNavigateTab('history')}
            className="snap-glass hover:snap-glass-yellow p-4 rounded-2xl border border-white/10 hover:border-yellow-400 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <History className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-white">View History</span>
          </button>

          <button
            onClick={() => onNavigateTab('history')}
            className="snap-glass hover:snap-glass-yellow p-4 rounded-2xl border border-white/10 hover:border-yellow-400 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 text-purple-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-white">Saved Meals</span>
          </button>

          <button
            onClick={() => onNavigateTab('analytics')}
            className="col-span-2 sm:col-span-1 snap-glass hover:snap-glass-yellow p-4 rounded-2xl border border-white/10 hover:border-yellow-400 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-extrabold text-white">Analytics</span>
          </button>
        </div>
      </div>

      {/* Daily Progress Rings & Macro Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calorie Ring Main Progress Card */}
        <div className="lg:col-span-5 snap-glass rounded-[32px] p-6 sm:p-8 border border-white/10 flex flex-col items-center justify-between text-center relative">
          <h3 className="font-heading font-black text-xl text-white mb-2">Daily Calorie Target</h3>
          
          {/* Central Calorie Circular Ring */}
          <div className="relative w-48 h-48 my-4 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-yellow-400 stroke-current transition-all duration-1000 ease-out shadow-lg"
                strokeWidth="3.5"
                strokeDasharray={`${calPct}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Flame className="w-6 h-6 text-yellow-400 fill-yellow-400 mb-1" />
              <span className="font-heading font-black text-3xl text-white">{totalCalories}</span>
              <span className="text-xs font-semibold text-gray-400">/ {userProfile.dailyCalorieGoal} kcal</span>
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-bold">
                {calPct}% Achieved
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 font-medium">
            Goal: <span className="text-white font-bold">{userProfile.goal.toUpperCase()}</span> • Preference: <span className="text-yellow-400 font-bold">{userProfile.dietPreference}</span>
          </p>
        </div>

        {/* Macros Breakdown Progress List */}
        <div className="lg:col-span-7 snap-glass rounded-[32px] p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-heading font-black text-xl text-white">Daily Macro Goals</h3>
              <p className="text-xs text-gray-400">Live progress toward your target profile</p>
            </div>
            <button
              onClick={() => onNavigateTab('analytics')}
              className="text-xs font-bold text-yellow-400 flex items-center gap-1 hover:underline"
            >
              <span>Full Stats</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Protein Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5" /> Protein Goal
              </span>
              <span className="text-white">{Math.round(totalProtein)}g / {userProfile.proteinGoalGrams}g ({proteinPct}%)</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${proteinPct}%` }} />
            </div>
          </div>

          {/* Carbs Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-blue-400 flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5" /> Carbohydrates
              </span>
              <span className="text-white">{Math.round(totalCarbs)}g / {userProfile.carbsGoalGrams}g ({carbsPct}%)</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
              <div className="bg-blue-400 h-full rounded-full transition-all duration-500" style={{ width: `${carbsPct}%` }} />
            </div>
          </div>

          {/* Fat Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-orange-400 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5" /> Healthy Fats
              </span>
              <span className="text-white">{Math.round(totalFat)}g / {userProfile.fatGoalGrams}g ({fatPct}%)</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
              <div className="bg-orange-400 h-full rounded-full transition-all duration-500" style={{ width: `${fatPct}%` }} />
            </div>
          </div>

          {/* Water Intake Tracker */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Droplet className="w-5 h-5 fill-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Hydration Tracker</p>
                <p className="text-xs text-blue-300 font-extrabold">{userProfile.waterIntakeMl} / {userProfile.waterGoalMl} ml ({waterPct}%)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onAddWater(250)}
                className="px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 text-xs font-bold border border-blue-500/30 transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> +250ml
              </button>
              <button
                onClick={() => onAddWater(500)}
                className="px-3 py-1.5 rounded-xl bg-blue-500/30 hover:bg-blue-500/50 text-blue-200 text-xs font-bold border border-blue-500/40 transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> +500ml
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Logged Meals Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-black text-2xl text-white">Today's Meals Log</h2>
            <p className="text-xs text-gray-400">Click any meal to view full AI nutrition analysis</p>
          </div>

          <button
            onClick={() => onNavigateTab('history')}
            className="text-xs font-extrabold text-yellow-400 hover:underline flex items-center gap-1"
          >
            <span>View All History</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {savedMeals.length === 0 ? (
          <div className="snap-glass rounded-[32px] p-12 text-center border border-white/10 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-xl text-white">No Meals Logged Yet</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Snap a photo of your breakfast, lunch, or dinner to instantly analyze calories and macros!
            </p>
            <button
              onClick={onOpenScanner}
              className="snap-yellow-btn px-6 py-3 rounded-full text-xs font-black"
            >
              SNAP YOUR FIRST MEAL
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedMeals.map((meal) => (
              <div
                key={meal.id}
                onClick={() => onSelectMeal(meal)}
                className="snap-glass hover:snap-glass-yellow rounded-2xl p-4 border border-white/10 hover:border-yellow-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img
                      src={meal.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                      alt={meal.mealName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-mono">
                        {new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-bold">
                        Score: {meal.mealScore}
                      </span>
                    </div>

                    <h4 className="font-heading font-black text-sm text-white truncate mt-0.5 group-hover:text-yellow-400 transition-colors">
                      {meal.mealName}
                    </h4>

                    <p className="text-xs text-yellow-400 font-extrabold mt-1">
                      {meal.totalNutrition.calories} kcal • P: {meal.totalNutrition.protein}g
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Carbs: {meal.totalNutrition.carbs}g • Fat: {meal.totalNutrition.fat}g</span>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onToggleFavorite(meal.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        meal.favorite ? 'text-red-400 bg-red-400/20' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${meal.favorite ? 'fill-red-400' : ''}`} />
                    </button>

                    <button
                      onClick={() => onDeleteMeal(meal.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Utensils, 
  Zap, 
  Trophy, 
  Share2, 
  Award,
  Bell,
  RefreshCw
} from 'lucide-react';
import { UserProfile, MealAnalysisResult } from '../types';

interface MealEntry {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  protein: number;
  calories: number;
  time: string;
  imageUrl?: string;
  isAiScanned?: boolean;
}

interface DailyProteinDashboardProps {
  userProfile: UserProfile;
  onOpenScanner: () => void;
  onOpenStreakModal?: () => void;
  onShareProteinProgress?: () => void;
}

export const DailyProteinDashboard: React.FC<DailyProteinDashboardProps> = ({
  userProfile,
  onOpenScanner,
  onOpenStreakModal,
  onShareProteinProgress
}) => {
  const goalGrams = userProfile.dailyProteinGoalGrams || 150;
  
  // Daily Meals state
  const [meals, setMeals] = useState<MealEntry[]>([
    { id: 'm-1', type: 'breakfast', name: 'Poached Eggs & Sourdough Toast', protein: 25, calories: 380, time: '8:15 AM', isAiScanned: true },
    { id: 'm-2', type: 'lunch', name: 'Atlantic Salmon & Quinoa Bowl', protein: 32, calories: 540, time: '1:10 PM', isAiScanned: true },
    { id: 'm-3', type: 'snack', name: 'Greek Yogurt & Chia Seeds', protein: 10, calories: 140, time: '4:20 PM', isAiScanned: false },
    { id: 'm-4', type: 'dinner', name: 'Grilled Herb Chicken Fillet', protein: 15, calories: 280, time: '7:45 PM', isAiScanned: true }
  ]);

  // Quick manual add form
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualGrams, setManualGrams] = useState(25);
  const [manualMealType, setManualMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('snack');
  const [manualName, setManualName] = useState('Protein Shake / Snack');

  // Chart view: 'daily' | 'weekly' | 'monthly'
  const [chartView, setChartView] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Calculate totals
  const totalProtein = meals.reduce((acc, m) => acc + m.protein, 0);
  const remainingProtein = Math.max(0, goalGrams - totalProtein);
  const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const progressPct = Math.min(100, Math.round((totalProtein / goalGrams) * 100));

  // Midnight reset countdown
  const [timeUntilMidnight, setTimeUntilMidnight] = useState('13h 42m');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diffMs = midnight.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeUntilMidnight(`${hours}h ${minutes}m`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddManualMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: MealEntry = {
      id: 'm-' + Date.now(),
      type: manualMealType,
      name: manualName || 'Custom Protein Meal',
      protein: Number(manualGrams),
      calories: Math.round(Number(manualGrams) * 4.2 + 80),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAiScanned: false
    };
    setMeals(prev => [newEntry, ...prev]);
    setShowManualModal(false);
  };

  // Weekly data
  const weeklyHistory = [
    { day: 'Mon', protein: 155, calories: 2350, met: true },
    { day: 'Tue', protein: 162, calories: 2420, met: true },
    { day: 'Wed', protein: 148, calories: 2180, met: true },
    { day: 'Thu', protein: 170, calories: 2510, met: true },
    { day: 'Fri', protein: 158, calories: 2390, met: true },
    { day: 'Sat', protein: 165, calories: 2450, met: true },
    { day: 'Today', protein: totalProtein, calories: totalCalories, met: totalProtein >= goalGrams }
  ];

  const weeklyAvg = Math.round(weeklyHistory.reduce((acc, d) => acc + d.protein, 0) / weeklyHistory.length);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in p-3 sm:p-4">
      
      {/* TODAY'S PROTEIN HERO CARD */}
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#121218] via-[#0a0a0e] to-black border-2 border-yellow-400/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(255,252,0,0.2)]">
        
        {/* Ambient yellow light background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Today metrics */}
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-black border border-yellow-400/30">
              <Flame className="w-4 h-4 fill-yellow-400" />
              <span>TODAY'S TARGET • {userProfile.currentStreakDays || 7} DAY STREAK</span>
            </div>

            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">Protein Consumed</h2>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="font-heading font-black text-5xl sm:text-6xl text-yellow-400 tracking-tight">
                  {totalProtein}g
                </span>
                <span className="font-heading font-black text-2xl sm:text-3xl text-white/70">
                  / {goalGrams}g
                </span>
              </div>
            </div>

            {/* Remaining pill */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-gray-200">
                Remaining: <span className="text-yellow-400 font-black">{remainingProtein}g</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/5 text-xs font-medium text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                <span>Resets in {timeUntilMidnight}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-center md:justify-start gap-2.5 pt-2">
              <button
                onClick={onOpenScanner}
                className="px-5 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(255,252,0,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>SCAN FOOD (AI)</span>
              </button>

              <button
                onClick={() => setShowManualModal(true)}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Quick Add</span>
              </button>

              {onOpenStreakModal && (
                <button
                  onClick={onOpenStreakModal}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-yellow-400 hover:text-black text-yellow-400 font-bold transition-all cursor-pointer"
                  title="View Streak Milestones"
                >
                  <Flame className="w-4 h-4 fill-current" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Circular SVG Progress Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                className="stroke-white/10"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                className="stroke-yellow-400 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={314.159}
                strokeDashoffset={314.159 - (314.159 * progressPct) / 100}
                strokeLinecap="round"
                fill="transparent"
                style={{ filter: 'drop-shadow(0 0 12px rgba(255, 252, 0, 0.6))' }}
              />
            </svg>

            <div className="absolute text-center">
              <span className="font-heading font-black text-3xl text-white block">
                {progressPct}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400">
                {totalProtein >= goalGrams ? 'GOAL MET 🔥' : 'OF DAILY GOAL'}
              </span>
            </div>
          </div>

        </div>

        {/* Horizontal Linear Bar for quick glance */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-500 shadow-[0_0_15px_#FFFC00]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

      </div>

      {/* MEALS BREAKDOWN SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Meals Log */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black">
                <Utensils className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-black text-lg text-white">Today's Meals</h3>
            </div>
            <span className="text-xs text-gray-400 font-semibold">{meals.length} meals logged</span>
          </div>

          <div className="space-y-3">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-400/40 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs uppercase ${
                    meal.type === 'breakfast' ? 'bg-amber-400/20 text-amber-300' :
                    meal.type === 'lunch' ? 'bg-blue-400/20 text-blue-300' :
                    meal.type === 'dinner' ? 'bg-purple-400/20 text-purple-300' : 'bg-emerald-400/20 text-emerald-300'
                  }`}>
                    {meal.type[0].toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{meal.name}</h4>
                      {meal.isAiScanned && (
                        <span className="px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-400 text-[9px] font-black uppercase">
                          AI Scanned
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{meal.time} • {meal.calories} kcal</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-black text-xl text-yellow-400 block">
                    +{meal.protein}g
                  </span>
                  <span className="text-[10px] text-gray-400">protein</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Weekly Analytics Mini Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-lg text-white">Weekly Average</h3>
            <span className="text-xs text-yellow-400 font-bold">{weeklyAvg}g / day</span>
          </div>

          <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
            {/* 7 Days Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-36 pt-4">
              {weeklyHistory.map((item, idx) => {
                const heightPct = Math.min(100, Math.round((item.protein / 180) * 100));
                const isCurrent = item.day === 'Today';
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[9px] font-bold text-gray-400">{item.protein}g</span>
                    <div className="w-full bg-white/10 rounded-t-lg h-full max-h-24 flex items-end overflow-hidden p-0.5">
                      <div 
                        className={`w-full rounded-t transition-all ${
                          isCurrent 
                            ? 'bg-yellow-400 shadow-[0_0_12px_#FFFC00]' 
                            : item.met ? 'bg-yellow-400/60' : 'bg-white/30'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold ${isCurrent ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Streak motivation box */}
            <div className="p-3 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-white">7/7 Days Goal Reached!</span>
              </div>
              <span className="text-yellow-400 font-black">+300 XP</span>
            </div>
          </div>
        </div>

      </div>

      {/* QUICK MANUAL MODAL */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-black border-2 border-yellow-400/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-black text-lg text-white">Quick Add Protein</h3>
              <button onClick={() => setShowManualModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddManualMeal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Meal Name</label>
                <input 
                  type="text" 
                  value={manualName} 
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white font-medium focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Protein Amount (grams)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="1" 
                    max="200" 
                    value={manualGrams} 
                    onChange={(e) => setManualGrams(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-lg text-yellow-400 font-black focus:outline-none focus:border-yellow-400"
                  />
                  <span className="font-bold text-white">grams</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Meal Category</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setManualMealType(cat)}
                      className={`py-1.5 rounded-lg text-xs font-bold capitalize border transition-all cursor-pointer ${
                        manualMealType === cat ? 'bg-yellow-400 text-black border-yellow-400 font-black' : 'bg-white/5 text-gray-300 border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs shadow-lg transition-all cursor-pointer"
              >
                LOG PROTEIN
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

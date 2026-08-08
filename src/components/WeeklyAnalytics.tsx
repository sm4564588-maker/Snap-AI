import React from 'react';
import { MealAnalysisResult, UserProfile } from '../types';
import { BarChart3, TrendingUp, Award, Flame, Dumbbell, Sparkles, CheckCircle, PieChart, Calendar } from 'lucide-react';

interface WeeklyAnalyticsProps {
  meals: MealAnalysisResult[];
  userProfile: UserProfile;
}

export const WeeklyAnalytics: React.FC<WeeklyAnalyticsProps> = ({ meals, userProfile }) => {
  // Mock weekly days
  const weeklyData = [
    { day: 'Mon', calories: 2150, protein: 145, carbs: 220, fat: 65, score: 92 },
    { day: 'Tue', calories: 2380, protein: 158, carbs: 245, fat: 72, score: 95 },
    { day: 'Wed', calories: 1950, protein: 130, carbs: 190, fat: 58, score: 88 },
    { day: 'Thu', calories: 2420, protein: 165, carbs: 235, fat: 68, score: 96 },
    { day: 'Fri', calories: 2200, protein: 150, carbs: 210, fat: 64, score: 91 },
    { day: 'Sat', calories: 2550, protein: 170, carbs: 260, fat: 78, score: 89 },
    { day: 'Sun', calories: 2280, protein: 155, carbs: 225, fat: 66, score: 94 },
  ];

  const avgCalories = Math.round(weeklyData.reduce((acc, d) => acc + d.calories, 0) / 7);
  const avgProtein = Math.round(weeklyData.reduce((acc, d) => acc + d.protein, 0) / 7);
  const avgScore = Math.round(weeklyData.reduce((acc, d) => acc + d.score, 0) / 7);

  // Top eaten foods extracted from logged meals
  const allFoods = meals.flatMap((m) => m.foods.map((f) => f.name));
  const foodCounts: { [key: string]: number } = {};
  allFoods.forEach((name) => {
    foodCounts[name] = (foodCounts[name] || 0) + 1;
  });
  const topFoods = Object.entries(foodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 pb-28">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-extrabold border border-yellow-400/30 mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>ADVANCED ANALYTICS</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">Weekly Nutrition Reports</h1>
        <p className="text-xs sm:text-sm text-gray-400">Track calorie consistency, protein density, and meal quality trends</p>
      </div>

      {/* Top 3 Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="snap-glass rounded-[28px] p-6 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black">
            <Flame className="w-6 h-6 fill-black" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 block">Weekly Daily Avg</span>
            <span className="font-heading font-black text-2xl text-yellow-400">{avgCalories} kcal</span>
            <span className="text-[10px] text-emerald-400 font-bold block">Within Goal Range</span>
          </div>
        </div>

        <div className="snap-glass rounded-[28px] p-6 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-black">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 block">Avg Daily Protein</span>
            <span className="font-heading font-black text-2xl text-emerald-400">{avgProtein}g / day</span>
            <span className="text-[10px] text-emerald-400 font-bold block">97% Target Hitting</span>
          </div>
        </div>

        <div className="snap-glass rounded-[28px] p-6 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-400/20 text-purple-400 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 block">Meal Quality Index</span>
            <span className="font-heading font-black text-2xl text-purple-400">{avgScore} / 100</span>
            <span className="text-[10px] text-purple-300 font-bold block">Grade A Nutrition</span>
          </div>
        </div>
      </div>

      {/* Weekly Calorie Chart SVG */}
      <div className="snap-glass rounded-[32px] p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-heading font-black text-xl text-white">Daily Calorie Consumption</h3>
            <p className="text-xs text-gray-400">Target Line: {userProfile.dailyCalorieGoal} kcal</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-extrabold border border-yellow-400/30">
            Current Week
          </span>
        </div>

        {/* Custom Bar Chart Visualizer */}
        <div className="pt-4 pb-2">
          <div className="h-56 flex items-end justify-between gap-2 sm:gap-6 border-b border-white/10 pb-2 relative">
            
            {/* Goal Line Indicator */}
            <div
              className="absolute left-0 right-0 border-b-2 border-dashed border-yellow-400/60 z-10 flex items-center justify-end pr-2"
              style={{ bottom: `${(userProfile.dailyCalorieGoal / 3000) * 100}%` }}
            >
              <span className="text-[10px] font-bold text-yellow-400 bg-black/80 px-2 py-0.5 rounded-full border border-yellow-400/30">
                Goal: {userProfile.dailyCalorieGoal}
              </span>
            </div>

            {weeklyData.map((d, idx) => {
              const barHeightPct = Math.min(100, (d.calories / 3000) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                  <div className="text-[10px] font-bold text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.calories}
                  </div>
                  <div className="w-full max-w-[42px] bg-white/10 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-yellow-500 to-yellow-300 group-hover:from-yellow-400 group-hover:to-yellow-200 transition-all rounded-t-xl shadow-[0_0_15px_rgba(255,252,0,0.3)]"
                      style={{ height: `${barHeightPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Protein Trend & Most Eaten Foods */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Protein Intake Bar Breakdown */}
        <div className="lg:col-span-7 snap-glass rounded-[32px] p-6 sm:p-8 border border-white/10 space-y-4">
          <h3 className="font-heading font-black text-xl text-white">Protein Consistency</h3>
          <p className="text-xs text-gray-400">Daily protein grams logged across the week</p>

          <div className="space-y-3 pt-2">
            {weeklyData.map((d, idx) => (
              <div key={idx} className="flex items-center gap-4 text-xs font-bold">
                <span className="w-8 text-gray-400">{d.day}</span>
                <div className="flex-1 bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (d.protein / 180) * 100)}%` }}
                  />
                </div>
                <span className="w-16 text-emerald-400 text-right">{d.protein}g</span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Eaten Foods & Best Day Badge */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Best Day Badge Card */}
          <div className="snap-glass-yellow rounded-[28px] p-6 border border-yellow-400/40 relative">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-yellow-400" />
              <h4 className="font-heading font-black text-lg text-white">Best Nutrition Day</h4>
            </div>
            <p className="text-xs text-gray-300 font-medium">
              Thursday achieved a top score of <strong className="text-yellow-400">96/100</strong> with 165g high-density protein and perfect hydration!
            </p>
          </div>

          {/* Top Eaten Foods */}
          <div className="snap-glass rounded-[28px] p-6 border border-white/10 space-y-3">
            <h4 className="font-heading font-black text-base text-white">Most Frequency Identified Foods</h4>
            <div className="space-y-2">
              {topFoods.length > 0 ? (
                topFoods.map(([food, count], idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                    <span className="font-bold text-white">{food}</span>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 font-black">
                      {count} {count === 1 ? 'time' : 'times'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400 py-2">
                  Salmon, Avocado, Quinoa, Steak, Eggs identified regularly.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { MealAnalysisResult } from '../types';
import { Flame, Dumbbell, Wheat, Droplet, Sparkles, CheckCircle2, ArrowLeft, PlusCircle, MessageSquare, AlertCircle, Award, Scale, PieChart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnalysisResultViewProps {
  analysis: MealAnalysisResult;
  onSaveMeal: (meal: MealAnalysisResult) => void;
  onSnapAnother: () => void;
  onAskCoachAboutMeal: (mealName: string) => void;
  onBack: () => void;
  isAlreadySaved?: boolean;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  analysis,
  onSaveMeal,
  onSnapAnother,
  onAskCoachAboutMeal,
  onBack,
  isAlreadySaved = false,
}) => {
  const { mealName, foods, totalNutrition, mealScore, scoreReason, aiSuggestions, macroBreakdownPercentage, imageUrl } = analysis;

  // Trigger confetti if score is high (>80)
  useEffect(() => {
    if (mealScore >= 80) {
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFFC00', '#FFFFFF', '#34D399', '#60A5FA'],
        });
      } catch (e) {
        // Confetti optional
      }
    }
  }, [mealScore]);

  // Score color badge
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10';
    if (score >= 75) return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10';
    return 'text-orange-400 border-orange-400/50 bg-orange-400/10';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in pb-28">
      
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full snap-glass text-xs font-bold text-gray-300 hover:text-white border border-white/15 transition-all cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-yellow-400" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onSnapAnother}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Snap Another Meal</span>
          </button>

          <button
            onClick={() => onSaveMeal(analysis)}
            disabled={isAlreadySaved}
            className={`px-6 py-2.5 rounded-full font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isAlreadySaved
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                : 'snap-yellow-btn shadow-[0_0_20px_rgba(255,252,0,0.4)]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isAlreadySaved ? 'Saved to Tracker' : 'Save Meal to Tracker'}</span>
          </button>
        </div>
      </div>

      {/* Hero Title & Score Summary Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Food Image Preview */}
        <div className="lg:col-span-5 relative group">
          <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-2 border-yellow-400/40 snap-glass shadow-[0_0_40px_rgba(255,252,0,0.2)]">
            <img
              src={imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
              alt={mealName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider">
                AI Vision Confirmed
              </span>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
                {mealName}
              </h1>
              <p className="text-xs text-gray-300 flex items-center gap-2 font-medium">
                <Scale className="w-3.5 h-3.5 text-yellow-400" />
                Est. Weight: {totalNutrition.servingSizeGrams}g
              </p>
            </div>
          </div>
        </div>

        {/* Right: Meal Score & AI Suggestions */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 snap-glass rounded-[32px] p-6 sm:p-8 border border-white/10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <p className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> AI Meal Quality Score
              </p>
              <h2 className="font-heading font-black text-3xl text-white">Nutritional Index</h2>
              <p className="text-xs text-gray-400 mt-1">{scoreReason}</p>
            </div>

            {/* Circular Progress Indicator for Score */}
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-yellow-400 stroke-current transition-all duration-1000 ease-out"
                    strokeWidth="3.5"
                    strokeDasharray={`${mealScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading font-black text-2xl text-white">{mealScore}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">/ 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions Badges */}
          <div>
            <h3 className="text-xs font-extrabold text-gray-300 uppercase tracking-wider mb-3">
              AI Personalized Insights:
            </h3>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((suggestion, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold flex items-center gap-2 shadow-[0_0_10px_rgba(255,252,0,0.1)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  {suggestion}
                </span>
              ))}
            </div>
          </div>

          {/* Ask AI Coach button */}
          <button
            onClick={() => onAskCoachAboutMeal(mealName)}
            className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/50 text-xs font-bold text-yellow-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask Ghost AI Coach how to optimize this meal</span>
          </button>
        </div>
      </div>

      {/* Detected Foods Table */}
      <div className="snap-glass rounded-[32px] p-6 sm:p-8 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-heading font-black text-xl text-white">Detected Meal Ingredients</h3>
            <p className="text-xs text-gray-400">AI identified foods & estimated portion weight</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-yellow-400 text-xs font-bold border border-white/10">
            {foods.length} Items Found
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {foods.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-400/50 transition-all flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{item.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-bold border border-emerald-400/30">
                    {item.confidence}% Match
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Weight: {item.estimatedWeightGrams}g • Protein: {item.protein}g • Carbs: {item.carbs}g • Fat: {item.fat}g
                </p>
              </div>
              <span className="font-heading font-extrabold text-base text-yellow-400">
                {item.calories} <span className="text-[10px] font-normal text-gray-400">kcal</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Nutrition Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-black text-2xl text-white">Nutrition Breakdown</h3>
            <p className="text-xs text-gray-400">Detailed macro and micro nutrient profile</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-yellow-400">Protein: {macroBreakdownPercentage.proteinPct}%</span>
            <span className="text-blue-400">Carbs: {macroBreakdownPercentage.carbsPct}%</span>
            <span className="text-orange-400">Fat: {macroBreakdownPercentage.fatPct}%</span>
          </div>
        </div>

        {/* Macro Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Calories Card */}
          <div className="snap-glass-yellow rounded-2xl p-5 border border-yellow-400/40 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-300">Calories</span>
              <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold">
                <Flame className="w-4 h-4 fill-black" />
              </div>
            </div>
            <div className="font-heading font-black text-3xl text-yellow-400">
              {totalNutrition.calories} <span className="text-xs text-gray-400 font-normal">kcal</span>
            </div>
            <div className="mt-2 w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
              <div className="bg-yellow-400 h-full rounded-full" style={{ width: `${Math.min(100, (totalNutrition.calories / 2000) * 100)}%` }} />
            </div>
          </div>

          {/* Protein Card */}
          <div className="snap-glass rounded-2xl p-5 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-300">Protein</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold">
                <Dumbbell className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-black text-3xl text-emerald-400">
              {totalNutrition.protein} <span className="text-xs text-gray-400 font-normal">g</span>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${Math.min(100, (totalNutrition.protein / 150) * 100)}%` }} />
            </div>
          </div>

          {/* Carbs Card */}
          <div className="snap-glass rounded-2xl p-5 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-300">Carbohydrates</span>
              <div className="w-8 h-8 rounded-xl bg-blue-400/20 text-blue-400 flex items-center justify-center font-bold">
                <Wheat className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-black text-3xl text-blue-400">
              {totalNutrition.carbs} <span className="text-xs text-gray-400 font-normal">g</span>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: `${Math.min(100, (totalNutrition.carbs / 250) * 100)}%` }} />
            </div>
          </div>

          {/* Fats Card */}
          <div className="snap-glass rounded-2xl p-5 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-300">Healthy Fats</span>
              <div className="w-8 h-8 rounded-xl bg-orange-400/20 text-orange-400 flex items-center justify-center font-bold">
                <Droplet className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading font-black text-3xl text-orange-400">
              {totalNutrition.fat} <span className="text-xs text-gray-400 font-normal">g</span>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-400 h-full rounded-full" style={{ width: `${Math.min(100, (totalNutrition.fat / 70) * 100)}%` }} />
            </div>
          </div>

          {/* Fiber */}
          <div className="snap-glass rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-gray-400 font-bold block mb-1">Dietary Fiber</span>
            <span className="font-heading font-black text-2xl text-white">{totalNutrition.fiber}g</span>
          </div>

          {/* Sugar */}
          <div className="snap-glass rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-gray-400 font-bold block mb-1">Sugar Content</span>
            <span className="font-heading font-black text-2xl text-white">{totalNutrition.sugar}g</span>
          </div>

          {/* Sodium */}
          <div className="snap-glass rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-gray-400 font-bold block mb-1">Sodium</span>
            <span className="font-heading font-black text-2xl text-white">{totalNutrition.sodiumMg}mg</span>
          </div>

          {/* Cholesterol */}
          <div className="snap-glass rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-gray-400 font-bold block mb-1">Cholesterol</span>
            <span className="font-heading font-black text-2xl text-white">{totalNutrition.cholesterolMg}mg</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-gray-400">
        <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
        <span>
          Disclaimer: Nutrition values are AI-generated estimates based on visual computer analysis and standard USDA database averages. Portions may vary based on ingredients used.
        </span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MealAnalysisResult } from '../types';
import { Search, Filter, Heart, Trash2, Calendar, Flame, Award, ArrowUpRight, Camera, Sparkles } from 'lucide-react';

interface MealHistoryProps {
  meals: MealAnalysisResult[];
  onSelectMeal: (meal: MealAnalysisResult) => void;
  onDeleteMeal: (mealId: string) => void;
  onToggleFavorite: (mealId: string) => void;
  onOpenScanner: () => void;
}

export const MealHistory: React.FC<MealHistoryProps> = ({
  meals,
  onSelectMeal,
  onDeleteMeal,
  onToggleFavorite,
  onOpenScanner,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'high-protein' | 'high-score'>('all');

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch =
      meal.mealName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.foods.some((f) => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'favorites') return meal.favorite;
    if (activeFilter === 'high-protein') return meal.totalNutrition.protein >= 35;
    if (activeFilter === 'high-score') return meal.mealScore >= 90;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 pb-28">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-extrabold border border-yellow-400/30 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>MEAL LOG TIMELINE</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">Your Meal History</h1>
          <p className="text-xs sm:text-sm text-gray-400">Search, filter, and review all previous analyzed meals</p>
        </div>

        <button
          onClick={onOpenScanner}
          className="snap-yellow-btn px-6 py-3 rounded-full text-xs font-black flex items-center gap-2 shadow-[0_0_20px_rgba(255,252,0,0.4)] cursor-pointer w-fit"
        >
          <Camera className="w-4 h-4 fill-black" />
          <span>SNAP NEW MEAL</span>
        </button>
      </div>

      {/* Search Bar & Filter Switcher */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search meal or ingredient name (e.g. Salmon, Chicken, Avocado)..."
            className="w-full pl-11 pr-4 py-3 rounded-full snap-glass border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            All Meals ({meals.length})
          </button>

          <button
            onClick={() => setActiveFilter('favorites')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'favorites'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            Favorites ({meals.filter((m) => m.favorite).length})
          </button>

          <button
            onClick={() => setActiveFilter('high-protein')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'high-protein'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            High Protein (35g+)
          </button>

          <button
            onClick={() => setActiveFilter('high-score')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'high-score'
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,252,0,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Top Quality (90+)
          </button>
        </div>
      </div>

      {/* History Grid */}
      {filteredMeals.length === 0 ? (
        <div className="snap-glass rounded-[32px] p-12 text-center border border-white/10 space-y-4">
          <Filter className="w-12 h-12 text-yellow-400 mx-auto" />
          <h3 className="font-heading font-black text-xl text-white">No Matching Meals Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Try adjusting your search keywords or switching filters to view previous meal logs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => onSelectMeal(meal)}
              className="snap-glass hover:snap-glass-yellow rounded-[28px] p-5 border border-white/10 hover:border-yellow-400 transition-all cursor-pointer group flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Image & Score Pill */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={meal.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                  alt={meal.mealName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-yellow-400/50 text-yellow-400 text-xs font-black">
                  Score: {meal.mealScore}/100
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono text-[10px] text-gray-300">
                    {new Date(meal.timestamp).toLocaleDateString()} • {new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Title & Macros */}
              <div>
                <h3 className="font-heading font-black text-lg text-white group-hover:text-yellow-400 transition-colors flex items-center justify-between">
                  <span className="truncate">{meal.mealName}</span>
                  <ArrowUpRight className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                  {meal.foods.map((f) => f.name).join(', ')}
                </p>

                <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
                  <div className="bg-white/5 rounded-xl p-1.5">
                    <span className="text-[10px] text-gray-400 block font-bold">Calories</span>
                    <span className="text-xs font-black text-yellow-400">{meal.totalNutrition.calories}</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-1.5">
                    <span className="text-[10px] text-gray-400 block font-bold">Protein</span>
                    <span className="text-xs font-black text-emerald-400">{meal.totalNutrition.protein}g</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-1.5">
                    <span className="text-[10px] text-gray-400 block font-bold">Carbs</span>
                    <span className="text-xs font-black text-blue-400">{meal.totalNutrition.carbs}g</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-1.5">
                    <span className="text-[10px] text-gray-400 block font-bold">Fat</span>
                    <span className="text-xs font-black text-orange-400">{meal.totalNutrition.fat}g</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-400">
                <span className="text-[10px] text-yellow-400 font-bold">
                  {meal.aiSuggestions[0] || '✔ High Protein'}
                </span>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onToggleFavorite(meal.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      meal.favorite ? 'text-red-400 bg-red-400/20' : 'text-gray-400 hover:text-white bg-white/5'
                    }`}
                    title="Toggle Favorite"
                  >
                    <Heart className={`w-4 h-4 ${meal.favorite ? 'fill-red-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => onDeleteMeal(meal.id)}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-400 bg-white/5 transition-colors"
                    title="Delete Meal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

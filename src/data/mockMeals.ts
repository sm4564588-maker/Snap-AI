import { MealAnalysisResult, DemoSampleMeal } from '../types';

export const DEMO_SAMPLE_MEALS: DemoSampleMeal[] = [
  {
    id: 'sample-1',
    name: 'Grilled Salmon Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    category: 'High Protein',
    analysis: {
      id: 'sample-1-res',
      mealName: 'Atlantic Salmon & Wild Grain Bowl',
      timestamp: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      foods: [
        { name: 'Grilled Wild Salmon', confidence: 99, estimatedWeightGrams: 180, calories: 360, protein: 40, carbs: 0, fat: 22 },
        { name: 'Quinoa & Wild Rice', confidence: 96, estimatedWeightGrams: 130, calories: 180, protein: 6, carbs: 32, fat: 3 },
        { name: 'Ripe Avocado', confidence: 94, estimatedWeightGrams: 60, calories: 96, protein: 1.2, carbs: 5, fat: 9 },
        { name: 'Edamame & Radish', confidence: 91, estimatedWeightGrams: 50, calories: 45, protein: 4, carbs: 4, fat: 1.5 }
      ],
      totalNutrition: {
        calories: 681,
        protein: 51.2,
        carbs: 41,
        fat: 35.5,
        fiber: 9.2,
        sugar: 2.8,
        sodiumMg: 420,
        cholesterolMg: 110,
        servingSizeGrams: 420
      },
      mealScore: 96,
      scoreReason: 'Exceptional ratio of Omega-3 healthy fatty acids, complete high-density protein, and slow-digesting dietary fiber.',
      aiSuggestions: [
        '✔ Exceptional Protein Source',
        '✔ Rich in Omega-3 Healthy Fats',
        '✔ Great Muscle Recovery Meal',
        '✔ Fiber-Rich Superfood'
      ],
      macroBreakdownPercentage: { proteinPct: 30, carbsPct: 24, fatPct: 46 }
    }
  },
  {
    id: 'sample-2',
    name: 'Avocado Egg Toast',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    category: 'Breakfast',
    analysis: {
      id: 'sample-2-res',
      mealName: 'Sourdough Avocado & Poached Eggs',
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      foods: [
        { name: 'Poached Eggs (2x)', confidence: 98, estimatedWeightGrams: 110, calories: 144, protein: 12.6, carbs: 0.8, fat: 9.8 },
        { name: 'Artisan Sourdough Toast', confidence: 97, estimatedWeightGrams: 80, calories: 190, protein: 7, carbs: 36, fat: 1.2 },
        { name: 'Mashed Avocado', confidence: 95, estimatedWeightGrams: 70, calories: 112, protein: 1.4, carbs: 6, fat: 10.5 },
        { name: 'Microgreens & Chili Flakes', confidence: 89, estimatedWeightGrams: 15, calories: 8, protein: 0.5, carbs: 1.2, fat: 0.1 }
      ],
      totalNutrition: {
        calories: 454,
        protein: 21.5,
        carbs: 44,
        fat: 21.6,
        fiber: 7.0,
        sugar: 1.8,
        sodiumMg: 510,
        cholesterolMg: 370,
        servingSizeGrams: 275
      },
      mealScore: 91,
      scoreReason: 'Perfect breakfast ratio with high satiety index and sustained brain energy fuel.',
      aiSuggestions: [
        '✔ Sustained Morning Energy',
        '✔ Healthy Monounsaturated Fats',
        '✔ High Satiety Score',
        '✔ Good Fiber Content'
      ],
      macroBreakdownPercentage: { proteinPct: 19, carbsPct: 39, fatPct: 42 }
    }
  },
  {
    id: 'sample-3',
    name: 'Protein Steak & Veggies',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    category: 'Keto / Muscle',
    analysis: {
      id: 'sample-3-res',
      mealName: 'Grass-Fed Sirloin & Roasted Asparagus',
      timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      foods: [
        { name: 'Grass-Fed Sirloin Steak', confidence: 99, estimatedWeightGrams: 220, calories: 480, protein: 58, carbs: 0, fat: 26 },
        { name: 'Garlic Butter Asparagus', confidence: 95, estimatedWeightGrams: 100, calories: 65, protein: 3, carbs: 5, fat: 4.5 },
        { name: 'Herb Compound Butter', confidence: 90, estimatedWeightGrams: 15, calories: 105, protein: 0.1, carbs: 0.1, fat: 11.5 }
      ],
      totalNutrition: {
        calories: 650,
        protein: 61.1,
        carbs: 5.1,
        fat: 42.0,
        fiber: 2.8,
        sugar: 1.2,
        sodiumMg: 590,
        cholesterolMg: 165,
        servingSizeGrams: 335
      },
      mealScore: 89,
      scoreReason: 'Massive protein payload ideal for hyper-rebuilding muscle tissue with ultra-low carbs.',
      aiSuggestions: [
        '✔ Ultimate Post Workout Rebuild',
        '✔ High Iron & Zinc Content',
        '✔ Low Carbohydrate',
        '💡 Tip: Add complex carbs for glycogen refill'
      ],
      macroBreakdownPercentage: { proteinPct: 38, carbsPct: 3, fatPct: 59 }
    }
  }
];

export const INITIAL_USER_PROFILE = {
  name: 'Snap User',
  weightKg: 74,
  heightCm: 178,
  age: 26,
  gender: 'male' as const,
  activityLevel: 'active' as const,
  goal: 'muscle' as const,
  dietPreference: 'high-protein' as const,
  dailyCalorieGoal: 2400,
  proteinGoalGrams: 160,
  carbsGoalGrams: 240,
  fatGoalGrams: 70,
  waterGoalMl: 3000,
  waterIntakeMl: 1750,
  isLoggedIn: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

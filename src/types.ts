export interface FoodItem {
  name: string;
  confidence: number;
  estimatedWeightGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface TotalNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodiumMg: number;
  cholesterolMg: number;
  servingSizeGrams: number;
}

export interface MacroBreakdown {
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}

export interface MealAnalysisResult {
  id: string;
  mealName: string;
  timestamp: string;
  imageUrl?: string;
  foods: FoodItem[];
  totalNutrition: TotalNutrition;
  mealScore: number;
  scoreReason: string;
  aiSuggestions: string[];
  macroBreakdownPercentage: MacroBreakdown;
  favorite?: boolean;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export type FitnessGoal = 'muscle' | 'fat_loss' | 'maintain' | 'general';
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type DietPreference = 'high-protein' | 'balanced' | 'keto' | 'vegan' | 'vegetarian' | 'low-carb';

export interface UserProfile {
  id: string;
  username: string; // e.g. @alex_fit
  displayName: string;
  name?: string; // compatibility alias
  avatarUrl: string;
  bio: string;
  fitnessGoal: FitnessGoal;
  goal?: string; // compatibility alias
  dailyProteinGoalGrams: number;
  proteinGoalGrams?: number; // compatibility alias
  dailyCalorieGoal: number;
  carbsGoalGrams?: number; // compatibility alias
  fatGoalGrams?: number; // compatibility alias
  weightKg: number;
  heightCm: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'athlete';
  dietPreference: DietPreference;
  waterGoalMl: number;
  waterIntakeMl: number;
  isLoggedIn: boolean;
  isOnboarded: boolean;
  
  // Social Stats
  followersCount: number;
  followingCount: number;
  friendsCount: number;
  currentStreakDays: number;
  longestStreakDays: number;
  totalProteinTrackedGrams: number;
  totalFoodScansCount: number;
  totalPostsCount: number;
  totalReelsCount: number;
  totalSnapsCount: number;
  xpPoints: number;
  level: number;
  
  // Privacy & Safety Settings
  isPrivateAccount: boolean;
  allowMessagesFrom: 'everyone' | 'friends';
  allowFriendRequests: boolean;
  allowCommentsFrom: 'everyone' | 'friends';
  streakReminders: boolean;
  hideStoryFrom: string[];
  blockedUsers: string[];
  createdAt: string;
}

export interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  isFriend: boolean;
  isFollowing: boolean;
  friendRequestStatus: 'none' | 'pending_sent' | 'pending_received' | 'accepted';
  mutualFriendsCount: number;
  mutualFriendsNames: string[];
  streakDays: number; // 🔥 12 Day Streak
  lastInteractionTime: string;
  todayProteinGrams: number;
  proteinGoalGrams: number;
  currentStreak: number;
  fitnessGoal?: FitnessGoal;
}

export interface StoryViewer {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  viewedAt: string;
}

export interface StoryItem {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  userAvatar: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  timestamp: string;
  expiresAt: string;
  aiNutritionBadge?: {
    mealName: string;
    protein: number;
    calories: number;
  };
  stickers?: { emoji: string; x: number; y: number }[];
  viewsCount: number;
  viewers: StoryViewer[];
  isViewed?: boolean;
  isOwnStory?: boolean;
}

export interface PostComment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface SocialPost {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  userAvatar: string;
  timestamp: string;
  type: 'food_scan' | 'photo' | 'video' | 'protein_achievement' | 'fitness_update' | 'repost';
  caption: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  location?: string;
  tags?: string[];
  aiNutrition?: {
    mealName: string;
    protein: number;
    calories: number;
    carbs?: number;
    fat?: number;
    score?: number;
  };
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  comments: PostComment[];
  repostsCount: number;
  isReposted: boolean;
  repostedBy?: {
    username: string;
    displayName: string;
    avatarUrl: string;
    customNote?: string;
  };
  originalPost?: SocialPost;
  savesCount: number;
  isSaved: boolean;
}

export interface ReelItem {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  userAvatar: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  songTitle: string;
  songArtist: string;
  proteinGrams?: number;
  mealName?: string;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  comments: PostComment[];
  repostsCount: number;
  isSaved: boolean;
  isFollowing: boolean;
  tags: string[];
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderUsername: string;
  senderAvatar?: string;
  text?: string;
  snapMediaUrl?: string;
  snapType?: 'text' | 'photo' | 'video' | 'food_scan';
  aiNutrition?: {
    mealName: string;
    protein: number;
    calories: number;
  };
  timestamp: string;
  isRead: boolean;
  reaction?: string;
}

export interface ChatConversation {
  id: string;
  friend: Friend;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  streakDays: number;
  messages: DirectMessage[];
}

export interface NotificationItem {
  id: string;
  type: 'friend_request' | 'friend_accepted' | 'new_follower' | 'like' | 'comment' | 'repost' | 'story_view' | 'streak_milestone' | 'protein_goal_reached' | 'chat_message';
  fromUser: {
    id?: string;
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  message: string;
  timestamp: string;
  isRead: boolean;
  targetId?: string;
  actionRequired?: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface DailyProteinBreakdown {
  breakfast: number;
  lunch: number;
  snack: number;
  dinner: number;
}

export interface DayStreakItem {
  dayNumber: number;
  dayLabel: string;
  dateStr: string;
  proteinGrams: number;
  goalGrams: number;
  isCompleted: boolean;
}

export interface DemoSampleMeal {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  analysis: MealAnalysisResult;
}

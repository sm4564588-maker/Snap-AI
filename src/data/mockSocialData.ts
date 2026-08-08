import { 
  UserProfile, 
  Friend, 
  StoryItem, 
  SocialPost, 
  ReelItem, 
  ChatConversation, 
  NotificationItem, 
  AchievementBadge,
  DayStreakItem
} from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'user-snap-1',
  username: 'snap_sam',
  displayName: 'Sam Carter ⚡',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Snap. Track. Build Muscle. 🏋️‍♂️ 150g protein target daily • Fitness creator & food hacker.',
  fitnessGoal: 'muscle',
  dailyProteinGoalGrams: 150,
  dailyCalorieGoal: 2400,
  weightKg: 76,
  heightCm: 180,
  age: 25,
  gender: 'male',
  activityLevel: 'active',
  dietPreference: 'high-protein',
  waterGoalMl: 3000,
  waterIntakeMl: 2100,
  isLoggedIn: true,
  isOnboarded: true,

  // Social Stats
  followersCount: 384,
  followingCount: 216,
  friendsCount: 52,
  currentStreakDays: 7,
  longestStreakDays: 19,
  totalProteinTrackedGrams: 4860,
  totalFoodScansCount: 42,
  totalPostsCount: 18,
  totalReelsCount: 6,
  totalSnapsCount: 89,
  xpPoints: 2450,
  level: 5,

  // Privacy & Safety
  isPrivateAccount: false,
  allowMessagesFrom: 'everyone',
  allowFriendRequests: true,
  allowCommentsFrom: 'everyone',
  streakReminders: true,
  hideStoryFrom: [],
  blockedUsers: [],
  createdAt: '2025-11-15'
};

export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'f-1',
    username: 'marcus_fit',
    displayName: 'Marcus Vance 💪',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Hypertrophy coach & meal prep fanatic. Targeting 180g protein.',
    isFriend: true,
    isFollowing: true,
    friendRequestStatus: 'accepted',
    mutualFriendsCount: 14,
    mutualFriendsNames: ['chloe_lifts', 'david_keto', 'jake_power'],
    streakDays: 14,
    lastInteractionTime: '5m ago',
    todayProteinGrams: 142,
    proteinGoalGrams: 180,
    currentStreak: 14,
    fitnessGoal: 'muscle'
  },
  {
    id: 'f-2',
    username: 'chloe_lifts',
    displayName: 'Chloe Lin 🌸',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    bio: 'Strength & aesthetics. High protein plant & fish fuels 🥗',
    isFriend: true,
    isFollowing: true,
    friendRequestStatus: 'accepted',
    mutualFriendsCount: 22,
    mutualFriendsNames: ['marcus_fit', 'maya_nutrition'],
    streakDays: 9,
    lastInteractionTime: '23m ago',
    todayProteinGrams: 125,
    proteinGoalGrams: 130,
    currentStreak: 9,
    fitnessGoal: 'fat_loss'
  },
  {
    id: 'f-3',
    username: 'david_keto',
    displayName: 'David Kim 🥩',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Carnivore & low carb powerhouse. Steak & egg snaps daily.',
    isFriend: true,
    isFollowing: true,
    friendRequestStatus: 'accepted',
    mutualFriendsCount: 8,
    mutualFriendsNames: ['marcus_fit', 'jake_power'],
    streakDays: 21,
    lastInteractionTime: '1h ago',
    todayProteinGrams: 168,
    proteinGoalGrams: 160,
    currentStreak: 21,
    fitnessGoal: 'muscle'
  },
  {
    id: 'f-4',
    username: 'maya_nutrition',
    displayName: 'Maya Brooks 🥑',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    bio: 'Sports Dietitian (MS, RD) • AI food scanner enthusiast!',
    isFriend: false,
    isFollowing: true,
    friendRequestStatus: 'pending_received',
    mutualFriendsCount: 19,
    mutualFriendsNames: ['chloe_lifts', 'marcus_fit'],
    streakDays: 3,
    lastInteractionTime: '3h ago',
    todayProteinGrams: 110,
    proteinGoalGrams: 120,
    currentStreak: 5,
    fitnessGoal: 'general'
  },
  {
    id: 'f-5',
    username: 'jake_power',
    displayName: 'Jake Ross ⚡',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    bio: 'Powerlifter. Squat heavy, eat 200g protein daily.',
    isFriend: true,
    isFollowing: true,
    friendRequestStatus: 'accepted',
    mutualFriendsCount: 11,
    mutualFriendsNames: ['marcus_fit', 'david_keto'],
    streakDays: 6,
    lastInteractionTime: '4h ago',
    todayProteinGrams: 195,
    proteinGoalGrams: 200,
    currentStreak: 6,
    fitnessGoal: 'muscle'
  },
  {
    id: 'f-6',
    username: 'elena_runner',
    displayName: 'Elena Rostova 🏃‍♀️',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    bio: 'Marathoner fueling with smart AI nutrition & clean macros.',
    isFriend: false,
    isFollowing: false,
    friendRequestStatus: 'none',
    mutualFriendsCount: 4,
    mutualFriendsNames: ['chloe_lifts'],
    streakDays: 0,
    lastInteractionTime: '1d ago',
    todayProteinGrams: 95,
    proteinGoalGrams: 110,
    currentStreak: 2,
    fitnessGoal: 'maintain'
  }
];

export const MOCK_STORIES: StoryItem[] = [
  {
    id: 'story-own',
    userId: 'user-snap-1',
    username: 'snap_sam',
    displayName: 'Your Story',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    caption: 'Post-gym salmon & quinoa bowl scanned with Snap AI! ⚡ 51g protein',
    timestamp: '2h ago',
    expiresAt: '22h left',
    aiNutritionBadge: {
      mealName: 'Grilled Salmon & Rice',
      protein: 51.2,
      calories: 680
    },
    stickers: [
      { emoji: '🔥', x: 25, y: 35 },
      { emoji: '💪', x: 75, y: 20 }
    ],
    viewsCount: 68,
    viewers: [
      { id: 'f-1', username: 'marcus_fit', displayName: 'Marcus Vance', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', viewedAt: '1h ago' },
      { id: 'f-2', username: 'chloe_lifts', displayName: 'Chloe Lin', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', viewedAt: '45m ago' },
      { id: 'f-3', username: 'david_keto', displayName: 'David Kim', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', viewedAt: '30m ago' }
    ],
    isViewed: false,
    isOwnStory: true
  },
  {
    id: 'story-marcus',
    userId: 'f-1',
    username: 'marcus_fit',
    displayName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    caption: 'Sirloin steak meal prep! 61g protein locked in 🔥',
    timestamp: '1h ago',
    expiresAt: '23h left',
    aiNutritionBadge: {
      mealName: 'Sirloin Steak & Veggies',
      protein: 61.1,
      calories: 650
    },
    viewsCount: 142,
    viewers: [],
    isViewed: false
  },
  {
    id: 'story-chloe',
    userId: 'f-2',
    username: 'chloe_lifts',
    displayName: 'Chloe Lin',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    caption: 'Avocado poached eggs morning stack 🍳 22g protein!',
    timestamp: '4h ago',
    expiresAt: '20h left',
    aiNutritionBadge: {
      mealName: 'Avocado Egg Toast',
      protein: 21.5,
      calories: 454
    },
    viewsCount: 205,
    viewers: [],
    isViewed: false
  },
  {
    id: 'story-david',
    userId: 'f-3',
    username: 'david_keto',
    displayName: 'David Kim',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    caption: 'Triple smash burger patties (no bun). 74g pure protein 🥩',
    timestamp: '6h ago',
    expiresAt: '18h left',
    aiNutritionBadge: {
      mealName: 'Triple Beef Patties',
      protein: 74.0,
      calories: 720
    },
    viewsCount: 94,
    viewers: [],
    isViewed: true
  },
  {
    id: 'story-maya',
    userId: 'f-4',
    username: 'maya_nutrition',
    displayName: 'Maya Brooks',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    caption: 'Greek yogurt & chia bowl with whey crunch 🥣 38g protein',
    timestamp: '8h ago',
    expiresAt: '16h left',
    aiNutritionBadge: {
      mealName: 'Super Protein Yogurt Bowl',
      protein: 38.0,
      calories: 390
    },
    viewsCount: 310,
    viewers: [],
    isViewed: true
  }
];

export const MOCK_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    userId: 'user-snap-1',
    username: 'snap_sam',
    displayName: 'Sam Carter ⚡',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    timestamp: '15m ago',
    type: 'food_scan',
    caption: 'Just snapped my post-workout meal with Snap AI. Wild salmon, organic quinoa & edamame. Hitting 82g/150g already! 🟡💪 #ProteinGoals #SnapAI',
    mediaUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    location: 'Muscle Beach Gym, Venice',
    tags: ['ProteinGoals', 'SnapAI', 'MealPrep'],
    aiNutrition: {
      mealName: 'Atlantic Salmon & Wild Grain Bowl',
      protein: 51.2,
      calories: 681,
      carbs: 41,
      fat: 35.5,
      score: 96
    },
    likesCount: 42,
    isLiked: true,
    commentsCount: 6,
    comments: [
      {
        id: 'c-1',
        userId: 'f-1',
        username: 'marcus_fit',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'That macro split is elite bro! What dressing did you use?',
        timestamp: '10m ago',
        likesCount: 3,
        isLiked: true
      },
      {
        id: 'c-2',
        userId: 'f-2',
        username: 'chloe_lifts',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        text: 'The AI scanner gets the salmon grams spot-on 🔥',
        timestamp: '8m ago',
        likesCount: 1
      }
    ],
    repostsCount: 5,
    isReposted: false,
    savesCount: 14,
    isSaved: true
  },
  {
    id: 'post-2',
    userId: 'f-1',
    username: 'marcus_fit',
    displayName: 'Marcus Vance 💪',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    timestamp: '1h ago',
    type: 'repost',
    caption: 'Repasting Chloe\'s insane high protein breakfast toast hack. You gotta try this.',
    likesCount: 88,
    isLiked: false,
    commentsCount: 12,
    comments: [],
    repostsCount: 16,
    isReposted: true,
    repostedBy: {
      username: 'marcus_fit',
      displayName: 'Marcus Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      customNote: 'Best morning fuel ever!'
    },
    originalPost: {
      id: 'orig-chloe-1',
      userId: 'f-2',
      username: 'chloe_lifts',
      displayName: 'Chloe Lin 🌸',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      timestamp: '3h ago',
      type: 'food_scan',
      caption: 'Double poached eggs over sourdough with microgreens. 22g protein to start the day strong 🍳✨',
      mediaUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      mediaType: 'image',
      aiNutrition: {
        mealName: 'Sourdough Avocado & Poached Eggs',
        protein: 21.5,
        calories: 454,
        carbs: 44,
        fat: 21.6,
        score: 91
      },
      likesCount: 135,
      isLiked: false,
      commentsCount: 14,
      comments: [],
      repostsCount: 16,
      isReposted: false,
      savesCount: 39,
      isSaved: false
    },
    savesCount: 22,
    isSaved: false
  },
  {
    id: 'post-3',
    userId: 'f-3',
    username: 'david_keto',
    displayName: 'David Kim 🥩',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    timestamp: '2h ago',
    type: 'protein_achievement',
    caption: '🔥 21 DAY PROTEIN STREAK UNLOCKED! 160g+ every single day without missing once. Snap AI streak badge earned!',
    mediaUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    location: 'Iron Pit Gym',
    aiNutrition: {
      mealName: 'Grass-Fed Sirloin & Asparagus',
      protein: 61.1,
      calories: 650,
      carbs: 5,
      fat: 42,
      score: 89
    },
    likesCount: 156,
    isLiked: false,
    commentsCount: 18,
    comments: [],
    repostsCount: 9,
    isReposted: false,
    savesCount: 11,
    isSaved: false
  },
  {
    id: 'post-4',
    userId: 'f-4',
    username: 'maya_nutrition',
    displayName: 'Maya Brooks 🥑',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    timestamp: '5h ago',
    type: 'food_scan',
    caption: 'Pro tip for muscle recovery: combining whey protein with Greek yogurt gives both fast and slow digesting amino acids! 🥣🥛',
    mediaUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    aiNutrition: {
      mealName: 'High Protein Greek Parfait',
      protein: 36.5,
      calories: 380,
      carbs: 28,
      fat: 6.5,
      score: 95
    },
    likesCount: 210,
    isLiked: true,
    commentsCount: 27,
    comments: [],
    repostsCount: 31,
    isReposted: false,
    savesCount: 65,
    isSaved: false
  }
];

export const MOCK_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    userId: 'user-snap-1',
    username: 'snap_sam',
    displayName: 'Sam Carter ⚡',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    caption: 'How I hit 150g protein every day in under 20 minutes meal prep! 🥩🥗 #HighProtein #GymTok #SnapAI',
    songTitle: 'Phonk Gym Energy v2',
    songArtist: 'Snap AI Beats',
    proteinGrams: 52,
    mealName: 'Salmon Bowl',
    likesCount: 1420,
    isLiked: true,
    commentsCount: 88,
    comments: [],
    repostsCount: 124,
    isSaved: true,
    isFollowing: true,
    tags: ['GymTok', 'ProteinHacks', 'MealPrep', 'SnapAI']
  },
  {
    id: 'reel-2',
    userId: 'f-1',
    username: 'marcus_fit',
    displayName: 'Marcus Vance 💪',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    caption: 'Steak + Garlic Butter Reverse Sear technique for maximum leucine & protein synthesis 🥩🔥',
    songTitle: 'Tokyo Drift Hypertrophy',
    songArtist: 'Kavinsky Beat',
    proteinGrams: 61,
    mealName: 'Sirloin Steak',
    likesCount: 3820,
    isLiked: false,
    commentsCount: 145,
    comments: [],
    repostsCount: 310,
    isSaved: false,
    isFollowing: true,
    tags: ['Carnivore', 'SteakTok', 'Bodybuilding']
  },
  {
    id: 'reel-3',
    userId: 'f-2',
    username: 'chloe_lifts',
    displayName: 'Chloe Lin 🌸',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    caption: 'Morning routine: 5am gym session + scanning my 40g protein breakfast stack 🥑🍳',
    songTitle: 'Chill Lo-Fi Morning',
    songArtist: 'Aesthetic Sounds',
    proteinGrams: 38,
    mealName: 'Egg & Avocado Stack',
    likesCount: 2950,
    isLiked: true,
    commentsCount: 92,
    comments: [],
    repostsCount: 175,
    isSaved: true,
    isFollowing: true,
    tags: ['GymRoutine', 'MorningVlog', 'HighProtein']
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'friend_request',
    fromUser: {
      id: 'f-4',
      username: 'maya_nutrition',
      displayName: 'Maya Brooks 🥑',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
    },
    message: 'sent you a friend request. Tap to accept and start a Snap streak!',
    timestamp: '10m ago',
    isRead: false,
    actionRequired: true
  },
  {
    id: 'notif-2',
    type: 'streak_milestone',
    fromUser: {
      username: 'Snap AI Ghost',
      displayName: 'Snap AI 🟡',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    message: '🔥 7 DAY PROTEIN STREAK ACHIEVED! You earned +150 XP and unlocked the Gold Flame Badge.',
    timestamp: '1h ago',
    isRead: false
  },
  {
    id: 'notif-3',
    type: 'like',
    fromUser: {
      username: 'marcus_fit',
      displayName: 'Marcus Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    message: 'liked your post "Atlantic Salmon & Wild Grain Bowl"',
    timestamp: '2h ago',
    isRead: true
  },
  {
    id: 'notif-4',
    type: 'comment',
    fromUser: {
      username: 'chloe_lifts',
      displayName: 'Chloe Lin',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
    },
    message: 'commented: "The AI scanner gets the salmon grams spot-on 🔥"',
    timestamp: '3h ago',
    isRead: true
  },
  {
    id: 'notif-5',
    type: 'repost',
    fromUser: {
      username: 'david_keto',
      displayName: 'David Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    },
    message: 'reposted your high protein meal snap to their followers',
    timestamp: '5h ago',
    isRead: true
  }
];

export const MOCK_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-1',
    friend: MOCK_FRIENDS[0], // Marcus
    lastMessage: 'Check out the macro scan on this steak bowl 🔥',
    lastMessageTime: '5m ago',
    unreadCount: 1,
    streakDays: 14,
    messages: [
      {
        id: 'm-1',
        senderId: 'f-1',
        senderUsername: 'marcus_fit',
        text: 'Yo Sam! Did you hit your 150g protein goal today?',
        timestamp: '10:15 AM',
        isRead: true
      },
      {
        id: 'm-2',
        senderId: 'user-snap-1',
        senderUsername: 'snap_sam',
        text: 'Yeah bro! Scanned my salmon lunch earlier, already at 82g. Doing chicken tonight!',
        timestamp: '10:18 AM',
        isRead: true
      },
      {
        id: 'm-3',
        senderId: 'f-1',
        senderUsername: 'marcus_fit',
        snapMediaUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        snapType: 'food_scan',
        aiNutrition: {
          mealName: 'Sirloin Steak & Veggies',
          protein: 61.1,
          calories: 650
        },
        text: 'Check out the macro scan on this steak bowl 🔥',
        timestamp: '10:22 AM',
        isRead: false,
        reaction: '🔥'
      }
    ]
  },
  {
    id: 'conv-2',
    friend: MOCK_FRIENDS[1], // Chloe
    lastMessage: 'Awesome snap! Keep that streak going 🟡',
    lastMessageTime: '23m ago',
    unreadCount: 0,
    streakDays: 9,
    messages: [
      {
        id: 'm-4',
        senderId: 'user-snap-1',
        senderUsername: 'snap_sam',
        text: 'Loved your poached egg story today!',
        timestamp: 'Yesterday',
        isRead: true
      },
      {
        id: 'm-5',
        senderId: 'f-2',
        senderUsername: 'chloe_lifts',
        text: 'Awesome snap! Keep that streak going 🟡',
        timestamp: '9:45 AM',
        isRead: true,
        reaction: '💛'
      }
    ]
  },
  {
    id: 'conv-3',
    friend: MOCK_FRIENDS[2], // David
    lastMessage: '21 day streak unlocked today!',
    lastMessageTime: '1h ago',
    unreadCount: 0,
    streakDays: 21,
    messages: [
      {
        id: 'm-6',
        senderId: 'f-3',
        senderUsername: 'david_keto',
        text: '21 day streak unlocked today! Carnivore power 🥩',
        timestamp: '8:30 AM',
        isRead: true,
        reaction: '💪'
      }
    ]
  }
];

export const MOCK_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'ach-1',
    title: '🏆 First Scan',
    description: 'Use the AI camera to scan your first meal',
    icon: '📸',
    xpReward: 100,
    unlocked: true,
    unlockedAt: 'Nov 15',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'ach-2',
    title: '🔥 3 Day Streak',
    description: 'Hit your daily protein goal 3 days in a row',
    icon: '🔥',
    xpReward: 150,
    unlocked: true,
    unlockedAt: 'Nov 18',
    progress: 3,
    maxProgress: 3
  },
  {
    id: 'ach-3',
    title: '🔥 7 Day Streak',
    description: 'Hit your daily protein goal 7 days in a row',
    icon: '⚡',
    xpReward: 300,
    unlocked: true,
    unlockedAt: 'Today',
    progress: 7,
    maxProgress: 7
  },
  {
    id: 'ach-4',
    title: '🔥 14 Day Streak',
    description: 'Maintain high protein intake for two weeks',
    icon: '🌟',
    xpReward: 600,
    unlocked: false,
    progress: 7,
    maxProgress: 14
  },
  {
    id: 'ach-5',
    title: '🔥 30 Day Streak',
    description: 'A whole month of dedicated nutrition mastery',
    icon: '👑',
    xpReward: 1500,
    unlocked: false,
    progress: 7,
    maxProgress: 30
  },
  {
    id: 'ach-6',
    title: '💪 Protein Master',
    description: 'Log over 100g of protein in 10 separate scans',
    icon: '🥩',
    xpReward: 400,
    unlocked: true,
    unlockedAt: 'Yesterday',
    progress: 10,
    maxProgress: 10
  },
  {
    id: 'ach-7',
    title: '📸 10 Snaps',
    description: 'Capture & share 10 food snaps or stories',
    icon: '✨',
    xpReward: 250,
    unlocked: true,
    unlockedAt: 'Nov 20',
    progress: 10,
    maxProgress: 10
  },
  {
    id: 'ach-8',
    title: '🎬 First Reel',
    description: 'Publish your first high protein short video reel',
    icon: '🎬',
    xpReward: 200,
    unlocked: true,
    unlockedAt: 'Nov 22',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'ach-9',
    title: '👥 10 Friends',
    description: 'Connect with 10 friends and start sharing streaks',
    icon: '🤝',
    xpReward: 350,
    unlocked: true,
    unlockedAt: 'Nov 24',
    progress: 10,
    maxProgress: 10
  },
  {
    id: 'ach-10',
    title: '🥗 50 Food Scans',
    description: 'Analyze 50 dishes with computer vision AI',
    icon: '🔮',
    xpReward: 800,
    unlocked: false,
    progress: 42,
    maxProgress: 50
  }
];

export const MOCK_STREAK_DAYS: DayStreakItem[] = [
  { dayNumber: 1, dayLabel: 'Mon', dateStr: 'Aug 2', proteinGrams: 155, goalGrams: 150, isCompleted: true },
  { dayNumber: 2, dayLabel: 'Tue', dateStr: 'Aug 3', proteinGrams: 162, goalGrams: 150, isCompleted: true },
  { dayNumber: 3, dayLabel: 'Wed', dateStr: 'Aug 4', proteinGrams: 148, goalGrams: 150, isCompleted: true },
  { dayNumber: 4, dayLabel: 'Thu', dateStr: 'Aug 5', proteinGrams: 170, goalGrams: 150, isCompleted: true },
  { dayNumber: 5, dayLabel: 'Fri', dateStr: 'Aug 6', proteinGrams: 158, goalGrams: 150, isCompleted: true },
  { dayNumber: 6, dayLabel: 'Sat', dateStr: 'Aug 7', proteinGrams: 165, goalGrams: 150, isCompleted: true },
  { dayNumber: 7, dayLabel: 'Sun', dayLabel2: 'Today', dateStr: 'Aug 8', proteinGrams: 82, goalGrams: 150, isCompleted: true }
] as any;

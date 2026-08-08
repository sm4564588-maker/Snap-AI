import React, { useState, useEffect } from 'react';
import { HeaderNav, NavTabType } from './components/HeaderNav';
import { HeroLanding } from './components/HeroLanding';
import { FoodScannerModal } from './components/FoodScannerModal';
import { SnapCameraModal } from './components/SnapCameraModal';
import { AnalysisResultView } from './components/AnalysisResultView';
import { DailyDashboard } from './components/DailyDashboard';
import { DailyProteinDashboard } from './components/DailyProteinDashboard';
import { SocialFeedView } from './components/SocialFeedView';
import { ReelsView } from './components/ReelsView';
import { DiscoverView } from './components/DiscoverView';
import { StoriesFeedBar } from './components/StoriesFeedBar';
import { StoryViewerModal } from './components/StoryViewerModal';
import { FriendsModal } from './components/FriendsModal';
import { OnboardingFlowModal } from './components/OnboardingFlowModal';
import { MealHistory } from './components/MealHistory';
import { WeeklyAnalytics } from './components/WeeklyAnalytics';
import { ChatNutritionist } from './components/ChatNutritionist';
import { UserProfileModal } from './components/UserProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { Footer } from './components/Footer';

import { DEMO_SAMPLE_MEALS } from './data/mockMeals';
import { 
  INITIAL_USER_PROFILE, 
  MOCK_STORIES, 
  MOCK_POSTS, 
  MOCK_REELS, 
  MOCK_FRIENDS 
} from './data/mockSocialData';
import { 
  MealAnalysisResult, 
  UserProfile, 
  SocialPost, 
  StoryItem, 
  ReelItem, 
  Friend 
} from './types';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTabType>('landing');

  // Currently viewed analysis result
  const [selectedMealForAnalysis, setSelectedMealForAnalysis] = useState<MealAnalysisResult | null>(null);

  // Initialized Saved Meals with LocalStorage support
  const [savedMeals, setSavedMeals] = useState<MealAnalysisResult[]>(() => {
    try {
      const stored = localStorage.getItem('snap_ai_saved_meals');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return DEMO_SAMPLE_MEALS.map((s) => s.analysis);
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('snap_ai_user_profile');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return INITIAL_USER_PROFILE;
  });

  // Social Posts state
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    try {
      const stored = localStorage.getItem('snap_ai_social_posts');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return MOCK_POSTS;
  });

  // Stories state
  const [stories, setStories] = useState<StoryItem[]>(() => {
    try {
      const stored = localStorage.getItem('snap_ai_stories');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return MOCK_STORIES;
  });

  // Reels state
  const [reels, setReels] = useState<ReelItem[]>(MOCK_REELS);

  // Active Story Viewer Modal
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  // Chat prefilled query
  const [chatQuery, setChatQuery] = useState<string | undefined>(undefined);

  // Modals
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSnapCameraOpen, setIsSnapCameraOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Persist savedMeals
  useEffect(() => {
    try {
      localStorage.setItem('snap_ai_saved_meals', JSON.stringify(savedMeals));
    } catch (e) {}
  }, [savedMeals]);

  // Persist userProfile
  useEffect(() => {
    try {
      localStorage.setItem('snap_ai_user_profile', JSON.stringify(userProfile));
    } catch (e) {}
  }, [userProfile]);

  // Persist socialPosts
  useEffect(() => {
    try {
      localStorage.setItem('snap_ai_social_posts', JSON.stringify(socialPosts));
    } catch (e) {}
  }, [socialPosts]);

  // Persist stories
  useEffect(() => {
    try {
      localStorage.setItem('snap_ai_stories', JSON.stringify(stories));
    } catch (e) {}
  }, [stories]);

  // Handle new meal analysis complete
  const handleAnalysisComplete = (result: MealAnalysisResult) => {
    setSelectedMealForAnalysis(result);
    // Auto add to saved meals if not exists
    setSavedMeals((prev) => {
      if (prev.some((m) => m.id === result.id)) return prev;
      return [result, ...prev];
    });

    // Update user stats
    setUserProfile((prev) => ({
      ...prev,
      totalFoodScansCount: (prev.totalFoodScansCount || 0) + 1,
      totalProteinTrackedGrams: (prev.totalProteinTrackedGrams || 0) + (result.totalNutrition.protein || 0),
      xpPoints: (prev.xpPoints || 0) + 100
    }));
  };

  // Handle save meal
  const handleSaveMeal = (meal: MealAnalysisResult) => {
    setSavedMeals((prev) => {
      if (prev.some((m) => m.id === meal.id)) return prev;
      return [meal, ...prev];
    });
  };

  // Delete meal
  const handleDeleteMeal = (mealId: string) => {
    setSavedMeals((prev) => prev.filter((m) => m.id !== mealId));
    if (selectedMealForAnalysis?.id === mealId) {
      setSelectedMealForAnalysis(null);
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = (mealId: string) => {
    setSavedMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, favorite: !m.favorite } : m))
    );
    if (selectedMealForAnalysis?.id === mealId) {
      setSelectedMealForAnalysis((prev) => (prev ? { ...prev, favorite: !prev.favorite } : null));
    }
  };

  // Add water intake
  const handleAddWater = (amountMl: number) => {
    setUserProfile((prev) => ({
      ...prev,
      waterIntakeMl: Math.min(prev.waterGoalMl + 1000, prev.waterIntakeMl + amountMl),
    }));
  };

  // Ask AI Coach about specific meal
  const handleAskCoachAboutMeal = (mealName: string) => {
    setChatQuery(mealName);
    setActiveTab('chat');
  };

  // Handle Add to Today's Protein from Camera Snap
  const handleAddProteinFromSnap = (proteinGrams: number, mealName: string, calories: number) => {
    setUserProfile((prev) => ({
      ...prev,
      totalProteinTrackedGrams: (prev.totalProteinTrackedGrams || 0) + proteinGrams,
      xpPoints: (prev.xpPoints || 0) + 50
    }));
  };

  // Handle Share Snap as Story
  const handleShareAsStory = (mediaUrl: string, caption?: string, aiBadge?: any) => {
    const newStory: StoryItem = {
      id: `story-${Date.now()}`,
      userId: userProfile.id || 'user-snap-1',
      username: userProfile.username || 'snap_sam',
      displayName: 'Your Story',
      userAvatar: userProfile.avatarUrl,
      mediaUrl: mediaUrl,
      mediaType: 'image',
      caption: caption || 'Snapping clean macros with Snap AI! ⚡',
      timestamp: 'Just now',
      expiresAt: '24h left',
      aiNutritionBadge: aiBadge ? {
        mealName: aiBadge.mealName || 'Scanned Meal',
        protein: aiBadge.protein || 35,
        calories: aiBadge.calories || 450
      } : undefined,
      viewsCount: 0,
      viewers: [],
      isViewed: false,
      isOwnStory: true
    };
    setStories((prev) => [newStory, ...prev.filter(s => !s.isOwnStory)]);
    setIsSnapCameraOpen(false);
  };

  // Handle Share Snap as Social Post
  const handleShareAsPost = (mediaUrl: string, caption: string, aiBadge?: any) => {
    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      userId: userProfile.id || 'user-snap-1',
      username: userProfile.username || 'snap_sam',
      displayName: userProfile.displayName || userProfile.name || 'Sam Carter ⚡',
      userAvatar: userProfile.avatarUrl,
      timestamp: 'Just now',
      type: 'food_scan',
      caption: caption || 'Fresh meal scanned with Snap AI! 🟡 #HighProtein',
      mediaUrl: mediaUrl,
      mediaType: 'image',
      location: 'Snap AI Kitchen',
      tags: ['HighProtein', 'SnapAI', 'MacroTrack'],
      aiNutrition: aiBadge ? {
        mealName: aiBadge.mealName || 'Scanned Meal',
        protein: aiBadge.protein || 35,
        calories: aiBadge.calories || 450,
        carbs: aiBadge.carbs || 30,
        fat: aiBadge.fat || 15,
        score: 92
      } : undefined,
      likesCount: 1,
      isLiked: true,
      commentsCount: 0,
      repostsCount: 0,
      isReposted: false,
      savesCount: 0,
      isSaved: false,
      comments: []
    };
    setSocialPosts((prev) => [newPost, ...prev]);
    setIsSnapCameraOpen(false);
    setActiveTab('social');
  };

  // Social Post Actions
  const handleLikePost = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likesCount: p.isLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1,
            }
          : p
      )
    );
  };

  const handleCommentPost = (postId: string, commentText: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      userId: userProfile.id || 'user-snap-1',
      username: userProfile.username || 'snap_sam',
      userAvatar: userProfile.avatarUrl,
      text: commentText,
      timestamp: 'Just now',
      likesCount: 0,
      isLiked: false
    };

    setSocialPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              commentsCount: p.commentsCount + 1,
              comments: [...(p.comments || []), newComment]
            }
          : p
      )
    );
  };

  const handleRepostPost = (postId: string, customNote?: string) => {
    const originalPost = socialPosts.find((p) => p.id === postId);
    if (!originalPost) return;

    setSocialPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, repostsCount: p.repostsCount + 1, isReposted: true } : p
      )
    );

    const repostedPost: SocialPost = {
      id: `repost-${Date.now()}`,
      userId: userProfile.id || 'user-snap-1',
      username: userProfile.username || 'snap_sam',
      displayName: userProfile.displayName || userProfile.name || 'Sam Carter ⚡',
      userAvatar: userProfile.avatarUrl,
      timestamp: 'Just now',
      type: 'repost',
      caption: customNote || `Reposted from @${originalPost.username}`,
      mediaUrl: originalPost.mediaUrl,
      mediaType: originalPost.mediaType,
      location: originalPost.location,
      tags: originalPost.tags,
      aiNutrition: originalPost.aiNutrition,
      repostedBy: {
        username: originalPost.username,
        displayName: originalPost.displayName,
        avatarUrl: originalPost.userAvatar,
        customNote: customNote
      },
      likesCount: 0,
      isLiked: false,
      commentsCount: 0,
      repostsCount: 0,
      isReposted: false,
      savesCount: 0,
      isSaved: false,
      comments: []
    };

    setSocialPosts((prev) => [repostedPost, ...prev]);
  };

  const handleSavePost = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  // Reels Actions
  const handleLikeReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId
          ? {
              ...r,
              isLiked: !r.isLiked,
              likesCount: r.isLiked ? Math.max(0, r.likesCount - 1) : r.likesCount + 1
            }
          : r
      )
    );
  };

  const handleCommentReel = (reelId: string, comment: string) => {
    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId
          ? {
              ...r,
              commentsCount: r.commentsCount + 1,
              commentsList: [
                ...(r.commentsList || []),
                {
                  id: `rc-${Date.now()}`,
                  username: userProfile.username || 'snap_sam',
                  userAvatar: userProfile.avatarUrl,
                  text: comment,
                  timestamp: 'Just now'
                }
              ]
            }
          : r
      )
    );
  };

  const handleFollowCreator = (username: string) => {
    setUserProfile((prev) => ({
      ...prev,
      followingCount: (prev.followingCount || 0) + 1
    }));
  };

  // Story click handler
  const handleOpenStory = (index: number) => {
    setSelectedStoryIndex(index);
    setIsStoryViewerOpen(true);
    setStories((prev) =>
      prev.map((s, i) => (i === index ? { ...s, isViewed: true } : s))
    );
  };

  // Delete Story
  const handleDeleteStory = (storyId: string) => {
    setStories((prev) => prev.filter((s) => s.id !== storyId));
    setIsStoryViewerOpen(false);
  };

  // Reset Data
  const handleResetData = () => {
    setSavedMeals([]);
    localStorage.removeItem('snap_ai_saved_meals');
    localStorage.removeItem('snap_ai_social_posts');
    localStorage.removeItem('snap_ai_stories');
    localStorage.removeItem('snap_ai_user_profile');
    setUserProfile(INITIAL_USER_PROFILE);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Top Floating Navigation Bar */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setSelectedMealForAnalysis(null);
          setActiveTab(tab);
        }}
        onOpenScanner={() => setIsSnapCameraOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
        onOpenFriends={() => setIsFriendsOpen(true)}
        userProfile={userProfile}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {selectedMealForAnalysis ? (
          <AnalysisResultView
            analysis={selectedMealForAnalysis}
            onSaveMeal={handleSaveMeal}
            onSnapAnother={() => {
              setSelectedMealForAnalysis(null);
              setIsSnapCameraOpen(true);
            }}
            onAskCoachAboutMeal={handleAskCoachAboutMeal}
            onBack={() => setSelectedMealForAnalysis(null)}
            isAlreadySaved={savedMeals.some((m) => m.id === selectedMealForAnalysis.id)}
          />
        ) : activeTab === 'landing' ? (
          <HeroLanding
            onOpenScanner={() => setIsSnapCameraOpen(true)}
            onSelectSampleMeal={(analysis) => {
              setSelectedMealForAnalysis(analysis);
            }}
            onGoToDashboard={() => setActiveTab('dashboard')}
            onOpenDownload={() => setIsDownloadOpen(true)}
          />
        ) : activeTab === 'dashboard' ? (
          <div className="space-y-6">
            {/* Top Stories Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
              <StoriesFeedBar
                stories={stories}
                onSelectStory={handleOpenStory}
                onAddStory={() => setIsSnapCameraOpen(true)}
                userProfile={userProfile}
              />
            </div>

            <DailyDashboard
              userProfile={userProfile}
              savedMeals={savedMeals}
              onOpenScanner={() => setIsSnapCameraOpen(true)}
              onOpenUpload={() => setIsScannerOpen(true)}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectMeal={(meal) => setSelectedMealForAnalysis(meal)}
              onDeleteMeal={handleDeleteMeal}
              onToggleFavorite={handleToggleFavorite}
              onAddWater={handleAddWater}
            />
          </div>
        ) : activeTab === 'protein' ? (
          <DailyProteinDashboard
            userProfile={userProfile}
            onOpenScanner={() => setIsSnapCameraOpen(true)}
            onOpenStreakModal={() => setIsFriendsOpen(true)}
            onShareProteinProgress={() => {
              handleShareAsPost(
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
                `Hit my daily protein goal of ${userProfile.dailyProteinGoalGrams}g with Snap AI! ⚡🔥 #ProteinStreak`
              );
            }}
          />
        ) : activeTab === 'social' ? (
          <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-6">
            <StoriesFeedBar
              stories={stories}
              onSelectStory={handleOpenStory}
              onAddStory={() => setIsSnapCameraOpen(true)}
              userProfile={userProfile}
            />

            <SocialFeedView
              posts={socialPosts}
              userProfile={userProfile}
              onLikePost={handleLikePost}
              onCommentPost={handleCommentPost}
              onRepostPost={handleRepostPost}
              onSavePost={handleSavePost}
              onDeletePost={(postId) => setSocialPosts(prev => prev.filter(p => p.id !== postId))}
              onShareToChat={(post) => {
                setChatQuery(`Tell me about the nutrition in ${post.aiNutrition?.mealName || 'this meal'}`);
                setActiveTab('chat');
              }}
              onOpenScanner={() => setIsSnapCameraOpen(true)}
            />
          </div>
        ) : activeTab === 'reels' ? (
          <ReelsView
            reels={reels}
            userProfile={userProfile}
            onLikeReel={handleLikeReel}
            onCommentReel={handleCommentReel}
            onRepostReel={(reelId) => {
              const reel = reels.find(r => r.id === reelId);
              if (reel) {
                handleShareAsPost(reel.videoUrl, `Check out this reel from @${reel.username}! 📹`);
              }
            }}
            onSaveReel={(reelId) => {
              setReels(prev => prev.map(r => r.id === reelId ? { ...r, isSaved: !r.isSaved } : r));
            }}
            onFollowCreator={handleFollowCreator}
          />
        ) : activeTab === 'discover' ? (
          <DiscoverView
            userProfile={userProfile}
            onSendFriendRequest={(friendId) => {
              setIsFriendsOpen(true);
            }}
            onSelectPost={(post) => {
              setActiveTab('social');
            }}
            onSelectReel={(reel) => {
              setActiveTab('reels');
            }}
            onOpenScanner={() => setIsSnapCameraOpen(true)}
          />
        ) : activeTab === 'history' ? (
          <MealHistory
            meals={savedMeals}
            onSelectMeal={(meal) => setSelectedMealForAnalysis(meal)}
            onDeleteMeal={handleDeleteMeal}
            onToggleFavorite={handleToggleFavorite}
            onOpenScanner={() => setIsSnapCameraOpen(true)}
          />
        ) : activeTab === 'analytics' ? (
          <WeeklyAnalytics meals={savedMeals} userProfile={userProfile} />
        ) : activeTab === 'chat' ? (
          <ChatNutritionist userProfile={userProfile} initialQuery={chatQuery} />
        ) : null}
      </main>

      {/* Footer */}
      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />

      {/* Full Snapchat Camera Modal (with drawing, text, filter, flash, recording) */}
      <SnapCameraModal
        isOpen={isSnapCameraOpen}
        onClose={() => setIsSnapCameraOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
        onAddToTodayProtein={handleAddProteinFromSnap}
        onShareAsStory={handleShareAsStory}
        onShareAsPost={handleShareAsPost}
        userProfile={userProfile}
      />

      {/* Food Scanner Modal (File upload & Sample presets) */}
      <FoodScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />

      {/* Full Screen Story Viewer Modal */}
      <StoryViewerModal
        isOpen={isStoryViewerOpen}
        onClose={() => setIsStoryViewerOpen(false)}
        stories={stories}
        initialIndex={selectedStoryIndex}
        onDeleteStory={handleDeleteStory}
        onSendReply={(story, replyText) => {
          console.log('Replied to story:', story.id, replyText);
        }}
        userProfile={userProfile}
      />

      {/* Friends & Streaks Modal */}
      <FriendsModal
        isOpen={isFriendsOpen}
        onClose={() => setIsFriendsOpen(false)}
        userProfile={userProfile}
        onOpenChatWithFriend={(friend) => {
          setIsFriendsOpen(false);
          setChatQuery(`How can I meal prep like my friend @${friend.username}?`);
          setActiveTab('chat');
        }}
        onOpenSnapCameraWithFriend={(friend) => {
          setIsFriendsOpen(false);
          setIsSnapCameraOpen(true);
        }}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={(updated) => setUserProfile(updated)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetData={handleResetData}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Download App / APK Modal */}
      <DownloadAppModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      {/* Onboarding Flow Modal for new users */}
      <OnboardingFlowModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(stats) => {
          setUserProfile(prev => ({
            ...prev,
            ...stats,
            isOnboarded: true
          }));
          setIsOnboardingOpen(false);
        }}
      />
    </div>
  );
}


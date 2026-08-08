import React, { useState } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  TrendingUp, 
  UserPlus, 
  Utensils, 
  Play, 
  Check, 
  Tag, 
  Grid,
  Filter
} from 'lucide-react';
import { Friend, SocialPost, ReelItem, UserProfile } from '../types';
import { MOCK_FRIENDS, MOCK_POSTS, MOCK_REELS } from '../data/mockSocialData';

interface DiscoverViewProps {
  userProfile: UserProfile;
  onSendFriendRequest: (friendId: string) => void;
  onSelectPost: (post: SocialPost) => void;
  onSelectReel: (reel: ReelItem) => void;
  onOpenScanner?: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  userProfile,
  onSendFriendRequest,
  onSelectPost,
  onSelectReel,
  onOpenScanner
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recipes' | 'creators' | 'reels'>('all');

  const POPULAR_TAGS = ['HighProtein', 'MealPrep', 'Steak', 'GymTok', 'SalmonBowl', 'Keto', 'MuscleBuilding', 'SnapAI'];

  // Filter creators
  const filteredCreators = MOCK_FRIENDS.filter(f => 
    f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter posts
  const filteredPosts = MOCK_POSTS.filter(p => 
    p.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in p-3 sm:p-4">
      
      {/* SEARCH BAR HEADER */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search creators, #highprotein recipes, reels, AI scans..."
          className="w-full bg-[#0e0e14] border-2 border-yellow-400/30 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white font-medium placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_25px_rgba(255,252,0,0.3)] transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* POPULAR HASHTAG CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
          Trending:
        </span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchQuery(tag)}
            className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              searchQuery.toLowerCase() === tag.toLowerCase()
                ? 'bg-yellow-400 text-black font-black shadow-md'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:border-yellow-400/40 hover:text-yellow-400'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* DISCOVER TABS */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'all', label: '🔥 All Trending' },
          { id: 'recipes', label: '🥩 High Protein Meals' },
          { id: 'creators', label: '👥 Fitness Creators' },
          { id: 'reels', label: '🎬 Viral Reels' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(255,252,0,0.4)]'
                : 'bg-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TOP CREATORS SPOTLIGHT */}
      {(activeTab === 'all' || activeTab === 'creators') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-base text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>Popular Fitness Creators & Streaks</span>
            </h3>
            <span className="text-xs text-yellow-400 font-bold">Connect & Share</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {filteredCreators.map((creator) => (
              <div
                key={creator.id}
                className="p-4 rounded-3xl bg-white/5 border border-white/10 hover:border-yellow-400/40 transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.displayName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-black text-sm text-white truncate">
                      {creator.displayName}
                    </h4>
                    <span className="text-xs text-gray-400 block truncate">@{creator.username}</span>
                    <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-yellow-400/20 text-yellow-400 text-[10px] font-black">
                      <span>🔥</span>
                      <span>{creator.streakDays} Day Streak</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {creator.bio}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-[11px] text-gray-400 font-bold">
                    Target: {creator.proteinGoalGrams}g/day
                  </span>

                  <button
                    onClick={() => onSendFriendRequest(creator.id)}
                    className="px-3 py-1.5 rounded-xl bg-yellow-400 text-black font-black text-xs hover:bg-yellow-300 transition-all cursor-pointer flex items-center gap-1 shadow-md"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>ADD FRIEND</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HIGH PROTEIN RECIPES & AI SCANS GALLERY */}
      {(activeTab === 'all' || activeTab === 'recipes') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-base text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-yellow-400" />
              <span>Trending High-Protein Food Scans</span>
            </h3>
            {onOpenScanner && (
              <button
                onClick={onOpenScanner}
                className="text-xs text-yellow-400 font-black hover:underline cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Scan Your Dish</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="relative aspect-square rounded-3xl overflow-hidden bg-black border border-white/10 group cursor-pointer hover:border-yellow-400 transition-all"
              >
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Top Protein Tag */}
                {post.aiNutrition && (
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-yellow-400 text-black text-[10px] font-black shadow-lg">
                    {Math.round(post.aiNutrition.protein)}g Protein
                  </div>
                )}

                {/* Bottom Caption & User */}
                <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
                  <span className="text-[10px] text-gray-300 font-bold block truncate">
                    @{post.username}
                  </span>
                  <h4 className="font-heading font-black text-xs text-white leading-tight line-clamp-1">
                    {post.aiNutrition?.mealName || post.caption}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRENDING REELS SPOTLIGHT */}
      {(activeTab === 'all' || activeTab === 'reels') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-base text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>Trending Fitness & Cooking Reels</span>
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {MOCK_REELS.map((reel) => (
              <div
                key={reel.id}
                onClick={() => onSelectReel(reel)}
                className="relative aspect-9/16 rounded-3xl overflow-hidden bg-black border border-white/10 group cursor-pointer hover:border-yellow-400 transition-all"
              >
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                  <Play className="w-3 h-3 fill-white" />
                  <span>{reel.likesCount}</span>
                </div>

                <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                  <span className="text-[10px] font-bold text-yellow-400 block truncate">@{reel.username}</span>
                  <p className="text-[10px] text-gray-200 line-clamp-2 leading-tight">{reel.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

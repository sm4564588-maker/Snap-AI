import React from 'react';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { StoryItem, UserProfile } from '../types';

interface StoriesFeedBarProps {
  stories: StoryItem[];
  userProfile: UserProfile;
  onOpenStory: (story: StoryItem, index: number) => void;
  onCreateStory: () => void;
}

export const StoriesFeedBar: React.FC<StoriesFeedBarProps> = ({
  stories,
  userProfile,
  onOpenStory,
  onCreateStory
}) => {
  const ownStory = stories.find(s => s.isOwnStory);
  const friendStories = stories.filter(s => !s.isOwnStory);

  return (
    <div className="w-full bg-black/60 backdrop-blur-md py-3 px-2 border-b border-white/10 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3.5 max-w-4xl mx-auto">
        
        {/* YOUR STORY ITEM */}
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div className="relative group cursor-pointer" onClick={ownStory ? () => onOpenStory(ownStory, 0) : onCreateStory}>
            <div className={`w-16 h-16 rounded-full p-0.5 transition-all ${
              ownStory 
                ? 'bg-gradient-to-tr from-yellow-400 to-amber-300 shadow-[0_0_15px_rgba(255,252,0,0.5)]' 
                : 'border-2 border-dashed border-yellow-400/60 hover:border-yellow-400'
            }`}>
              <img 
                src={userProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                alt="Your Story" 
                className="w-full h-full rounded-full object-cover bg-black"
              />
            </div>

            {/* Plus or Flame badge */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateStory();
              }}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center font-black shadow-md hover:scale-110 active:scale-95 transition-transform"
              title="Add Story Snap"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
          <span className="text-[11px] font-bold text-gray-300 max-w-[70px] truncate">
            {ownStory ? 'Your Story' : 'Add Story'}
          </span>
        </div>

        {/* FRIENDS' STORIES */}
        {friendStories.map((story, idx) => {
          const isViewed = story.isViewed;
          return (
            <div
              key={story.id}
              onClick={() => onOpenStory(story, idx + (ownStory ? 1 : 0))}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className={`w-16 h-16 rounded-full p-0.5 transition-all group-hover:scale-105 ${
                isViewed
                  ? 'border-2 border-white/20 opacity-70'
                  : 'bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-200 shadow-[0_0_20px_rgba(255,252,0,0.4)]'
              }`}>
                <div className="w-full h-full rounded-full overflow-hidden bg-black p-0.5">
                  <img
                    src={story.userAvatar}
                    alt={story.displayName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center gap-0.5 max-w-[75px]">
                <span className="text-[11px] font-semibold text-gray-200 truncate">
                  {story.displayName.split(' ')[0]}
                </span>
                {story.aiNutritionBadge && (
                  <span className="text-[9px] text-yellow-400 font-black">⚡</span>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Trash2, 
  Send, 
  Sparkles, 
  Flame, 
  Heart,
  Smile
} from 'lucide-react';
import { StoryItem, UserProfile } from '../types';

interface StoryViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: StoryItem[];
  initialIndex: number;
  onDeleteStory?: (storyId: string) => void;
  onSendReply?: (story: StoryItem, replyText: string) => void;
  userProfile?: UserProfile;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  isOpen,
  onClose,
  stories,
  initialIndex,
  onDeleteStory,
  onSendReply,
  userProfile
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showViewersModal, setShowViewersModal] = useState(false);

  const activeStory = stories[currentIndex];

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex, isOpen]);

  // Auto-advance story timer (5 seconds)
  useEffect(() => {
    if (!isOpen || !activeStory || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2; // 50 ticks = 5 seconds
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, currentIndex, isPaused, activeStory]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleSendQuickReaction = (emoji: string) => {
    if (onSendReply && activeStory) {
      onSendReply(activeStory, `Reacted ${emoji} to your story!`);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeStory) return;
    if (onSendReply) {
      onSendReply(activeStory, replyText);
    }
    setReplyText('');
  };

  if (!isOpen || !activeStory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-fade-in">
      
      {/* Container simulating a mobile phone viewport */}
      <div 
        className="relative w-full h-full max-w-md mx-auto bg-black flex flex-col justify-between overflow-hidden sm:rounded-[36px] sm:border-2 sm:border-yellow-400/40 sm:shadow-[0_0_80px_rgba(255,252,0,0.3)] sm:max-h-[92vh]"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        
        {/* TOP SEGMENTED PROGRESS BARS */}
        <div className="absolute top-0 inset-x-0 z-30 p-3 pt-4 flex gap-1.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          {stories.map((story, idx) => (
            <div key={story.id} className="flex-1 bg-white/20 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-yellow-400 h-full transition-all duration-100"
                style={{
                  width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* HEADER: User info + Close */}
        <div className="absolute top-6 inset-x-0 z-30 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src={activeStory.userAvatar} 
              alt={activeStory.displayName} 
              className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-sm text-white drop-shadow">
                  {activeStory.displayName}
                </span>
                <span className="text-[10px] text-gray-300">@{activeStory.username}</span>
              </div>
              <span className="text-[10px] text-yellow-400 font-bold">{activeStory.timestamp} • {activeStory.expiresAt}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeStory.isOwnStory && onDeleteStory && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteStory(activeStory.id);
                  onClose();
                }}
                className="p-2 rounded-full bg-black/40 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                title="Delete Story"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 rounded-full bg-black/40 text-white hover:bg-yellow-400 hover:text-black transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STORY MEDIA IMAGE & OVERLAYS */}
        <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={activeStory.mediaUrl}
            alt="Story content"
            className="w-full h-full object-cover"
          />

          {/* Draggable/Interactive Stickers */}
          {activeStory.stickers?.map((st, i) => (
            <div
              key={i}
              style={{ top: `${st.y}%`, left: `${st.x}%` }}
              className="absolute text-4xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] pointer-events-none"
            >
              {st.emoji}
            </div>
          ))}

          {/* AI NUTRITION BADGE OVERLAY */}
          {activeStory.aiNutritionBadge && (
            <div className="absolute top-24 left-4 z-20 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-yellow-400/40 shadow-xl max-w-xs animate-fade-in">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-yellow-400 mb-0.5">
                <Sparkles className="w-3 h-3 fill-yellow-400" />
                <span>Snap AI Food Scan</span>
              </div>
              <h4 className="font-heading font-black text-sm text-white">
                {activeStory.aiNutritionBadge.mealName}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-md bg-yellow-400 text-black text-xs font-black">
                  {activeStory.aiNutritionBadge.protein}g Protein
                </span>
                <span className="text-[11px] text-gray-300 font-bold">
                  {activeStory.aiNutritionBadge.calories} kcal
                </span>
              </div>
            </div>
          )}

          {/* CAPTION BOX OVERLAY */}
          {activeStory.caption && (
            <div className="absolute inset-x-4 bottom-24 z-20 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-center shadow-lg">
              <p className="text-sm font-bold text-white leading-relaxed">
                {activeStory.caption}
              </p>
            </div>
          )}

          {/* Invisible Left / Right Tap zones */}
          <div 
            onClick={handlePrev} 
            className="absolute left-0 inset-y-0 w-1/3 z-10 cursor-pointer" 
            title="Previous Story" 
          />
          <div 
            onClick={handleNext} 
            className="absolute right-0 inset-y-0 w-2/3 z-10 cursor-pointer" 
            title="Next Story" 
          />
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="relative z-30 p-4 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2">
          
          {/* If Own Story: Viewers Count & List */}
          {activeStory.isOwnStory ? (
            <div className="flex items-center justify-between p-2 rounded-2xl bg-white/10 backdrop-blur-md">
              <button
                onClick={() => setShowViewersModal(true)}
                className="flex items-center gap-2 text-xs font-black text-yellow-400 hover:text-white transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>{activeStory.viewsCount || 68} Viewers</span>
              </button>

              <div className="flex -space-x-2">
                {activeStory.viewers.slice(0, 3).map((v) => (
                  <img
                    key={v.id}
                    src={v.avatarUrl}
                    alt={v.displayName}
                    className="w-6 h-6 rounded-full object-cover border border-black"
                  />
                ))}
              </div>
            </div>
          ) : (
            /* If Friend's Story: Direct Snap Reply & Reactions */
            <div className="space-y-2">
              
              {/* Quick Emojis */}
              <div className="flex items-center justify-around py-1">
                {['🔥', '💛', '💪', '🥩', '😂', '✨'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleSendQuickReaction(emoji)}
                    className="text-2xl hover:scale-125 active:scale-95 transition-transform cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Send snap reply to ${activeStory.displayName.split(' ')[0]}...`}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 transition-all cursor-pointer shadow-md font-bold"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* VIEWERS MODAL */}
        {showViewersModal && (
          <div className="absolute inset-x-0 bottom-0 z-40 p-5 rounded-t-[36px] bg-black/95 border-t-2 border-yellow-400/40 space-y-4 max-h-[60%] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-yellow-400" />
                <h4 className="font-heading font-black text-sm text-white">Story Viewers ({activeStory.viewers.length || 3})</h4>
              </div>
              <button onClick={() => setShowViewersModal(false)} className="text-gray-400 hover:text-white text-xs">Close</button>
            </div>

            <div className="space-y-3">
              {activeStory.viewers.map((viewer) => (
                <div key={viewer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={viewer.avatarUrl} alt={viewer.displayName} className="w-8 h-8 rounded-full object-cover border border-yellow-400" />
                    <div>
                      <h5 className="font-bold text-xs text-white">{viewer.displayName}</h5>
                      <span className="text-[10px] text-gray-400">@{viewer.username} • {viewer.viewedAt}</span>
                    </div>
                  </div>
                  <span className="text-xs">🔥</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

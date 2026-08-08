import React, { useState, useRef } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Repeat, 
  Music, 
  Volume2, 
  VolumeX, 
  UserPlus, 
  Sparkles, 
  Flame, 
  ChevronUp, 
  ChevronDown, 
  Send,
  Plus
} from 'lucide-react';
import { ReelItem, UserProfile } from '../types';

interface ReelsViewProps {
  reels: ReelItem[];
  userProfile: UserProfile;
  onLikeReel: (reelId: string) => void;
  onCommentReel: (reelId: string, comment: string) => void;
  onRepostReel: (reelId: string) => void;
  onSaveReel: (reelId: string) => void;
  onFollowCreator: (creatorUsername: string) => void;
}

export const ReelsView: React.FC<ReelsViewProps> = ({
  reels,
  userProfile,
  onLikeReel,
  onCommentReel,
  onRepostReel,
  onSaveReel,
  onFollowCreator
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeCommentsReelId, setActiveCommentsReelId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>('');

  const activeReel = reels[currentIndex] || reels[0];

  const handleNextReel = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeReel) return;
    onCommentReel(activeReel.id, commentText);
    setCommentText('');
  };

  return (
    <div className="w-full max-w-md mx-auto h-[82vh] relative bg-black rounded-[36px] overflow-hidden border-2 border-yellow-400/40 shadow-[0_0_80px_rgba(255,252,0,0.3)] flex flex-col justify-between animate-fade-in my-auto">
      
      {/* FULL-HEIGHT VIDEO VIEWPORT */}
      <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
        
        {/* Video element with poster fallback */}
        <video
          src={activeReel.videoUrl}
          poster={activeReel.thumbnailUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

        {/* TOP BRANDING & AUDIO TOGGLE */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-yellow-400/40 text-yellow-400 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 fill-yellow-400" />
            <span>SNAP REELS</span>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-yellow-400 hover:text-black transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* RIGHT SIDE FLOATING INTERACTION DOCK */}
        <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4">
          
          {/* Creator Avatar with Follow (+) button */}
          <div className="relative mb-2">
            <img
              src={activeReel.userAvatar}
              alt={activeReel.displayName}
              className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shadow-xl"
            />
            {!activeReel.isFollowing && (
              <button
                onClick={() => onFollowCreator(activeReel.username)}
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center font-black shadow-md hover:scale-110 active:scale-95 transition-transform"
                title="Follow Creator"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            )}
          </div>

          {/* Like Button */}
          <button
            onClick={() => onLikeReel(activeReel.id)}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-transform group-hover:scale-110 ${
              activeReel.isLiked ? 'bg-yellow-400 text-black' : 'bg-black/60 text-white'
            }`}>
              <Flame className={`w-6 h-6 ${activeReel.isLiked ? 'fill-black' : ''}`} />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow">
              {activeReel.likesCount}
            </span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setActiveCommentsReelId(activeCommentsReelId ? null : activeReel.id)}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white shadow-lg group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow">
              {activeReel.commentsCount || 18}
            </span>
          </button>

          {/* Repost Button */}
          <button
            onClick={() => onRepostReel(activeReel.id)}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white shadow-lg group-hover:scale-110 transition-transform">
              <Repeat className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow">
              {activeReel.repostsCount || 42}
            </span>
          </button>

          {/* Save / Bookmark Button */}
          <button
            onClick={() => onSaveReel(activeReel.id)}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-transform ${
              activeReel.isSaved ? 'bg-yellow-400 text-black' : 'bg-black/60 text-white'
            }`}>
              <Bookmark className={`w-6 h-6 ${activeReel.isSaved ? 'fill-black' : ''}`} />
            </div>
          </button>

          {/* Spinning Vinyl Soundtrack */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-300 p-1 animate-spin shadow-lg mt-1">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Music className="w-3.5 h-3.5 text-yellow-400" />
            </div>
          </div>

        </div>

        {/* BOTTOM REEL INFO & CAPTION */}
        <div className="absolute bottom-4 inset-x-4 pr-16 z-20 space-y-2 text-white">
          
          {/* Creator tag & protein badge */}
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-black text-sm text-white drop-shadow">
              @{activeReel.username}
            </h3>
            {activeReel.proteinGrams && (
              <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-black text-[10px] font-black shadow-md">
                ⚡ {activeReel.proteinGrams}g Protein
              </span>
            )}
          </div>

          {/* Caption */}
          <p className="text-xs text-gray-200 leading-relaxed font-medium line-clamp-2 drop-shadow">
            {activeReel.caption}
          </p>

          {/* Sound track ticker */}
          <div className="flex items-center gap-1.5 text-[11px] text-yellow-400 font-bold">
            <Music className="w-3 h-3" />
            <span className="truncate">{activeReel.songTitle} • {activeReel.songArtist}</span>
          </div>

        </div>

        {/* VERTICAL NAV ARROWS (Top & Bottom on Desktop) */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {currentIndex > 0 && (
            <button
              onClick={handlePrevReel}
              className="p-2 rounded-full bg-black/40 text-white hover:bg-yellow-400 hover:text-black transition-all cursor-pointer"
              title="Previous Reel"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
          {currentIndex < reels.length - 1 && (
            <button
              onClick={handleNextReel}
              className="p-2 rounded-full bg-black/40 text-white hover:bg-yellow-400 hover:text-black transition-all cursor-pointer"
              title="Next Reel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* COMMENTS BOTTOM SHEET */}
      {activeCommentsReelId && (
        <div className="absolute inset-x-0 bottom-0 z-40 p-5 rounded-t-[36px] bg-black/95 border-t-2 border-yellow-400/40 space-y-4 max-h-[55%] flex flex-col justify-between animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="font-heading font-black text-sm text-white">Reel Comments</h4>
            <button onClick={() => setActiveCommentsReelId(null)} className="text-gray-400 hover:text-white text-xs">Close</button>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            <div className="flex items-start gap-2.5 text-xs">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Marcus" className="w-7 h-7 rounded-full object-cover border border-yellow-400" />
              <div className="bg-white/5 rounded-2xl p-2.5 flex-1">
                <span className="font-bold text-white mr-1.5">@marcus_fit</span>
                <span className="text-gray-300">That meal prep technique is legendary! 🥩🔥</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Chloe" className="w-7 h-7 rounded-full object-cover border border-yellow-400" />
              <div className="bg-white/5 rounded-2xl p-2.5 flex-1">
                <span className="font-bold text-white mr-1.5">@chloe_lifts</span>
                <span className="text-gray-300">Adding this to my high protein recipes folder right now.</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a reel comment..."
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

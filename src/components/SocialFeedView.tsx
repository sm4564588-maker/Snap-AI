import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Repeat, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  Sparkles, 
  Flame, 
  MapPin, 
  Send, 
  Trash2, 
  Check, 
  Plus, 
  Utensils
} from 'lucide-react';
import { SocialPost, PostComment, UserProfile } from '../types';

interface SocialFeedViewProps {
  posts: SocialPost[];
  userProfile: UserProfile;
  onLikePost: (postId: string) => void;
  onCommentPost: (postId: string, commentText: string) => void;
  onRepostPost: (postId: string, customNote?: string) => void;
  onSavePost: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  onShareToChat?: (post: SocialPost) => void;
  onOpenScanner?: () => void;
}

export const SocialFeedView: React.FC<SocialFeedViewProps> = ({
  posts,
  userProfile,
  onLikePost,
  onCommentPost,
  onRepostPost,
  onSavePost,
  onDeletePost,
  onShareToChat,
  onOpenScanner
}) => {
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');
  const [repostModalPost, setRepostModalPost] = useState<SocialPost | null>(null);
  const [repostNote, setRepostNote] = useState<string>('');
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onCommentPost(postId, commentInput);
    setCommentInput('');
  };

  const handleConfirmRepost = (e: React.FormEvent) => {
    e.preventDefault();
    if (repostModalPost) {
      onRepostPost(repostModalPost.id, repostNote);
      setRepostModalPost(null);
      setRepostNote('');
    }
  };

  const handleCopyLink = (postId: string) => {
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in p-2 sm:p-4">
      
      {/* POSTS LIST */}
      {posts.map((post) => {
        const isOwn = post.userId === userProfile.id;
        const targetPost = post.type === 'repost' && post.originalPost ? post.originalPost : post;

        return (
          <div
            key={post.id}
            className="rounded-[32px] bg-[#0c0c10] border border-white/10 hover:border-yellow-400/30 transition-all overflow-hidden shadow-2xl space-y-3"
          >
            
            {/* REPOST BANNER (If repost) */}
            {post.type === 'repost' && post.repostedBy && (
              <div className="px-5 pt-3 pb-1 flex items-center justify-between text-xs text-yellow-400 font-bold border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4" />
                  <span>@{post.repostedBy.username} reposted</span>
                  {post.repostedBy.customNote && (
                    <span className="text-gray-300 font-normal italic">
                      "{post.repostedBy.customNote}"
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* POST HEADER */}
            <div className="p-4 sm:p-5 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={targetPost.userAvatar}
                    alt={targetPost.displayName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-yellow-400 shadow-md"
                  />
                  {targetPost.type === 'food_scan' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center font-black text-[10px]">
                      ⚡
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-sm text-white">{targetPost.displayName}</h3>
                    <span className="text-xs text-gray-400">@{targetPost.username}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{targetPost.timestamp}</span>
                    {targetPost.location && (
                      <span className="flex items-center gap-0.5 text-yellow-400/90 font-medium">
                        <MapPin className="w-3 h-3" />
                        <span>{targetPost.location}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Options Menu / Delete */}
              <div className="flex items-center gap-1">
                {isOwn && onDeletePost && (
                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* POST MEDIA & AI NUTRITION CARD */}
            {targetPost.mediaUrl && (
              <div className="relative w-full aspect-square sm:aspect-4/3 bg-black overflow-hidden group">
                <img
                  src={targetPost.mediaUrl}
                  alt={targetPost.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* AI NUTRITION BADGE OVERLAY */}
                {targetPost.aiNutrition && (
                  <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-yellow-400/40 shadow-2xl flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-yellow-400">
                        <Sparkles className="w-3 h-3 fill-yellow-400" />
                        <span>Snap AI Food Scan</span>
                      </div>
                      <h4 className="font-heading font-black text-sm text-white truncate max-w-[200px] sm:max-w-xs">
                        {targetPost.aiNutrition.mealName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="px-3 py-1 rounded-xl bg-yellow-400 text-black text-center shadow-md">
                        <span className="text-[9px] font-black uppercase block leading-none">PROTEIN</span>
                        <span className="font-heading font-black text-sm leading-tight">
                          {Math.round(targetPost.aiNutrition.protein)}g
                        </span>
                      </div>
                      <div className="px-2.5 py-1 rounded-xl bg-white/10 text-white text-center">
                        <span className="text-[9px] text-gray-400 uppercase block leading-none">CAL</span>
                        <span className="font-bold text-xs leading-tight">
                          {targetPost.aiNutrition.calories}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ACTION BUTTONS BAR */}
            <div className="p-4 pt-1 space-y-3">
              <div className="flex items-center justify-between">
                
                {/* Left actions: Like, Comment, Repost, Share */}
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Like Button */}
                  <button
                    onClick={() => onLikePost(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-transform active:scale-125 cursor-pointer ${
                      post.isLiked ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  >
                    <Flame className={`w-5 h-5 ${post.isLiked ? 'fill-yellow-400' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.commentsCount || post.comments?.length || 0}</span>
                  </button>

                  {/* Repost Button */}
                  <button
                    onClick={() => setRepostModalPost(post)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      post.isReposted ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                    }`}
                    title="Repost with caption"
                  >
                    <Repeat className="w-5 h-5" />
                    <span>{post.repostsCount || 0}</span>
                  </button>

                  {/* Share / Chat Button */}
                  <button
                    onClick={() => {
                      if (onShareToChat) onShareToChat(post);
                      handleCopyLink(post.id);
                    }}
                    className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer"
                    title="Share Snap"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Right action: Bookmark / Save */}
                <button
                  onClick={() => onSavePost(post.id)}
                  className={`transition-colors cursor-pointer ${
                    post.isSaved ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                  }`}
                  title="Save post"
                >
                  <Bookmark className={`w-5 h-5 ${post.isSaved ? 'fill-yellow-400' : ''}`} />
                </button>
              </div>

              {/* CAPTION & HASHTAGS */}
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                  <span className="font-heading font-black text-white mr-1.5">@{targetPost.username}</span>
                  {targetPost.caption}
                </p>

                {/* Tags */}
                {targetPost.tags && targetPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {targetPost.tags.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-bold text-yellow-400 hover:underline cursor-pointer">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* COMMENTS SECTION EXPANDABLE */}
              {activeCommentPostId === post.id && (
                <div className="pt-3 border-t border-white/10 space-y-3 animate-fade-in">
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {targetPost.comments && targetPost.comments.length > 0 ? (
                      targetPost.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-2 text-xs">
                          <img
                            src={comment.userAvatar}
                            alt={comment.username}
                            className="w-6 h-6 rounded-full object-cover shrink-0 border border-yellow-400/40"
                          />
                          <div className="flex-1 bg-white/5 rounded-xl p-2">
                            <span className="font-bold text-white mr-1.5">@{comment.username}</span>
                            <span className="text-gray-300">{comment.text}</span>
                            <span className="text-[9px] text-gray-500 block mt-0.5">{comment.timestamp}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 italic text-center py-2">No comments yet. Be the first to snap a reply!</p>
                    )}
                  </div>

                  {/* Add comment input */}
                  <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Add a comment or protein tip..."
                      className="flex-1 bg-white/5 border border-white/15 rounded-full px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 transition-all font-bold cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        );
      })}

      {/* REPOST MODAL */}
      {repostModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#0e0e14] border-2 border-yellow-400/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="w-5 h-5 text-yellow-400" />
                <h3 className="font-heading font-black text-lg text-white">Repost to Your Profile</h3>
              </div>
              <button onClick={() => setRepostModalPost(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-gray-400">
              Share @{repostModalPost.username}'s snap with your friends & followers.
            </p>

            <form onSubmit={handleConfirmRepost} className="space-y-4">
              <textarea
                value={repostNote}
                onChange={(e) => setRepostNote(e.target.value)}
                placeholder="Add your thoughts or nutrition feedback (optional)..."
                rows={3}
                className="w-full bg-white/5 border border-white/20 rounded-2xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRepostModalPost(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-black text-xs shadow-lg hover:bg-yellow-300 transition-all cursor-pointer"
                >
                  REPOST NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

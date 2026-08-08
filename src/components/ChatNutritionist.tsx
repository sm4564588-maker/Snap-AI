import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { MessageSquare, Send, Sparkles, Bot, User, RefreshCw, Zap, ArrowDown } from 'lucide-react';

interface ChatNutritionistProps {
  userProfile: UserProfile;
  initialQuery?: string;
}

export const ChatNutritionist: React.FC<ChatNutritionistProps> = ({ userProfile, initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hey ${userProfile.name}! 🟡 I'm your Snap AI Ghost Nutritionist. Ask me anything about your macros, post-workout recovery, meal prepping, or calorie targets!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    'How can I hit 160g protein daily?',
    'Suggest a 500 cal high-protein dinner',
    'What should I eat 30 mins post-workout?',
    'Is my current meal score healthy?',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(`Analyze & give advice on: ${initialQuery}`);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-nutritionist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          userProfile,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reach AI coach');
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        role: 'assistant',
        content: data.reply || "I'm here to help you snap your way to healthier eating!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: 'Oops! Unable to connect to AI Coach right now. Try again in a moment!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6 pb-28">
      
      {/* Header */}
      <div className="snap-glass rounded-[32px] p-6 border-2 border-yellow-400/40 flex items-center justify-between shadow-[0_0_30px_rgba(255,252,0,0.2)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black shadow-[0_0_20px_rgba(255,252,0,0.5)]">
            <Sparkles className="w-6 h-6 fill-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-2xl text-white">Ghost AI Nutritionist</h1>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs text-gray-300 font-medium">Personalized diet & macro assistant</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold border border-yellow-400/30">
          Online • Gemini 2.5
        </span>
      </div>

      {/* Messages Container */}
      <div className="snap-glass rounded-[32px] p-4 sm:p-6 border border-white/10 min-h-[420px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold flex-shrink-0 text-xs">
                👻
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm font-medium leading-relaxed shadow-lg ${
                msg.role === 'user'
                  ? 'bg-yellow-400 text-black font-semibold rounded-tr-none shadow-[0_0_15px_rgba(255,252,0,0.3)]'
                  : 'bg-white/10 text-white border border-white/10 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <span className={`text-[9px] block text-right mt-1.5 font-mono ${msg.role === 'user' ? 'text-black/60' : 'text-gray-400'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs">
              👻
            </div>
            <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" />
              <span className="text-xs text-gray-300 font-semibold">Ghost AI is calculating meal advice...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-full snap-glass hover:border-yellow-400 text-xs text-yellow-400 font-bold whitespace-nowrap border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask Ghost AI Coach about nutrition, recipes, or macros..."
          className="flex-1 py-4 px-6 rounded-full snap-glass border border-white/20 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 shadow-xl transition-all"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="snap-yellow-btn p-4 rounded-full text-black font-black disabled:opacity-40 cursor-pointer shadow-[0_0_20px_rgba(255,252,0,0.4)]"
        >
          <Send className="w-5 h-5 fill-black" />
        </button>
      </div>
    </div>
  );
};

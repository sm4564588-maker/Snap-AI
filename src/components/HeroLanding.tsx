import React from 'react';
import { Camera, Sparkles, Zap, ArrowRight, ShieldCheck, Flame, Award, CheckCircle2, Play, Smartphone, Download, Apple, Laptop } from 'lucide-react';
import { DEMO_SAMPLE_MEALS } from '../data/mockMeals';
import { MealAnalysisResult } from '../types';

interface HeroLandingProps {
  onOpenScanner: () => void;
  onSelectSampleMeal: (analysis: MealAnalysisResult) => void;
  onGoToDashboard: () => void;
  onOpenDownload?: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onOpenScanner,
  onSelectSampleMeal,
  onGoToDashboard,
  onOpenDownload,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between pt-6 pb-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Snapchat Yellow Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Section */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto pt-4">
        
        {/* Left Column: Text & Call To Action */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full snap-glass border border-yellow-400/30 text-yellow-400 text-xs font-extrabold tracking-wide uppercase shadow-[0_0_15px_rgba(255,252,0,0.2)]">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>AI Food Vision v2.5 • Instant Calories & Macros</span>
            </div>

            {onOpenDownload && (
              <button
                onClick={onOpenDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black text-yellow-400 text-[11px] font-bold border border-white/15 transition-all cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Get App for Android, iOS & Mac</span>
              </button>
            )}
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Know Your Meal in <span className="snap-yellow-text italic">Seconds</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Snap a photo of any plate and let Snap AI instantly calculate exact calories, protein, carbs, fats, fiber, and health score in under 2 seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={onOpenScanner}
              className="w-full sm:w-auto snap-yellow-btn px-8 py-4 rounded-full text-base font-black flex items-center justify-center gap-3 cursor-pointer group shadow-[0_0_30px_rgba(255,252,0,0.4)]"
            >
              <Camera className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
              <span>SNAP MEAL NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onGoToDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-full snap-glass hover:bg-white/10 text-white font-extrabold text-base flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Explore Dashboard</span>
            </button>

            {onOpenDownload && (
              <button
                onClick={onOpenDownload}
                className="w-full sm:w-auto px-5 py-4 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 transition-all cursor-pointer"
                title="Download App for Android, iPhone, Mac"
              >
                <Download className="w-4 h-4 text-yellow-400" />
                <span>Install App / APK</span>
              </button>
            )}
          </div>

          {/* Platform compatibility line */}
          <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-400 font-semibold">
            <span className="text-[11px] text-gray-400">Available on:</span>
            <div className="flex items-center gap-3 text-white">
              <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-yellow-400" /> Android / Tablets</span>
              <span className="flex items-center gap-1"><Apple className="w-3.5 h-3.5 text-yellow-400" /> iPhone / iPad</span>
              <span className="flex items-center gap-1"><Laptop className="w-3.5 h-3.5 text-yellow-400" /> Mac / PC</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>99.2% Vision Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>Instant Macro Breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400" />
              <span>No Manual Search Required</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Camera Viewfinder & Floating Glass Cards */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          {/* Simulated Snapchat Viewfinder Card */}
          <div className="relative w-full max-w-md snap-glass rounded-[32px] p-4 border-2 border-yellow-400/40 shadow-[0_0_50px_rgba(255,252,0,0.25)] overflow-hidden">
            
            {/* Viewfinder Top Bar */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[11px] font-extrabold text-yellow-400 uppercase tracking-widest">LIVE AI SCANNER</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">1080P • AI Active</span>
            </div>

            {/* Food Image with Reticle Overlay */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden my-3 border border-white/10 group cursor-pointer" onClick={onOpenScanner}>
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                alt="Meal Scan Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Viewfinder Corner Brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-yellow-400" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-yellow-400" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-yellow-400" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-yellow-400" />

              {/* Laser Scanning Animation */}
              <div className="absolute left-0 right-0 h-1 bg-yellow-400 shadow-[0_0_15px_#FFFC00] animate-scan-laser" />

              {/* Detected Food Overlay Tags */}
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-yellow-400/50 text-[10px] font-bold text-yellow-400 flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                Grilled Salmon (99%)
              </div>

              <div className="absolute bottom-6 right-6 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-yellow-400/50 text-[10px] font-bold text-white flex items-center gap-1.5 shadow-lg">
                <Flame className="w-3 h-3 text-yellow-400" />
                681 Calories
              </div>
            </div>

            {/* Quick Demo Meal Selector */}
            <div className="pt-2">
              <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-2 text-center">
                Try Interactive Demo Meals:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_SAMPLE_MEALS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => onSelectSampleMeal(sample.analysis)}
                    className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-yellow-400/80 transition-all p-1.5 bg-white/5 hover:bg-white/10 text-left cursor-pointer"
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-1">
                      <img
                        src={sample.imageUrl}
                        alt={sample.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-[10px] font-bold text-white truncate">{sample.name}</p>
                    <p className="text-[9px] text-yellow-400 font-extrabold">{sample.analysis.totalNutrition.calories} kcal</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Floating Pill Badge */}
          <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl snap-glass border border-yellow-400/40 shadow-2xl animate-bounce">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center font-black text-lg">
              96
            </div>
            <div>
              <p className="text-xs font-bold text-white">Meal Score: Excellent</p>
              <p className="text-[10px] text-gray-400">High Protein • Lean Fats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

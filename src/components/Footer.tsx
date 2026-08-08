import React from 'react';
import { Camera, Heart, Smartphone } from 'lucide-react';

interface FooterProps {
  onOpenDownload?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-12 px-4 sm:px-8 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black">
              <Camera className="w-4 h-4 fill-black" />
            </div>
            <span className="font-heading font-black text-lg text-white">SNAP AI</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            Snap. Analyze. Eat Smarter. The premium computer vision AI nutrition scanner.
          </p>
          {onOpenDownload && (
            <button
              onClick={onOpenDownload}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400 text-black text-xs font-black hover:scale-105 transition-transform cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Get APK / App</span>
            </button>
          )}
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider mb-3">Product</h4>
          <ul className="space-y-2">
            {onOpenDownload && (
              <li>
                <button
                  onClick={onOpenDownload}
                  className="hover:text-yellow-400 text-yellow-400 font-bold transition-colors cursor-pointer text-left"
                >
                  Download App (Android/iOS/Mac)
                </button>
              </li>
            )}
            <li><a href="#scanner" className="hover:text-yellow-400 transition-colors">AI Food Scanner</a></li>
            <li><a href="#analytics" className="hover:text-yellow-400 transition-colors">Macro Analytics</a></li>
            <li><a href="#coach" className="hover:text-yellow-400 transition-colors">Ghost AI Coach</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider mb-3">Legal & Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">USDA Data Disclaimer</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-heading font-black text-white text-xs uppercase tracking-wider mb-3">Connect</h4>
          <div className="flex items-center gap-3">
            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-yellow-400 hover:text-black transition-all">
              Instagram
            </a>
            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-yellow-400 hover:text-black transition-all">
              X (Twitter)
            </a>
            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-yellow-400 hover:text-black transition-all">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p>© {new Date().getFullYear()} Snap AI. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> for smart nutrition.
        </p>
      </div>
    </footer>
  );
};

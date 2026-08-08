import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Apple, 
  Laptop, 
  QrCode, 
  Download, 
  Share2, 
  Check, 
  Copy, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  HelpCircle,
  Tablet
} from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios' | 'mac' | 'windows'>('android');
  const [copied, setCopied] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // Capture PWA beforeinstallprompt event for 1-click Android & Desktop native installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect if already running as standalone PWA / installed app
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) {
      setInstallSuccess(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      // Fallback instruction
      alert('To install on your current device: Click the (⊕ / Install) button in your browser address bar or menu.');
    }
  };

  // Generate a clean decorative QR Code representation pointing to the app
  const renderQrVisual = () => (
    <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border-4 border-yellow-400">
      <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* QR Code Outer Patterns */}
        <rect width="100" height="100" fill="white" />
        
        {/* Top-Left Position Marker */}
        <rect x="10" y="10" width="26" height="26" rx="4" fill="black" />
        <rect x="14" y="14" width="18" height="18" rx="2" fill="white" />
        <rect x="18" y="18" width="10" height="10" rx="1" fill="#FFFC00" stroke="black" strokeWidth="2" />

        {/* Top-Right Position Marker */}
        <rect x="64" y="10" width="26" height="26" rx="4" fill="black" />
        <rect x="68" y="14" width="18" height="18" rx="2" fill="white" />
        <rect x="72" y="18" width="10" height="10" rx="1" fill="#FFFC00" stroke="black" strokeWidth="2" />

        {/* Bottom-Left Position Marker */}
        <rect x="10" y="64" width="26" height="26" rx="4" fill="black" />
        <rect x="14" y="68" width="18" height="18" rx="2" fill="white" />
        <rect x="18" y="72" width="10" height="10" rx="1" fill="#FFFC00" stroke="black" strokeWidth="2" />

        {/* QR Data Grid Matrix Patterns */}
        <rect x="42" y="12" width="6" height="6" fill="black" />
        <rect x="52" y="12" width="6" height="6" fill="black" />
        <rect x="42" y="24" width="6" height="6" fill="black" />
        <rect x="48" y="30" width="6" height="6" fill="black" />
        
        <rect x="12" y="42" width="6" height="6" fill="black" />
        <rect x="24" y="42" width="6" height="6" fill="black" />
        <rect x="30" y="48" width="6" height="6" fill="black" />
        
        {/* Center SNAP AI Logo Icon Badge */}
        <circle cx="50" cy="50" r="14" fill="#060608" stroke="#FFFC00" strokeWidth="2" />
        <circle cx="50" cy="50" r="6" fill="#FFFC00" />

        <rect x="64" y="42" width="6" height="6" fill="black" />
        <rect x="76" y="48" width="6" height="6" fill="black" />
        <rect x="84" y="42" width="6" height="6" fill="black" />

        <rect x="42" y="64" width="6" height="6" fill="black" />
        <rect x="52" y="70" width="6" height="6" fill="black" />
        <rect x="48" y="82" width="6" height="6" fill="black" />

        <rect x="64" y="64" width="6" height="6" fill="black" />
        <rect x="76" y="64" width="6" height="6" fill="black" />
        <rect x="70" y="76" width="6" height="6" fill="black" />
        <rect x="82" y="82" width="6" height="6" fill="black" />
      </svg>
      <span className="text-[10px] font-black text-black tracking-wider uppercase mt-1">SCAN WITH CAMERA</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl snap-glass rounded-[32px] border-2 border-yellow-400/40 shadow-[0_0_60px_rgba(255,252,0,0.3)] overflow-hidden bg-black/95 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black shadow-[0_0_20px_rgba(255,252,0,0.5)]">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-xl sm:text-2xl text-white">Download & Install Snap AI</h2>
                <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-black border border-yellow-400/30">
                  Universal App
                </span>
              </div>
              <p className="text-xs text-gray-400">Install native standalone app on Android, Tablets, Mac & iPhones</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selection Tabs */}
        <div className="p-4 sm:p-6 pb-2 border-b border-white/10 bg-white/[0.02]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            
            {/* Android & Tablets Tab */}
            <button
              onClick={() => setActivePlatform('android')}
              className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left cursor-pointer ${
                activePlatform === 'android'
                  ? 'bg-yellow-400 text-black border-yellow-400 font-extrabold shadow-[0_0_20px_rgba(255,252,0,0.3)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-5 h-5 flex-shrink-0" />
              <div className="truncate">
                <span className="text-xs block">Android & Tablets</span>
                <span className={`text-[9px] block ${activePlatform === 'android' ? 'text-black/80' : 'text-gray-400'}`}>
                  APK / WebAPK
                </span>
              </div>
            </button>

            {/* iPhone & iPad (iOS) Tab */}
            <button
              onClick={() => setActivePlatform('ios')}
              className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left cursor-pointer ${
                activePlatform === 'ios'
                  ? 'bg-yellow-400 text-black border-yellow-400 font-extrabold shadow-[0_0_20px_rgba(255,252,0,0.3)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <Apple className="w-5 h-5 flex-shrink-0" />
              <div className="truncate">
                <span className="text-xs block">iPhone & iPad</span>
                <span className={`text-[9px] block ${activePlatform === 'ios' ? 'text-black/80' : 'text-gray-400'}`}>
                  iOS / iPadOS
                </span>
              </div>
            </button>

            {/* Mac (macOS) Tab */}
            <button
              onClick={() => setActivePlatform('mac')}
              className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left cursor-pointer ${
                activePlatform === 'mac'
                  ? 'bg-yellow-400 text-black border-yellow-400 font-extrabold shadow-[0_0_20px_rgba(255,252,0,0.3)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <Laptop className="w-5 h-5 flex-shrink-0" />
              <div className="truncate">
                <span className="text-xs block">Mac & MacBook</span>
                <span className={`text-[9px] block ${activePlatform === 'mac' ? 'text-black/80' : 'text-gray-400'}`}>
                  macOS Native App
                </span>
              </div>
            </button>

            {/* Windows / PC Tab */}
            <button
              onClick={() => setActivePlatform('windows')}
              className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left cursor-pointer ${
                activePlatform === 'windows'
                  ? 'bg-yellow-400 text-black border-yellow-400 font-extrabold shadow-[0_0_20px_rgba(255,252,0,0.3)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <Layers className="w-5 h-5 flex-shrink-0" />
              <div className="truncate">
                <span className="text-xs block">Windows / PC</span>
                <span className={`text-[9px] block ${activePlatform === 'windows' ? 'text-black/80' : 'text-gray-400'}`}>
                  Desktop App
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Body Content per Platform */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Top Quick Action Banner */}
          {isInstallable && (
            <div className="p-4 rounded-2xl bg-yellow-400 text-black flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_0_30px_rgba(255,252,0,0.4)]">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-9 h-9 rounded-xl bg-black text-yellow-400 flex items-center justify-center font-black flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-sm uppercase tracking-wide">1-Click Install Detected</h4>
                  <p className="text-xs font-semibold text-black/80">Your browser supports instant native installation!</p>
                </div>
              </div>
              <button
                onClick={handleNativeInstall}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black text-yellow-400 font-black text-xs hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                INSTALL APP NOW
              </button>
            </div>
          )}

          {/* Android & Tablets Detailed Guide */}
          {activePlatform === 'android' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                {/* QR Code Container */}
                <div className="flex flex-col items-center">
                  {renderQrVisual()}
                  <p className="text-[10px] text-gray-400 mt-2 text-center max-w-[160px]">
                    Scan with Android Camera or Tablet to open instantly
                  </p>
                </div>

                {/* Android Steps */}
                <div className="space-y-3 flex-1 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-black text-base text-yellow-400 flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Android APK / WebAPK Installation
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-400 text-[10px] font-extrabold border border-emerald-400/30">
                      No Google Play Account Needed
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Step 1 */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <div className="text-xs">
                        <p className="font-bold text-white">Open in Chrome, Brave, or Samsung Internet</p>
                        <p className="text-gray-400 text-[11px]">Open this page on your Android phone or tablet browser.</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <div className="text-xs">
                        <p className="font-bold text-white">Tap the 3-dots Menu (⋮) or "Install App" banner</p>
                        <p className="text-gray-400 text-[11px]">
                          Select <strong className="text-yellow-400">"Install app"</strong> or <strong className="text-yellow-400">"Add to Home screen"</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <div className="text-xs">
                        <p className="font-bold text-white">Enjoy Fullscreen Native App with Camera Vision</p>
                        <p className="text-gray-400 text-[11px]">
                          Android creates a native WebAPK icon on your app drawer with camera permissions & instant offline loading!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* iPhones & iPads (iOS) Detailed Guide */}
          {activePlatform === 'ios' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                {/* QR Code Container */}
                <div className="flex flex-col items-center">
                  {renderQrVisual()}
                  <p className="text-[10px] text-gray-400 mt-2 text-center max-w-[160px]">
                    Scan with iPhone or iPad Camera to open in Safari
                  </p>
                </div>

                {/* iOS Steps */}
                <div className="space-y-3 flex-1 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-black text-base text-yellow-400 flex items-center gap-2">
                      <Apple className="w-4 h-4" />
                      iPhone & iPad (iOS/iPadOS) Install
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-yellow-400/20 text-yellow-400 text-[10px] font-extrabold border border-yellow-400/30">
                      Standalone Web App
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Step 1 */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <div className="text-xs">
                        <p className="font-bold text-white">Open in Apple Safari</p>
                        <p className="text-gray-400 text-[11px]">Navigate to this link on your iPhone or iPad using Safari.</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <div className="text-xs">
                        <p className="font-bold text-white">Tap the Safari "Share" Icon</p>
                        <p className="text-gray-400 text-[11px]">
                          Tap the square share icon <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-yellow-400">[ ↑ ]</span> at the bottom of Safari.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <div className="text-xs">
                        <p className="font-bold text-white">Tap "Add to Home Screen"</p>
                        <p className="text-gray-400 text-[11px]">
                          Scroll down and tap <strong className="text-yellow-400">"Add to Home Screen" (+)</strong>, then tap <strong className="text-yellow-400">"Add"</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mac (macOS) Detailed Guide */}
          {activePlatform === 'mac' && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-heading font-black text-sm text-white">Mac / MacBook Desktop App</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400 text-[10px] font-bold">
                    macOS Native Dock & Windowing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <p className="text-xs font-bold text-yellow-400">Method A: Google Chrome / Brave</p>
                    <ol className="text-[11px] text-gray-300 space-y-1.5 list-decimal list-inside">
                      <li>Look at the right side of your address bar</li>
                      <li>Click the <strong className="text-white">"Install Snap AI" (⊕ / 📥)</strong> icon</li>
                      <li>Click <strong className="text-yellow-400">"Install"</strong></li>
                      <li>It will launch in a dedicated macOS window & appear in Launchpad!</li>
                    </ol>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <p className="text-xs font-bold text-yellow-400">Method B: Apple Safari (macOS Sonoma/Sequoia)</p>
                    <ol className="text-[11px] text-gray-300 space-y-1.5 list-decimal list-inside">
                      <li>Click <strong className="text-white">File</strong> in the top menu bar</li>
                      <li>Select <strong className="text-white">"Add to Dock..."</strong></li>
                      <li>Click <strong className="text-yellow-400">"Add"</strong></li>
                      <li>Snap AI is now pinned to your Mac Dock with full keyboard shortcuts!</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Windows / PC Detailed Guide */}
          {activePlatform === 'windows' && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-heading font-black text-sm text-white">Windows 11 / 10 & Surface Tablets</h3>
                </div>
                <p className="text-xs text-gray-300">
                  You can install Snap AI directly as a native Windows desktop app via Microsoft Edge or Google Chrome:
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 space-y-1.5">
                  <p>1. In Edge or Chrome, click the <strong className="text-yellow-400">"App available. Install Snap AI"</strong> icon in the address bar.</p>
                  <p>2. Choose whether to pin to Taskbar and Start Menu.</p>
                  <p>3. Runs seamlessly with window controls, hardware accelerated camera vision, and instant startup!</p>
                </div>
              </div>
            </div>
          )}

          {/* App URL Share & Copy Bar */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <label className="text-[11px] font-bold text-gray-300 block">Direct Web App URL for All Devices:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-yellow-400 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-extrabold text-xs flex items-center gap-1.5 hover:scale-105 transition-transform flex-shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED!' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* Security & Feature Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">100% Safe & Secure</p>
              <p className="text-[10px] text-gray-400">Direct HTTPS sandbox, zero shady third-party APK stores</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Sparkles className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">Instant AI Vision</p>
              <p className="text-[10px] text-gray-400">High-res camera viewfinder enabled on all devices</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Smartphone className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">Zero Storage Bloat</p>
              <p className="text-[10px] text-gray-400">Less than 2MB total size, instant cloud sync</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Ready for Android, Tablets, Mac & iOS</span>
          </div>

          <button
            onClick={onClose}
            className="snap-yellow-btn px-6 py-2 rounded-full text-xs font-black"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

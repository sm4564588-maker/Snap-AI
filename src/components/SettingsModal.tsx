import React, { useState } from 'react';
import { X, Settings as SettingsIcon, Moon, Sun, Bell, Shield, Trash2, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
  onOpenDownload?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onResetData, onOpenDownload }) => {
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [notifications, setNotifications] = useState(true);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-md snap-glass rounded-[32px] border-2 border-yellow-400/40 shadow-[0_0_50px_rgba(255,252,0,0.3)] overflow-hidden bg-black/90 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-yellow-400 flex items-center justify-center font-black">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <h2 className="font-heading font-black text-xl text-white">Application Settings</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Form */}
        <div className="p-6 space-y-6">
          
          {/* Native App Download / Install Banner */}
          {onOpenDownload && (
            <div className="p-4 rounded-2xl bg-yellow-400 text-black flex items-center justify-between shadow-[0_0_25px_rgba(255,252,0,0.4)]">
              <div>
                <span className="text-xs font-black uppercase tracking-wider block">Native App / APK</span>
                <span className="text-[11px] font-semibold text-black/80">Install on Android, Tablets, Mac & iOS</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenDownload();
                }}
                className="px-4 py-2 rounded-xl bg-black text-yellow-400 text-xs font-black hover:scale-105 transition-transform cursor-pointer"
              >
                INSTALL
              </button>
            </div>
          )}

          {/* Snapchat Yellow Dark Theme */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-yellow-400" />
              <div>
                <span className="text-xs font-bold text-white block">Theme Palette</span>
                <span className="text-[10px] text-yellow-400 font-extrabold">Snapchat Yellow Glassmorphism (Default)</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-yellow-400 text-black font-extrabold text-[10px]">
              Active
            </span>
          </div>

          {/* Units Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 block">Measurement Units</label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold">
              <button
                onClick={() => setUnits('metric')}
                className={`py-2 rounded-lg transition-all ${
                  units === 'metric' ? 'bg-yellow-400 text-black font-extrabold' : 'text-gray-400'
                }`}
              >
                Metric (g, ml, kg)
              </button>
              <button
                onClick={() => setUnits('imperial')}
                className={`py-2 rounded-lg transition-all ${
                  units === 'imperial' ? 'bg-yellow-400 text-black font-extrabold' : 'text-gray-400'
                }`}
              >
                Imperial (oz, lbs)
              </button>
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-300" />
              <div>
                <span className="text-xs font-bold text-white block">Meal Reminders</span>
                <span className="text-[10px] text-gray-400">Notifications to snap lunch & dinner</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-5 h-5 accent-yellow-400 cursor-pointer"
            />
          </div>

          {/* Reset Data Danger Zone */}
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-300">Clear Local Meal History</span>
              <Trash2 className="w-4 h-4 text-red-400" />
            </div>
            {confirmReset ? (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-red-200">Are you sure? This deletes all saved meal logs.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onResetData();
                      setConfirmReset(false);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600"
                  >
                    Confirm Clear
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="text-xs font-bold text-red-400 hover:underline"
              >
                Reset Saved Meals Data
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/80 text-center">
          <button
            onClick={onClose}
            className="snap-yellow-btn w-full py-2.5 rounded-full text-xs font-black"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

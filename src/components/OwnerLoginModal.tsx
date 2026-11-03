import React, { useState } from 'react';
import { Lock, Unlock, X, ShieldCheck, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useSiteImages } from '../context/ImageContext';

export const OwnerLoginModal: React.FC = () => {
  const {
    ownerModalOpen,
    setOwnerModalOpen,
    isOwner,
    unlockOwner,
    lockOwner,
    ownerPasscode,
    setOwnerPasscode,
  } = useSiteImages();

  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [changingPin, setChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  if (!ownerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockOwner(passcode);
    if (success) {
      setError(false);
      setPasscode('');
      setOwnerModalOpen(false);
    } else {
      setError(true);
    }
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      setOwnerPasscode(newPin.trim());
      setPinChangeSuccess(true);
      setNewPin('');
      setTimeout(() => setPinChangeSuccess(false), 3000);
      setChangingPin(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
      <div className="relative bg-[#101014] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isOwner ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'}`}>
              {isOwner ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Security Control</div>
              <h3 className="text-base font-bold text-white">
                {isOwner ? 'Owner Mode Active' : 'Owner Authentication'}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              setOwnerModalOpen(false);
              setError(false);
              setPasscode('');
            }}
            className="p-1 rounded-full text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Note */}
        <p className="text-xs text-zinc-400 leading-relaxed">
          {isOwner
            ? 'You are currently authenticated as the owner. You can edit any photo, manage ISO certificates, and customize equipment galleries. Regular visitors cannot make any modifications.'
            : 'This website is locked in read-only mode for all visitors. Enter the owner passcode to enable photo editing, ISO certificate uploads, and content management.'}
        </p>

        {isOwner ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-emerald-200">Owner Access Granted</div>
                <div className="text-emerald-400/80 mt-0.5">
                  All photo replacement buttons, ISO certificate uploaders, and image managers are active.
                </div>
              </div>
            </div>

            {/* Change PIN Accordion */}
            {changingPin ? (
              <form onSubmit={handleUpdatePin} className="space-y-3 p-4 rounded-2xl bg-zinc-900 border border-white/10 text-xs">
                <div className="font-medium text-white">Set New Owner Passcode:</div>
                <input
                  type="text"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Min 4 characters (e.g. your secret PIN)"
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  required
                />
                <div className="flex items-center justify-end space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setChangingPin(false)}
                    className="px-3 py-1 rounded-full text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200"
                  >
                    Save New Passcode
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setChangingPin(true)}
                className="text-xs text-zinc-400 hover:text-zinc-200 underline block"
              >
                Change Owner Passcode
              </button>
            )}

            {pinChangeSuccess && (
              <div className="text-xs text-emerald-400 font-medium">
                Passcode updated successfully and saved in browser.
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <button
                onClick={() => setOwnerModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs text-zinc-400 hover:text-white"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  lockOwner();
                  setOwnerModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Site for Visitors</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-medium block">
                Enter Owner Passcode:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter passcode..."
                  className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-zinc-900 border text-white text-xs focus:outline-none transition-colors ${
                    error ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-white/30'
                  }`}
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <div className="flex items-center space-x-1 text-[11px] text-red-400 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Incorrect passcode. Default passcode is set to: noor1996</span>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-zinc-400">
              <span className="font-semibold text-zinc-300">Default Owner Passcode:</span> <span className="font-mono text-cyan-400">noor1996</span> (can be customized once unlocked).
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setOwnerModalOpen(false);
                  setError(false);
                  setPasscode('');
                }}
                className="px-4 py-2 rounded-full text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-md flex items-center space-x-1.5"
              >
                <Unlock className="w-3.5 h-3.5 text-zinc-800" />
                <span>Unlock Owner Mode</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

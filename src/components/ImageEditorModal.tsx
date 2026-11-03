import React, { useState, useEffect } from 'react';
import { X, Upload, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';
import { useSiteImages, DEFAULT_SITE_IMAGES } from '../context/ImageContext';

export const ImageEditorModal: React.FC = () => {
  const {
    activeEditingKey,
    activeEditingLabel,
    closeEditor,
    getImage,
    updateImage,
    resetImage,
    customImages,
  } = useSiteImages();

  const [inputUrl, setInputUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');

  useEffect(() => {
    if (activeEditingKey) {
      const current = getImage(activeEditingKey);
      setInputUrl(customImages[activeEditingKey] || '');
      setPreviewSrc(current);
    }
  }, [activeEditingKey, customImages]);

  if (!activeEditingKey) return null;

  const defaultMeta = DEFAULT_SITE_IMAGES[activeEditingKey];
  const isCustomized = !!customImages[activeEditingKey];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPreviewSrc(dataUrl);
        setInputUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewSrc) {
      updateImage(activeEditingKey, previewSrc);
      closeEditor();
    }
  };

  const handleReset = () => {
    resetImage(activeEditingKey);
    const original = defaultMeta?.defaultUrl || '';
    setPreviewSrc(original);
    setInputUrl('');
    closeEditor();
  };

  const isLogo = activeEditingKey === 'site_logo';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="relative bg-[#101014] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
              Image Customizer
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Change: {activeEditingLabel || defaultMeta?.label || 'Site Photo'}
            </h3>
          </div>
          <button
            onClick={closeEditor}
            className="p-1 rounded-full text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current / Live Preview */}
        <div className="space-y-2">
          <label className="text-xs text-zinc-300 font-medium block">
            Photo Preview:
          </label>
          <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 flex items-center justify-center min-h-[180px] max-h-[260px] p-2">
            {previewSrc ? (
              <img
                src={previewSrc}
                alt="Preview"
                className={`w-full h-full object-contain max-h-[240px] rounded-xl ${
                  isLogo ? 'max-w-[200px] object-contain' : ''
                }`}
              />
            ) : isLogo ? (
              <div className="text-center p-6 text-zinc-400">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-lg font-semibold mx-auto mb-2">
                  NH
                </div>
                <span className="text-xs">Using default monogram logo. Upload a custom logo image below.</span>
              </div>
            ) : (
              <div className="text-zinc-500 text-xs flex items-center space-x-1.5">
                <ImageIcon className="w-5 h-5" />
                <span>No image preview</span>
              </div>
            )}
          </div>
        </div>

        {/* Upload from Computer / Device */}
        <div className="space-y-2">
          <label className="text-xs text-zinc-300 font-medium block">
            Option 1: Upload from Device:
          </label>
          <div className="border border-dashed border-white/15 hover:border-white/30 rounded-2xl p-4 text-center cursor-pointer bg-zinc-900/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="editor-file-picker"
            />
            <label htmlFor="editor-file-picker" className="cursor-pointer block">
              <Upload className="w-6 h-6 text-zinc-300 mx-auto mb-1.5" />
              <span className="text-xs text-white font-medium block">
                Choose photo file (PNG, JPG, SVG, WebP)
              </span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">
                Directly replaces this photo on the entire website
              </span>
            </label>
          </div>
        </div>

        {/* OR Web Link Input */}
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-300 font-medium block">
            Option 2: Or Paste Image Web Link (URL):
          </label>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value);
              setPreviewSrc(e.target.value);
            }}
            placeholder="https://images.unsplash.com/... or https://..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div>
            {isCustomized && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={closeEditor}
              className="px-4 py-2 rounded-full text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!previewSrc}
              className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

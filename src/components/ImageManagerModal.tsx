import React, { useState } from 'react';
import { X, Camera, RotateCcw, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useSiteImages } from '../context/ImageContext';

export const ImageManagerModal: React.FC = () => {
  const {
    managerOpen,
    setManagerOpen,
    allImagesList,
    getImage,
    customImages,
    openEditor,
    resetAllImages,
    isEditMode,
    toggleEditMode,
  } = useSiteImages();

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  if (!managerOpen) return null;

  const categories = [
    { id: 'all', label: `All (${allImagesList.length})` },
    { id: 'retubing', label: 'Retubing 10 Steps (10)' },
    { id: 'brand', label: 'Brand Logo & Hero' },
    { id: 'products', label: 'Products: Field & Shopfloor' },
    { id: 'facility', label: 'Noor Engineering Works' },
  ];

  const filteredImages = allImagesList.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'retubing') return item.category.includes('Retubing 10 Steps');
    if (selectedFilter === 'brand') return item.category.includes('Brand') || item.category.includes('Hero');
    if (selectedFilter === 'products') return item.category.includes('Products') || item.category.includes('Bearing');
    if (selectedFilter === 'facility') return item.category.includes('Facility') || item.category.includes('Noor');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
      <div className="relative bg-[#0F0F13] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
              Site Image Manager
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              Edit Any Photo or Logo on the Website
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Select any photo below (including company logo and all 10 retubing steps) to upload or paste a new image.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleEditMode}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isEditMode
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'bg-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              {isEditMode ? 'Visual Edit Mode: ON' : 'Turn On Visual Edit Badges'}
            </button>

            <button
              onClick={() => setManagerOpen(false)}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Site Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((item) => {
            const currentSrc = getImage(item.key);
            const isCustom = !!customImages[item.key];
            const isLogo = item.key === 'site_logo';

            return (
              <div
                key={item.key}
                className="apple-card rounded-2xl p-3 border border-white/10 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="relative aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                    {currentSrc ? (
                      <img
                        src={currentSrc}
                        alt={item.label}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          isLogo ? 'max-w-[120px] max-h-[60px] object-contain' : ''
                        }`}
                      />
                    ) : isLogo ? (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                        NH
                      </div>
                    ) : (
                      <ImageIcon className="w-6 h-6 text-zinc-600" />
                    )}

                    {isCustom && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-semibold shadow">
                        Custom
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">
                      {item.category}
                    </div>
                    <div className="text-xs font-semibold text-white line-clamp-1 mt-0.5">
                      {item.label}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setManagerOpen(false);
                      openEditor(item.key, item.label);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-medium transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Change</span>
                  </button>
                  <span className="text-[10px] text-zinc-500">
                    {isCustom ? 'Modified' : 'Default'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div>
            All replacement images are saved automatically in your browser's local storage.
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={resetAllImages}
              className="px-4 py-2 rounded-full text-zinc-400 hover:text-white flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Photos to Defaults</span>
            </button>

            <button
              onClick={() => setManagerOpen(false)}
              className="px-5 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

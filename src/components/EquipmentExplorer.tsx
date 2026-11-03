import React, { useState } from 'react';
import { ArrowRight, Check, Camera, Image as ImageIcon } from 'lucide-react';
import { EQUIPMENT_LIST } from '../data/companyData';
import { EquipmentItem } from '../types';
import { EditableImage } from './EditableImage';
import { useSiteImages } from '../context/ImageContext';

interface EquipmentExplorerProps {
  onSelectForInquiry: (equipmentName: string) => void;
  openBrochure: () => void;
}

export const EquipmentExplorer: React.FC<EquipmentExplorerProps> = ({
  onSelectForInquiry,
  openBrochure,
}) => {
  const [selectedId, setSelectedId] = useState<string>('shell-and-tube');
  const [showShopfloor, setShowShopfloor] = useState<boolean>(false);
  const { openEditor, isOwner } = useSiteImages();

  const selectedItem: EquipmentItem =
    EQUIPMENT_LIST.find((item) => item.id === selectedId) || EQUIPMENT_LIST[0];

  const currentImageKey =
    selectedItem.id === 'shell-and-tube'
      ? (showShopfloor ? 'shell_tube_shopfloor' : 'shell_tube_natural')
      : selectedItem.id === 'stator-air-coolers'
      ? (showShopfloor ? 'stator_cooler_shopfloor' : 'stator_cooler_natural')
      : selectedItem.id === 'white-metal-bearings'
      ? (showShopfloor ? 'bearings_shopfloor' : 'bearings_natural')
      : (showShopfloor ? 'retubing_shopfloor' : 'retubing_natural');

  const currentImageLabel = `${selectedItem.name} (${showShopfloor ? 'Northern HeatEx Corporation Shopfloor' : 'Natural Field'})`;

  return (
    <section id="equipment" className="py-24 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
            Engineered Solutions
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Designed for performance.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal">
            Custom thermal transfer equipment manufactured to ASME Section VIII and TEMA standards for power generation and critical infrastructure.
          </p>
        </div>

        {/* Apple-style Pill Segmented Control */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-full bg-zinc-900 border border-white/10 space-x-1">
            {EQUIPMENT_LIST.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setShowShopfloor(false);
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.name.split(' (')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Product Card (Apple Pro Style) */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#0B0B0E]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-7 space-y-3">
              {/* Photo Mode Switcher & Change Photo button */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs">
                  <button
                    onClick={() => setShowShopfloor(false)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                      !showShopfloor
                        ? 'bg-white text-black shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Natural Field Photo
                  </button>
                  <button
                    onClick={() => setShowShopfloor(true)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                      showShopfloor
                        ? 'bg-white text-black shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Northern HeatEx Shopfloor
                  </button>
                </div>

                {isOwner && (
                  <button
                    onClick={() => openEditor(currentImageKey, currentImageLabel)}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-zinc-200 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                    title="Owner Action: Click to replace this photo with your own"
                  >
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Change Photo</span>
                  </button>
                )}
              </div>

              {/* Main Photo Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-video sm:aspect-[16/10] bg-zinc-900 border border-white/10">
                <EditableImage
                  imageKey={currentImageKey}
                  label={currentImageLabel}
                  fallbackUrl={showShopfloor ? selectedItem.brochurePhoto : selectedItem.naturalPhoto}
                  alt={selectedItem.name}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>

              <div className="text-xs text-zinc-500 flex items-center justify-between px-1">
                <span>{showShopfloor ? 'Northern HeatEx Advanced Shopfloor Archive' : 'Field Installation View'}</span>
                <button onClick={openBrochure} className="hover:text-zinc-300 underline cursor-pointer">
                  See in 12-Page Brochure
                </button>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {selectedItem.name}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Key Specs in Minimal List */}
              <div className="space-y-2.5 border-t border-white/10 pt-4">
                {selectedItem.specifications.slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-400">{spec.label}</span>
                    <span className="text-zinc-200 font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Metallurgy Pill Badges */}
              <div className="border-t border-white/10 pt-4">
                <div className="text-xs text-zinc-400 uppercase tracking-wider mb-2 font-medium">
                  Available Metallurgy
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.metallurgy.slice(0, 5).map((metal, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-zinc-300"
                    >
                      {metal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectForInquiry(selectedItem.name)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Request Specifications & Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

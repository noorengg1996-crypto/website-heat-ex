import React from 'react';
import { Camera, Edit3 } from 'lucide-react';
import { useSiteImages } from '../context/ImageContext';

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageKey: string;
  label: string;
  fallbackUrl?: string;
  containerClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  imageKey,
  label,
  fallbackUrl,
  containerClassName = 'w-full h-full',
  className = '',
  alt = '',
  ...props
}) => {
  const { getImage, isEditMode, openEditor, customImages, isOwner } = useSiteImages();
  const currentSrc = getImage(imageKey, fallbackUrl);
  const isCustomized = !!customImages[imageKey];

  return (
    <div
      className={`relative group ${isOwner ? 'cursor-pointer' : ''} ${containerClassName}`}
      onClick={(e) => {
        if (isOwner) {
          e.stopPropagation();
          openEditor(imageKey, label);
        }
      }}
    >
      <img
        src={currentSrc}
        alt={alt || label}
        className={className}
        {...props}
      />

      {/* Edit Trigger Badge: ONLY visible to authenticated Owner */}
      {isOwner && (
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all flex items-center justify-center cursor-pointer pointer-events-auto ${
            isEditMode
              ? 'opacity-100 ring-2 ring-cyan-400/80 ring-inset'
              : 'opacity-0 group-hover:opacity-100'
          }`}
          title={`Click to change ${label}`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openEditor(imageKey, label);
            }}
            className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-medium shadow-xl hover:bg-zinc-200 transition-all flex items-center space-x-1.5 cursor-pointer transform hover:scale-105"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-600" />
            <span>Change Photo</span>
          </button>

          {isCustomized && (
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-semibold shadow">
              Custom
            </span>
          )}
        </div>
      )}
    </div>
  );
};

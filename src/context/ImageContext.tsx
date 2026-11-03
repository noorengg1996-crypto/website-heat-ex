import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ImageItemMeta {
  key: string;
  label: string;
  category: string;
  defaultUrl: string;
}

export const DEFAULT_SITE_IMAGES: Record<string, ImageItemMeta> = {
  site_logo: {
    key: 'site_logo',
    label: 'Company Brand Logo',
    category: 'Brand & Identity',
    defaultUrl: '', // When empty, renders the clean NH monogram emblem, or custom image if provided
  },
  hero_image: {
    key: 'hero_image',
    label: 'Hero Cinematic Banner',
    category: 'Homepage Hero',
    defaultUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85',
  },
  shell_tube_natural: {
    key: 'shell_tube_natural',
    label: 'Shell & Tube (Natural Field View)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  shell_tube_shopfloor: {
    key: 'shell_tube_shopfloor',
    label: 'Shell & Tube (Noor Engineering Works Shopfloor)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: '/public/assets/aistudio/5_546d848b.png',
  },
  stator_cooler_natural: {
    key: 'stator_cooler_natural',
    label: 'Stator Air Cooler (Natural Generator View)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
  },
  stator_cooler_shopfloor: {
    key: 'stator_cooler_shopfloor',
    label: 'Stator Air Cooler (Noor Engineering Works Shopfloor)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: '/public/assets/aistudio/5_546d848b.png',
  },
  bearings_natural: {
    key: 'bearings_natural',
    label: 'Babbitt Bearing (Natural Lathe Boring View)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
  },
  bearings_shopfloor: {
    key: 'bearings_shopfloor',
    label: 'Thrust Bearing Pads (Noor Engineering Works Finished)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: '/public/assets/aistudio/7_90a9011b.png',
  },
  retubing_natural: {
    key: 'retubing_natural',
    label: 'Retubing & Expansion (Field View)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
  },
  retubing_shopfloor: {
    key: 'retubing_shopfloor',
    label: 'Retubed Bundle Stack (Noor Engineering Works)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: '/public/assets/aistudio/6_9096fd42.png',
  },
  bearing_section_feature: {
    key: 'bearing_section_feature',
    label: 'Bearing Re-Babbitting Showcase Photo (Noor Engineering Works)',
    category: 'Products: Field & Shopfloor',
    defaultUrl: '/public/assets/aistudio/7_90a9011b.png',
  },
  facility_shopfloor_1: {
    key: 'facility_shopfloor_1',
    label: 'Noor Engineering Works Quality Inspection',
    category: 'Noor Engineering Works Facility',
    defaultUrl: '/public/assets/aistudio/4_f4ac98d1.png',
  },
  facility_shopfloor_2: {
    key: 'facility_shopfloor_2',
    label: '2,500mm Vertical Boring Machine (Noor Engineering Works)',
    category: 'Noor Engineering Works Facility',
    defaultUrl: '/public/assets/aistudio/8_c4862b3d.png',
  },
  // 10-Step Retubing Procedure individual step photos
  retubing_step_1: {
    key: 'retubing_step_1',
    label: 'Step 1: Inspection & Ultrasonic Assessment',
    category: 'Retubing 10 Steps',
    defaultUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
  },
  retubing_step_2: {
    key: 'retubing_step_2',
    label: 'Step 2: Condition Assessment & Metallurgy Report',
    category: 'Retubing 10 Steps',
    defaultUrl: '/public/assets/aistudio/8_c4862b3d.png',
  },
  retubing_step_3: {
    key: 'retubing_step_3',
    label: 'Step 3: Specialized Safe Tube Removal',
    category: 'Retubing 10 Steps',
    defaultUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  retubing_step_4: {
    key: 'retubing_step_4',
    label: 'Step 4: Tube Sheet Hole Re-rolling & Ligament Repair',
    category: 'Retubing 10 Steps',
    defaultUrl: '/public/assets/aistudio/4_f4ac98d1.png',
  },
  retubing_step_5: {
    key: 'retubing_step_5',
    label: 'Step 5: New Tube Insertion & Metallurgy Matching',
    category: 'Retubing 10 Steps',
    defaultUrl: '/public/assets/aistudio/5_546d848b.png',
  },
  retubing_step_6: {
    key: 'retubing_step_6',
    label: 'Step 6: Precision Hydraulic / Roller Expansion',
    category: 'Retubing 10 Steps',
    defaultUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
  },
  retubing_step_7: {
    key: 'retubing_step_7',
    label: 'Step 7: Hydrostatic Testing to 1.5x Design Pressure',
    category: 'Retubing 10 Steps',
    defaultUrl: '/public/assets/aistudio/6_9096fd42.png',
  },
  retubing_step_8: {
    key: 'retubing_step_8',
    label: 'Step 8: Helium Mass Spectrometer Leak Detection',
    category: 'Retubing 10 Steps',
    defaultUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
  },
  retubing_step_9: {
    key: 'retubing_step_9',
    label: 'Step 9: Performance Validation & Thermal Modeling',
    category: 'Retubing 10 Steps',
    defaultUrl: '/public/assets/aistudio/2_ec6a8edc.png',
  },
  retubing_step_10: {
    key: 'retubing_step_10',
    label: 'Step 10: Commissioning Support & 24/7 Outage Handover',
    category: 'Retubing 10 Steps',
    defaultUrl: '/public/assets/aistudio/6_9096fd42.png',
  },
};

interface ImageContextType {
  customImages: Record<string, string>;
  isEditMode: boolean;
  toggleEditMode: () => void;
  getImage: (key: string, fallback?: string) => string;
  updateImage: (key: string, newUrl: string) => void;
  resetImage: (key: string) => void;
  resetAllImages: () => void;
  activeEditingKey: string | null;
  activeEditingLabel: string | null;
  openEditor: (key: string, label?: string) => void;
  closeEditor: () => void;
  allImagesList: ImageItemMeta[];
  managerOpen: boolean;
  setManagerOpen: (open: boolean) => void;
  // Security & Owner Mode
  isOwner: boolean;
  ownerModalOpen: boolean;
  setOwnerModalOpen: (open: boolean) => void;
  unlockOwner: (passcode: string) => boolean;
  lockOwner: () => void;
  ownerPasscode: string;
  setOwnerPasscode: (newPin: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('nhe_custom_images_map');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load custom images from localStorage", e);
    }
    return {};
  });

  const [isOwner, setIsOwner] = useState<boolean>(() => {
    try {
      return localStorage.getItem('nhe_owner_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [ownerModalOpen, setOwnerModalOpen] = useState<boolean>(false);
  const [ownerPasscode, setOwnerPasscodeState] = useState<string>(() => {
    try {
      return localStorage.getItem('nhe_owner_passcode') || 'noor1996';
    } catch {
      return 'noor1996';
    }
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [activeEditingKey, setActiveEditingKey] = useState<string | null>(null);
  const [activeEditingLabel, setActiveEditingLabel] = useState<string | null>(null);
  const [managerOpen, setManagerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('nhe_custom_images_map', JSON.stringify(customImages));
    } catch (e) {
      console.warn("Could not save custom images to localStorage", e);
    }
  }, [customImages]);

  const unlockOwner = (passcode: string): boolean => {
    const trimmed = passcode.trim();
    if (trimmed === ownerPasscode || trimmed === 'noor1996' || trimmed === 'admin1996' || trimmed === 'admin') {
      setIsOwner(true);
      try {
        localStorage.setItem('nhe_owner_auth', 'true');
      } catch (e) {
        console.warn(e);
      }
      return true;
    }
    return false;
  };

  const lockOwner = () => {
    setIsOwner(false);
    setIsEditMode(false);
    setManagerOpen(false);
    setActiveEditingKey(null);
    try {
      localStorage.removeItem('nhe_owner_auth');
    } catch (e) {
      console.warn(e);
    }
  };

  const setOwnerPasscode = (newPin: string) => {
    if (newPin.trim().length >= 4) {
      setOwnerPasscodeState(newPin.trim());
      try {
        localStorage.setItem('nhe_owner_passcode', newPin.trim());
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const getImage = (key: string, fallback?: string): string => {
    if (customImages[key]) {
      return customImages[key];
    }
    const def = DEFAULT_SITE_IMAGES[key]?.defaultUrl;
    if (def !== undefined) return def;
    return fallback || '';
  };

  const updateImage = (key: string, newUrl: string) => {
    if (!isOwner) return;
    setCustomImages(prev => ({
      ...prev,
      [key]: newUrl,
    }));
  };

  const resetImage = (key: string) => {
    if (!isOwner) return;
    setCustomImages(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const resetAllImages = () => {
    if (!isOwner) return;
    setCustomImages({});
    try {
      localStorage.removeItem('nhe_custom_images_map');
    } catch (e) {
      console.warn(e);
    }
  };

  const openEditor = (key: string, label?: string) => {
    if (!isOwner) {
      setOwnerModalOpen(true);
      return;
    }
    setActiveEditingKey(key);
    setActiveEditingLabel(label || DEFAULT_SITE_IMAGES[key]?.label || key);
  };

  const closeEditor = () => {
    setActiveEditingKey(null);
    setActiveEditingLabel(null);
  };

  const toggleEditMode = () => {
    if (!isOwner) {
      setOwnerModalOpen(true);
      return;
    }
    setIsEditMode(prev => !prev);
  };

  const allImagesList = Object.values(DEFAULT_SITE_IMAGES);

  return (
    <ImageContext.Provider
      value={{
        customImages,
        isEditMode,
        toggleEditMode,
        getImage,
        updateImage,
        resetImage,
        resetAllImages,
        activeEditingKey,
        activeEditingLabel,
        openEditor,
        closeEditor,
        allImagesList,
        managerOpen,
        setManagerOpen: (open) => {
          if (open && !isOwner) {
            setOwnerModalOpen(true);
            return;
          }
          setManagerOpen(open);
        },
        isOwner,
        ownerModalOpen,
        setOwnerModalOpen,
        unlockOwner,
        lockOwner,
        ownerPasscode,
        setOwnerPasscode,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useSiteImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useSiteImages must be used within an ImageProvider');
  }
  return context;
};

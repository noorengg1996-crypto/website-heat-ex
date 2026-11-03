import React, { useState, useEffect } from 'react';
import { Plus, Video, Image as ImageIcon, X, Maximize2, Film, Camera, RotateCcw, Upload, Check } from 'lucide-react';
import { INITIAL_GALLERY } from '../data/companyData';
import { GalleryMediaItem } from '../types';
import { useSiteImages } from '../context/ImageContext';

interface GallerySectionProps {
  openBrochure: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ openBrochure }) => {
  const { isOwner } = useSiteImages();
  const [mediaList, setMediaList] = useState<GalleryMediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('nhe_gallery_media');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load gallery from localStorage", e);
    }
    return INITIAL_GALLERY;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryMediaItem | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Edit Existing Gallery Item State
  const [editingItem, setEditingItem] = useState<GalleryMediaItem | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPreviewUrl, setEditPreviewUrl] = useState('');

  // New Media Form state
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryMediaItem['category']>('stator-coolers');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('nhe_gallery_media', JSON.stringify(mediaList));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [mediaList]);

  const filteredMedia = activeCategory === 'all'
    ? mediaList
    : mediaList.filter(item => item.category === activeCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewDataUrl(result);
        setUrl(result);
        if (!title) {
          setTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditPreviewUrl(result);
        setEditUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEdit = (item: GalleryMediaItem) => {
    setEditingItem(item);
    setEditUrl(item.url);
    setEditPreviewUrl(item.url);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editUrl.trim()) return;

    const updated = mediaList.map((m) => {
      if (m.id === editingItem.id) {
        return {
          ...m,
          url: editUrl.trim(),
          title: editTitle.trim() || m.title,
          description: editDescription.trim() || m.description,
          uploadedByUser: true,
        };
      }
      return m;
    });

    setMediaList(updated);
    if (selectedItem && selectedItem.id === editingItem.id) {
      setSelectedItem({
        ...selectedItem,
        url: editUrl.trim(),
        title: editTitle.trim() || selectedItem.title,
        description: editDescription.trim() || selectedItem.description,
        uploadedByUser: true,
      });
    }
    setEditingItem(null);
  };

  const handleResetGallery = () => {
    if (confirm("Reset all gallery photos and items back to factory defaults?")) {
      setMediaList(INITIAL_GALLERY);
      localStorage.removeItem('nhe_gallery_media');
      setSelectedItem(null);
      setEditingItem(null);
    }
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const newItem: GalleryMediaItem = {
      id: `user-media-${Date.now()}`,
      type: mediaType,
      title: title.trim() || `${mediaType === 'video' ? 'Video' : 'Photo'} - ${category}`,
      category,
      url: url.trim(),
      description: description.trim() || 'Custom equipment media added to gallery.',
      uploadedByUser: true,
      dateAdded: new Date().toLocaleDateString(),
    };

    setMediaList([newItem, ...mediaList]);
    setUploadModalOpen(false);

    // Reset
    setTitle('');
    setUrl('');
    setDescription('');
    setPreviewDataUrl(null);
  };

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'stator-coolers', label: 'Stator Air Coolers' },
    { id: 'shell-and-tube', label: 'Shell & Tube' },
    { id: 'bearings', label: 'Bearing Re-Babbitting' },
    { id: 'retubing', label: 'Retubing' },
    { id: 'shopfloor', label: 'Northern HeatEx Shopfloor' },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#050508] border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
              Advanced Thermal & Precision Fabrication Archive
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Northern HeatEx Corporation Shopfloor.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal max-w-xl leading-relaxed">
              High-resolution photography of Shell & Tube Heat Exchangers, Stator Air Coolers, Babbitt Bearings, Retubing, and Northern HeatEx advanced shopfloor operations.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2.5">
            {isOwner && (
              <>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Photo</span>
                </button>
                <button
                  onClick={handleResetGallery}
                  className="px-3.5 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white text-xs font-normal transition-colors cursor-pointer flex items-center space-x-1"
                  title="Reset gallery photos to default"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              </>
            )}
            <button
              onClick={openBrochure}
              className="px-4 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white text-xs font-normal transition-colors cursor-pointer"
            >
              Brochure Pages
            </button>
          </div>
        </div>

        {/* Clean Pill Category Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow-sm font-semibold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clean Photography Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="apple-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between relative border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                {item.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                    <Film className="w-8 h-8 text-zinc-500" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">
                        <Video className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70"></div>
                
                {/* Category Pill Tag */}
                <div className="absolute bottom-3 left-3 text-[10px] text-zinc-300 font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 uppercase">
                  {item.category === 'shopfloor' ? 'Shopfloor' : item.category.replace('-', ' ')}
                </div>

                {/* Direct "Change Photo" Trigger Button on Card (Owner Only) */}
                {isOwner && (
                  <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(item);
                      }}
                      className="px-2.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-[11px] font-medium backdrop-blur-md border border-white/25 flex items-center space-x-1 shadow-lg transition-transform hover:scale-105"
                      title="Change or replace this photo"
                    >
                      <Camera className="w-3 h-3 text-cyan-400" />
                      <span>Change Photo</span>
                    </button>
                  </div>
                )}

                {item.uploadedByUser && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-semibold shadow">
                    Custom
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>{item.dateAdded || 'Northern HeatEx Facility'}</span>
                  <span className="text-cyan-400 group-hover:underline flex items-center space-x-1">
                    <span>{isOwner ? 'View / Replace' : 'Enlarge'}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Existing Photo Modal */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <div className="bg-[#101014] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Gallery Customizer</div>
                  <h3 className="text-lg font-bold text-white mt-0.5">Change Photo in Gallery</h3>
                </div>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                
                {/* Live Preview */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium block">Photo Preview:</label>
                  <div className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-950 border border-white/10 flex items-center justify-center">
                    {editPreviewUrl ? (
                      <img src={editPreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-zinc-500">No image selected</span>
                    )}
                  </div>
                </div>

                {/* Upload File */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium block">Option 1: Upload from Your Device:</label>
                  <div className="border border-dashed border-white/15 hover:border-white/30 rounded-2xl p-4 text-center cursor-pointer bg-zinc-900/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditFileUpload}
                      className="hidden"
                      id="edit-gallery-file-picker"
                    />
                    <label htmlFor="edit-gallery-file-picker" className="cursor-pointer block">
                      <Upload className="w-5 h-5 text-zinc-300 mx-auto mb-1" />
                      <span className="text-xs text-white font-medium block">Choose image file (PNG, JPG, WebP)</span>
                      <span className="text-[11px] text-zinc-500 mt-0.5 block">Replaces this photo immediately in the gallery</span>
                    </label>
                  </div>
                </div>

                {/* OR URL */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium block">Option 2: Or Paste Image URL:</label>
                  <input
                    type="text"
                    value={editUrl}
                    onChange={(e) => {
                      setEditUrl(e.target.value);
                      setEditPreviewUrl(e.target.value);
                    }}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                {/* Edit Title */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium block">Photo Title:</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                {/* Edit Description */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium block">Description / Notes:</label>
                  <textarea
                    rows={2}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      const orig = INITIAL_GALLERY.find(g => g.id === editingItem.id);
                      if (orig) {
                        setEditUrl(orig.url);
                        setEditPreviewUrl(orig.url);
                        setEditTitle(orig.title);
                        setEditDescription(orig.description);
                      }
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-300"
                  >
                    Reset to Initial
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 rounded-full text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* Add Media Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <div className="bg-[#101014] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Add Photo or Video to Gallery</h3>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMedia} className="space-y-4">
                
                {/* Media Type Switcher */}
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setMediaType('image')}
                    className={`py-2 px-3 rounded-full border text-center transition-all ${
                      mediaType === 'image'
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-900 text-zinc-400 border-white/10'
                    }`}
                  >
                    Photo / Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType('video')}
                    className={`py-2 px-3 rounded-full border text-center transition-all ${
                      mediaType === 'video'
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-900 text-zinc-400 border-white/10'
                    }`}
                  >
                    Video Link
                  </button>
                </div>

                {mediaType === 'image' && (
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 block font-medium">Upload Image from Device:</label>
                    <div className="border border-dashed border-white/15 rounded-2xl p-4 text-center cursor-pointer bg-zinc-900/40">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="apple-gallery-file"
                      />
                      <label htmlFor="apple-gallery-file" className="cursor-pointer block text-xs text-zinc-300">
                        {previewDataUrl ? 'Change Selected Photo' : 'Click to select photo file'}
                      </label>
                    </div>
                    {previewDataUrl && (
                      <div className="mt-2 rounded-xl overflow-hidden aspect-video max-h-36 border border-white/10">
                        <img src={previewDataUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-xs text-zinc-400 block font-medium mb-1">
                    {mediaType === 'image' ? 'Or Provide Image URL:' : 'Video URL (YouTube or MP4):'}
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={mediaType === 'image' ? 'https://...' : 'https://www.youtube.com/watch?v=...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block font-medium mb-1">Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Stator Air Cooler Shopfloor Assembly"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block font-medium mb-1">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  >
                    <option value="stator-coolers">Stator Air Coolers</option>
                    <option value="shell-and-tube">Shell & Tube Heat Exchanger</option>
                    <option value="bearings">Bearing Re-Babbitting</option>
                    <option value="retubing">Retubing</option>
                    <option value="shopfloor">Noor Engineering Works</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block font-medium mb-1">Description:</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the equipment or test..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors"
                  >
                    Publish to Gallery
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <div className="relative bg-[#0F0F13] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
              
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase font-mono">
                    {selectedItem.category === 'shopfloor' ? 'Northern HeatEx Shopfloor' : selectedItem.category}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {selectedItem.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  {isOwner && (
                    <button
                      onClick={() => handleOpenEdit(selectedItem)}
                      className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer shadow"
                      title="Change this photo"
                    >
                      <Camera className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Change This Photo</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded-full text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[550px] overflow-hidden">
                {selectedItem.type === 'video' ? (
                  selectedItem.url.includes('youtube.com') || selectedItem.url.includes('youtu.be') ? (
                    <iframe
                      src={selectedItem.url.replace("watch?v=", "embed/")}
                      title={selectedItem.title}
                      className="w-full h-full min-h-[400px]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video src={selectedItem.url} controls autoPlay className="w-full h-full object-contain" />
                  )
                ) : (
                  <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-full object-contain" />
                )}
              </div>

              <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
                <p className="line-clamp-2">{selectedItem.description}</p>
                <div className="flex items-center space-x-3 shrink-0">
                  {isOwner && (
                    <button
                      onClick={() => handleOpenEdit(selectedItem)}
                      className="text-cyan-400 hover:underline flex items-center space-x-1"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Replace Image</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-200 text-xs hover:bg-zinc-700"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

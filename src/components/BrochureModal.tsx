import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Download, FileText } from 'lucide-react';
import { BROCHURE_PAGES } from '../data/companyData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  initialPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  if (!isOpen) return null;

  const activePageData = BROCHURE_PAGES.find(p => p.page === currentPage) || BROCHURE_PAGES[0];

  const handlePrev = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : BROCHURE_PAGES.length));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < BROCHURE_PAGES.length ? prev + 1 : 1));
  };

  const handleDownloadPage = () => {
    const link = document.createElement('a');
    link.href = activePageData.image;
    link.download = `Northern_HeatEx_Brochure_Page_${activePageData.page}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-2xl">
      <div className="relative bg-[#0F0F13] border border-white/10 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-zinc-950/70">
          <div>
            <div className="text-[11px] text-zinc-400 font-medium">
              Official 12-Page Engineering Brochure • Page {activePageData.page} of {BROCHURE_PAGES.length}
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-white mt-0.5">
              {activePageData.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadPage}
              className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 shadow cursor-pointer"
              title="Download this brochure page"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Download Page</span>
            </button>
            <a
              href={activePageData.image}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Open full image"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Stage */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-4 overflow-auto">
          <img
            src={activePageData.image}
            alt={activePageData.title}
            className="max-h-[72vh] w-auto object-contain rounded-xl shadow-lg border border-white/10"
          />

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/20 transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-white hover:text-black text-white border border-white/20 transition-all cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Selector Bar */}
        <div className="p-3 bg-zinc-950/90 border-t border-white/10 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {BROCHURE_PAGES.map((p) => {
            const isCurrent = p.page === currentPage;
            return (
              <button
                key={p.page}
                onClick={() => setCurrentPage(p.page)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Page {p.page}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

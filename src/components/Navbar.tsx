import React, { useState } from 'react';
import { Bot, FileText, Menu, X, Camera, Download, Lock, Unlock, ShieldCheck } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/companyData';
import { useSiteImages } from '../context/ImageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAiBot: () => void;
  openBrochure: () => void;
  openInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAiBot,
  openBrochure,
  openInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getImage, openEditor, setManagerOpen, isEditMode, isOwner, setOwnerModalOpen, lockOwner } = useSiteImages();

  const customLogo = getImage('site_logo');

  const navLinks = [
    { id: 'equipment', label: 'Products' },
    { id: 'retubing', label: 'Retubing' },
    { id: 'bearings', label: 'Bearings' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'clients', label: 'Clients' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'iso-certifications', label: 'ISO Accreditations' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo with Direct "Edit Logo" Option for Owner */}
          <div className="flex items-center space-x-2.5 group relative">
            <div
              onClick={() => {
                setActiveTab('overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2.5 cursor-pointer"
            >
              {customLogo ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white flex items-center justify-center p-0.5">
                  <img
                    src={customLogo}
                    alt="Company Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-semibold tracking-tighter">
                  NH
                </div>
              )}

              <div>
                <div className="text-sm font-semibold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Northern HeatEx Corporation
                </div>
                <div className="text-[10px] text-zinc-400 font-normal tracking-wide">
                  Precision Thermal & Rotating Equipment
                </div>
              </div>
            </div>

            {/* Change Logo Quick Button (Only for Authenticated Owner) */}
            {isOwner && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditor('site_logo', 'Company Brand Logo');
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-opacity ml-1 cursor-pointer"
                title="Click to change company logo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs font-medium tracking-tight transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* If Owner: Show Edit Photos button and lock status */}
            {isOwner ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setManagerOpen(true)}
                  className="text-xs text-black font-semibold px-3 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer flex items-center space-x-1.5 shadow"
                  title="Owner Mode: Change any photo or logo on the website"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Edit Photos</span>
                </button>
                <button
                  onClick={lockOwner}
                  className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                  title="Owner Mode Active - Click to lock site"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            ) : null}

            {/* Download 12-Page Brochure Action for Visitors */}
            <button
              onClick={openBrochure}
              className="text-xs text-white px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer flex items-center space-x-1.5 shadow-sm"
              title="View and download complete 12-page company brochure"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download Brochure</span>
            </button>

            {/* AI Assistant Pill */}
            <button
              onClick={openAiBot}
              className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Bot</span>
            </button>

            {/* RFQ Action */}
            <button
              onClick={openInquiry}
              className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-white/10 px-6 py-5 space-y-4 backdrop-blur-2xl">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="block w-full text-left text-sm text-zinc-300 hover:text-white py-1"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col space-y-2.5">
            {isOwner && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setManagerOpen(true);
                }}
                className="w-full py-2.5 rounded-full bg-cyan-400 text-black text-xs font-semibold text-center flex items-center justify-center space-x-2 shadow"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Owner Mode: Edit Any Photo</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBrochure();
              }}
              className="w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium text-center flex items-center justify-center space-x-2"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download 12-Page Brochure</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openInquiry();
              }}
              className="w-full py-2.5 rounded-full bg-white text-black text-xs font-medium text-center"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { Bot, FileText, Menu, X, ArrowRight } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/companyData';

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

  const navLinks = [
    { id: 'equipment', label: 'Products' },
    { id: 'retubing', label: 'Retubing' },
    { id: 'bearings', label: 'Bearings' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'clients', label: 'Clients' },
    { id: 'gallery', label: 'Gallery' },
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
    <header className="sticky top-0 z-50 w-full bg-black/75 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Clean Apple-style Logo */}
          <div
            onClick={() => {
              setActiveTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-semibold tracking-tighter">
              NH
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Northern HeatEx
              </div>
              <div className="text-[10px] text-zinc-400 font-normal tracking-wide">
                Est. 1983 • Noor Engineering Works
              </div>
            </div>
          </div>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs font-medium tracking-tight transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* 12-Page Brochure Link */}
            <button
              onClick={openBrochure}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1 px-2.5 py-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Brochure</span>
            </button>

            {/* AI Assistant Pill */}
            <button
              onClick={openAiBot}
              className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Assistant</span>
            </button>

            {/* Request Quote - Clean Apple Style Button */}
            <button
              onClick={openInquiry}
              className="text-xs font-medium text-black bg-white hover:bg-zinc-200 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-sm"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={openAiBot}
              className="p-1.5 text-zinc-300 hover:text-white"
              title="AI Assistant"
            >
              <Bot className="w-5 h-5 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-300 hover:text-white"
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openInquiry();
              }}
              className="w-full py-2.5 rounded-full bg-white text-black text-xs font-medium text-center"
            >
              Request a Quote
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBrochure();
              }}
              className="w-full py-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-medium text-center"
            >
              View 12-Page Brochure
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

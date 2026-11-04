import React from 'react';
import { COMPANY_PROFILE } from '../data/companyData';
import { useSiteImages } from '../context/ImageContext';
import { Lock, Unlock, FileDown, ShieldCheck } from 'lucide-react';

interface FooterProps {
  scrollToSection: (id: string) => void;
  openAiBot: () => void;
  openBrochure: () => void;
  openInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  scrollToSection,
  openAiBot,
  openBrochure,
  openInquiry,
}) => {
  const { isOwner, lockOwner, setOwnerModalOpen } = useSiteImages();
  return (
    <footer className="bg-black border-t border-white/10 text-zinc-400 text-xs py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Heritage & Corporate Structure Note */}
        <div className="border-b border-white/10 pb-8 mb-10 text-zinc-400 leading-relaxed max-w-4xl space-y-2">
          <p>
            <strong className="text-zinc-200">Northern HeatEx Corporation</strong> has been formed as the new-generation corporation to spearhead nationwide expansion and international turnkey projects in precision thermal transfer and rotating equipment.
          </p>
          <p className="text-zinc-500 text-[11px]">
            Our parent company and veteran manufacturing unit, <strong className="text-zinc-300">Noor Engineering Works</strong>, operates purely in Public Sector Undertakings (PSUs) and state electricity undertakings across India, continuing its specialized fabrication legacy at our Haridwar facilities.
          </p>
        </div>

        {/* 4 Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-3">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">Products</div>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => scrollToSection('equipment')} className="hover:text-white transition-colors">
                  Shell & Tube Heat Exchangers
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('equipment')} className="hover:text-white transition-colors">
                  Stator Air Coolers
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('bearings')} className="hover:text-white transition-colors">
                  White Metal Babbitt Bearings
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('retubing')} className="hover:text-white transition-colors">
                  10-Step Retubing Protocol
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">Capabilities</div>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => scrollToSection('manufacturing')} className="hover:text-white transition-colors">
                  CNC Machining (Up to 2,500mm)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('manufacturing')} className="hover:text-white transition-colors">
                  100 Bar Hydrostatic Testing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('manufacturing')} className="hover:text-white transition-colors">
                  ASME Sec. IX Welding & NDT
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('clients')} className="hover:text-white transition-colors">
                  Valued Clients (NHPC, NPCIL)
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">Resources</div>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={openBrochure} className="hover:text-white transition-colors flex items-center space-x-1.5 text-cyan-400">
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Official Brochure</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('iso-certifications')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                  <span>ISO Accreditations & Certificates</span>
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-white transition-colors">
                  Shopfloor Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={openAiBot} className="hover:text-white transition-colors">
                  AI Engineering Assistant
                </button>
              </li>
              <li>
                <button onClick={openInquiry} className="hover:text-white transition-colors">
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-white font-semibold text-xs uppercase tracking-wider">Northern HeatEx Corporation</div>
            <div className="space-y-1.5 text-zinc-400">
              <div>Shastri Nagar, Jwalapur, Haridwar, Uttarakhand - 249407, India</div>
              <div>
                <span className="text-zinc-500">GSTIN:</span> <span className="font-mono text-cyan-400 font-medium">05AABFN3036G1ZQ</span>
              </div>
              <div>
                <a href="tel:+918532823883" className="text-zinc-300 hover:text-white font-medium block">
                  +91-8532823883
                </a>
                <span className="text-zinc-400">+91-9760362826 / +91-9557565742</span>
              </div>
              <div>
                <a href="mailto:info@northernheatex.co.in" className="hover:text-white block">
                  info@northernheatex.co.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-zinc-500 gap-3">
          <div>
            Copyright © {new Date().getFullYear()} Northern HeatEx Corporation. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Haridwar Precision Works</span>
            <span>•</span>
            <span className="font-mono text-zinc-400">GST: 05AABFN3036G1ZQ</span>
            <span>•</span>
            <span>ISO 9001:2015 Accredited</span>
            <span>•</span>
            {isOwner ? (
              <button
                onClick={lockOwner}
                className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer px-2 py-1 rounded bg-cyan-950/40 border border-cyan-800/40"
                title="Owner Mode is active. Click to lock site."
              >
                <Unlock className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">Owner Mode (Lock)</span>
              </button>
            ) : (
              <button
                onClick={() => setOwnerModalOpen(true)}
                className="flex items-center space-x-1 text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                title="Authorized Owner Login"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[11px]">Owner Portal</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};

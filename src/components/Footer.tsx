import React from 'react';
import { COMPANY_PROFILE } from '../data/companyData';

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
  return (
    <footer className="bg-black border-t border-white/10 text-zinc-400 text-xs py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer / Heritage Note */}
        <div className="border-b border-white/10 pb-8 mb-10 text-zinc-400 leading-relaxed max-w-4xl">
          <p>
            Northern HeatEx Corporation (formerly Noor Engineering Works, established 1983). Over four decades of precision thermal transfer engineering, hydro turbine rotating components, stator air coolers, and white metal bearing re-babbitting for premier public sector utilities, nuclear plants, and international EPC contractors.
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
                <button onClick={openBrochure} className="hover:text-white transition-colors">
                  12-Page Official Brochure
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
            <div className="text-white font-semibold text-xs uppercase tracking-wider">Haridwar Works</div>
            <div className="space-y-1.5 text-zinc-400">
              <div>Shastri Nagar, Jwalapur, Haridwar, Uttarakhand - 249407, India</div>
              <div>
                <a href="tel:+919760362826" className="text-zinc-300 hover:text-white font-medium block">
                  +91-9760362826
                </a>
                <span className="text-zinc-400">+91-9557565742 / +91-8532823883</span>
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
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-zinc-400 gap-2">
          <div>
            Copyright © {new Date().getFullYear()} Northern HeatEx Corporation. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-zinc-400">
            <span>Haridwar, Uttarakhand</span>
            <span>•</span>
            <span>ASME & TEMA Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

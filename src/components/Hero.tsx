import React from 'react';
import { ArrowRight, Bot, PhoneCall, ShieldCheck } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/companyData';

interface HeroProps {
  openInquiry: () => void;
  openAiBot: () => void;
  openBrochure: () => void;
  scrollToSection: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  openInquiry,
  openAiBot,
  openBrochure,
  scrollToSection,
}) => {
  return (
    <section id="overview" className="relative pt-16 sm:pt-24 pb-20 overflow-hidden bg-black text-center">
      
      {/* Subtle serene ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-cyan-900/15 via-blue-900/5 to-transparent blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle pill tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-normal mb-6 tracking-wide">
          <span className="text-zinc-400">Northern HeatEx Corporation</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300">40+ Years of Precision Engineering</span>
        </div>

        {/* Large Apple-style Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          Precision Heat Exchangers. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500">
            Engineered to endure.
          </span>
        </h1>

        {/* Calm, readable sub-headline */}
        <p className="mt-6 text-base sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Custom Shell & Tube Heat Exchangers, Stator Air Coolers, and White Metal Bearing Re-Babbitting. Trusted by India’s national power utilities and critical industries since 1983.
        </p>

        {/* Clean Apple Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={openInquiry}
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
          >
            Request a Quote
          </button>

          <button
            onClick={() => scrollToSection('equipment')}
            className="px-6 py-3 rounded-full bg-zinc-900/90 text-zinc-300 hover:text-white border border-white/10 text-sm font-medium hover:bg-zinc-800 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </button>

          <button
            onClick={openAiBot}
            className="px-5 py-3 rounded-full bg-zinc-900/60 text-cyan-300 hover:text-white border border-cyan-500/20 hover:border-cyan-500/40 text-sm font-normal transition-all cursor-pointer flex items-center space-x-2"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Ask AI Assistant</span>
          </button>
        </div>

        {/* Direct emergency phone line */}
        <div className="mt-4 text-xs text-zinc-500 flex items-center justify-center space-x-2">
          <span>24/7 Outage Response:</span>
          <a href="tel:+919760362826" className="text-zinc-400 hover:text-white font-medium underline">
            +91-9760362826
          </a>
          <span>•</span>
          <button onClick={openBrochure} className="text-zinc-400 hover:text-white underline cursor-pointer">
            View 12-Page Brochure
          </button>
        </div>

        {/* Cinematic Main Feature Image */}
        <div className="mt-14 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85"
            alt="Precision Industrial Heat Exchanger"
            className="w-full h-72 sm:h-96 lg:h-[460px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-2 text-white">
            <div>
              <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                Haridwar Facility • Certified Standards
              </div>
              <div className="text-sm sm:text-base font-semibold text-zinc-100">
                ASME Section VIII Div. 1 • TEMA Class R, C, B • ISO 9001:2015
              </div>
            </div>
            <div className="text-xs text-zinc-400 font-mono sm:text-right">
              Noor Engineering Works Legacy Since 1983
            </div>
          </div>
        </div>

        {/* 4 Clean Key Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-white/10 pt-10">
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">40+ Years</div>
            <div className="text-xs text-zinc-400 mt-1">Specialized legacy in rotating equipment and heat exchangers since 1983.</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">15,000 sq ft</div>
            <div className="text-xs text-zinc-400 mt-1">State-of-the-art facility in Haridwar with 15-ton overhead cranes.</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">2,500 mm</div>
            <div className="text-xs text-zinc-400 mt-1">CNC vertical turning center capacity with ±0.005mm accuracy.</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">100 Bar</div>
            <div className="text-xs text-zinc-400 mt-1">Hydrostatic proof test bench and mass spectrometer helium testing.</div>
          </div>
        </div>

      </div>
    </section>
  );
};

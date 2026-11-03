import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CLIENTS_LIST } from '../data/companyData';

interface ClientsShowcaseProps {
  openBrochure: () => void;
  openInquiry: () => void;
}

export const ClientsShowcase: React.FC<ClientsShowcaseProps> = ({
  openBrochure,
  openInquiry,
}) => {
  return (
    <section id="clients" className="py-24 bg-black border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
            Institutional Trust
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Trusted by national power utilities.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Proud partner to India's premier government enterprises, nuclear installations, state electricity boards, and international EPC contractors.
          </p>
        </div>

        {/* Clean Minimal Clients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
          {CLIENTS_LIST.map((client, i) => (
            <div
              key={i}
              className="apple-card rounded-2xl p-5 flex flex-col justify-between text-left"
            >
              <div>
                <div className="text-xs font-mono text-zinc-500 mb-1">GOVT UTILITY</div>
                <h3 className="text-base font-bold text-white tracking-tight">{client.name}</h3>
                <div className="text-xs text-zinc-400 mt-1 line-clamp-1">{client.category}</div>
              </div>
              <div className="text-[11px] text-zinc-500 mt-4 border-t border-white/5 pt-2">
                {client.badge}
              </div>
            </div>
          ))}
        </div>

        {/* Export & Supply Strip */}
        <div className="apple-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-sm font-semibold text-white">Global Export & EPC Supply</div>
            <div className="text-xs text-zinc-400 mt-1">
              Serving international markets across South Asia, the Middle East, Southeast Asia, and beyond.
            </div>
          </div>
          <button
            onClick={openInquiry}
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            Submit EPC Inquiry
          </button>
        </div>

      </div>
    </section>
  );
};

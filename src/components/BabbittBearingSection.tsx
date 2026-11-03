import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface BabbittBearingSectionProps {
  onStartBearingInquiry: () => void;
  openBrochure: () => void;
}

export const BabbittBearingSection: React.FC<BabbittBearingSectionProps> = ({
  onStartBearingInquiry,
  openBrochure,
}) => {
  return (
    <section id="bearings" className="py-24 bg-black border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
            Hydro Turbine & Rotating Systems
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            White Metal Bearing Re-Babbitting.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Centrifugally cast tin-based and lead-based babbitt alloys. Engineered for high load capacity, extended service life, and ISO 4386-1 Class A metallurgical bond integrity.
          </p>
        </div>

        {/* 3 Clean Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="apple-card rounded-2xl p-6 sm:p-8">
            <div className="text-xs text-zinc-400 font-mono mb-2">01 / ROTATING MACHINES</div>
            <h3 className="text-xl font-bold text-white">Guide & Journal Bearings</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Precision-machined guide and journal bearings for vertical and horizontal turbines with high-purity white metal lining.
            </p>
          </div>

          <div className="apple-card rounded-2xl p-6 sm:p-8">
            <div className="text-xs text-zinc-400 font-mono mb-2">02 / AXIAL LOAD</div>
            <h3 className="text-xl font-bold text-white">Thrust Bearings & Pads</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Thrust bearing assemblies and tilting pads engineered for extreme axial loads in Francis, Kaplan, and Pelton hydro turbines.
            </p>
          </div>

          <div className="apple-card rounded-2xl p-6 sm:p-8">
            <div className="text-xs text-zinc-400 font-mono mb-2">03 / PRECISION RECREATION</div>
            <h3 className="text-xl font-bold text-white">Reverse Engineering</h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Component recreation from worn parts or site measurements with 100% dimensional accuracy and metallurgical equivalence.
            </p>
          </div>
        </div>

        {/* Split Visual & Process Block */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#0B0B0E]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-video bg-black border border-white/10">
                <img
                  src="/public/assets/aistudio/7_90a9011b.png"
                  alt="Thrust Bearing Lined Pads Haridwar Shopfloor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-zinc-400 flex items-center justify-between px-1">
                <span>Haridwar Shopfloor: Finished Thrust Pads</span>
                <span className="font-mono">ASTM B23 Tin-Base Babbitt</span>
              </div>
            </div>

            {/* Process Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-2xl font-bold text-white">The Babbitting Process</h4>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                  Every bearing is processed under rigorous thermal controls to eliminate micro-porosity and ensure seamless hydrodynamic lubrication.
                </p>
              </div>

              <div className="space-y-3 text-sm text-zinc-300">
                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 text-xs font-mono font-medium">1</span>
                  <span><strong>Inspection & Tinning:</strong> Safe thermal de-babbitting, flux preparation, and molten pure tin coating.</span>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 text-xs font-mono font-medium">2</span>
                  <span><strong>Centrifugal Casting:</strong> High-speed temperature-controlled spinning for high-density alloy matrix.</span>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 text-xs font-mono font-medium">3</span>
                  <span><strong>Ultrasonic NDT Bond Inspection:</strong> ISO 4386-1 Class A verification guaranteeing complete metallurgical bond.</span>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 text-xs font-mono font-medium">4</span>
                  <span><strong>CNC Precision Boring:</strong> Up to 2,500 mm diameter with exacting clearances (within ±0.01mm) and Ra &lt; 0.4 µm finish.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onStartBearingInquiry}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Request Bearing Re-Babbitting Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

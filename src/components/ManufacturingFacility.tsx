import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/companyData';

interface ManufacturingFacilityProps {
  openBrochure: () => void;
  openInquiry: () => void;
}

export const ManufacturingFacility: React.FC<ManufacturingFacilityProps> = ({
  openBrochure,
  openInquiry,
}) => {
  return (
    <section id="manufacturing" className="py-24 bg-[#050508] border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
            Haridwar Facility
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Manufacturing & Quality Assurance.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Our 15,000 sq. ft. modern works in Haridwar pairs heavy precision CNC turning up to 2,500 mm diameter with ASME Section IX welding and Level II NDT inspection.
          </p>
        </div>

        {/* 4 Clean Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="apple-card rounded-2xl p-6">
            <div className="text-xs font-mono text-zinc-400 mb-2">CNC MACHINING</div>
            <h3 className="text-lg font-bold text-white">Up to 2,500 mm</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Vertical boring centers, CNC turning, precision milling, and tubesheet drilling with ±0.005mm accuracy.
            </p>
          </div>

          <div className="apple-card rounded-2xl p-6">
            <div className="text-xs font-mono text-zinc-400 mb-2">ASME WELDING</div>
            <h3 className="text-lg font-bold text-white">Section IX Certified</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Qualified GTAW, SMAW, and SAW welders. Shell rolling up to 25mm in Carbon Steel, Stainless, Titanium, and Duplex.
            </p>
          </div>

          <div className="apple-card rounded-2xl p-6">
            <div className="text-xs font-mono text-zinc-400 mb-2">PRESSURE INTEGRITY</div>
            <h3 className="text-lg font-bold text-white">100 Bar Hydro Test</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Proof testing to 1.5x design pressure and mass spectrometer helium leak detection down to 10⁻⁸ mbar·l/s.
            </p>
          </div>

          <div className="apple-card rounded-2xl p-6">
            <div className="text-xs font-mono text-zinc-400 mb-2">NDT SERVICES</div>
            <h3 className="text-lg font-bold text-white">Certified Level II</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Dye Penetrant (DPT), Magnetic Particle (MPI), Ultrasonic (UT), and Positive Material Identification (PMI XRF).
            </p>
          </div>
        </div>

        {/* Documentation Quality Dossier Box */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#0B0B0E]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <h4 className="text-2xl font-bold text-white">Complete Documentation Package</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Every dispatch includes Mill Test Certificates (MTC 3.1), Welding Procedure Specifications (WPS/PQR), Welder Qualification Records (WPQ), NDT reports, and calibrated hydro test charts. Third-party inspection hold points accommodated.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openInquiry}
                className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all cursor-pointer"
              >
                Schedule Factory Visit
              </button>
              <button
                onClick={openBrochure}
                className="px-5 py-3 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white text-sm font-normal transition-colors cursor-pointer"
              >
                Brochure Page 4 & 8
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

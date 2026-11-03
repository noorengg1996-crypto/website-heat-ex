import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { REFURBISHMENT_STEPS } from '../data/companyData';

interface RefurbishmentProcessProps {
  onStartRetubingInquiry: () => void;
  openBrochure: () => void;
}

export const RefurbishmentProcess: React.FC<RefurbishmentProcessProps> = ({
  onStartRetubingInquiry,
  openBrochure,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStep = REFURBISHMENT_STEPS.find(s => s.step === activeStep) || REFURBISHMENT_STEPS[0];

  return (
    <section id="retubing" className="py-24 bg-[#050508] border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
            Turnkey Refurbishment
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Restore. Renew. Extend.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Maximize your capital investment with our proprietary 10-step retubing protocol. 40% to 60% savings versus new procurement, extending service life by 10–15 years.
          </p>
        </div>

        {/* 3 Calm Stat Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="apple-card rounded-2xl p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">40–60%</div>
            <div className="text-sm font-medium text-zinc-300 mt-2">Capital Cost Reduction</div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Drastically lower costs compared to full equipment replacement, delivered in a fraction of the procurement lead time.
            </p>
          </div>

          <div className="apple-card rounded-2xl p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">10–15 Yrs</div>
            <div className="text-sm font-medium text-zinc-300 mt-2">Lifecycle Extension</div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Full restoration to original or enhanced thermal performance using upgraded metallurgy like Titanium Grade 2 and Cupro-Nickel.
            </p>
          </div>

          <div className="apple-card rounded-2xl p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">1.5x Proof</div>
            <div className="text-sm font-medium text-zinc-300 mt-2">Zero-Leakage Assurance</div>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Every refurbished bundle undergoes 1.5x design pressure hydrostatic testing and mass spectrometer helium leak validation.
            </p>
          </div>
        </div>

        {/* 10-Step Clean Explorer */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 border border-white/10">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                The 10-Step Procedure
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Step {currentStep.step}: {currentStep.title}
              </h3>
            </div>
            
            <button
              onClick={onStartRetubingInquiry}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors"
            >
              Request Retubing Feasibility
            </button>
          </div>

          {/* Clean Step Number Pill Bar */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-8">
            {REFURBISHMENT_STEPS.map((s) => {
              const isCurrent = s.step === activeStep;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`py-3 rounded-xl text-center text-xs font-medium transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-white text-black shadow-md font-semibold'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {s.step}
                </button>
              );
            })}
          </div>

          {/* Current Step Description Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 rounded-2xl p-6 sm:p-8 border border-white/5">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-mono text-zinc-400">
                STANDARD: {currentStep.standard}
              </div>
              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                {currentStep.description}
              </p>
              <div className="text-xs text-zinc-400 pt-2 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified by certified ASME and Level II NDT technicians.</span>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-xl overflow-hidden bg-black aspect-video border border-white/10">
              <img
                src={
                  currentStep.step <= 4
                    ? "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
                    : "/public/assets/aistudio/6_9096fd42.png"
                }
                alt={currentStep.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile action button */}
          <div className="mt-6 sm:hidden">
            <button
              onClick={onStartRetubingInquiry}
              className="w-full py-3 rounded-full bg-white text-black text-xs font-medium text-center"
            >
              Request Retubing Feasibility
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

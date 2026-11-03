import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Camera } from 'lucide-react';
import { REFURBISHMENT_STEPS } from '../data/companyData';
import { EditableImage } from './EditableImage';
import { useSiteImages } from '../context/ImageContext';

interface RefurbishmentProcessProps {
  onStartRetubingInquiry: () => void;
  openBrochure: () => void;
}

export const RefurbishmentProcess: React.FC<RefurbishmentProcessProps> = ({
  onStartRetubingInquiry,
  openBrochure,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const { openEditor, isOwner } = useSiteImages();
  const currentStep = REFURBISHMENT_STEPS.find(s => s.step === activeStep) || REFURBISHMENT_STEPS[0];

  return (
    <section id="retubing" className="py-24 bg-[#050508] border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
            Workshop Speciality & Turnkey Refurbishment
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Precision Workshop Speciality: 10-Step Protocol
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Maximize your capital investment with Northern HeatEx Corporation's specialized workshop restoration protocol. 40% to 60% savings versus new procurement, extending service life by 10–15 years.
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
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-8 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                Workshop Speciality • The 10-Step Procedure
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Step {currentStep.step}: {currentStep.title}
              </h3>
            </div>
            
            <div className="flex items-center space-x-2.5">
              {isOwner && (
                <button
                  onClick={() => openEditor(`retubing_step_${currentStep.step}`, `Step ${currentStep.step}: ${currentStep.title}`)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-zinc-200 hover:text-white transition-colors cursor-pointer"
                  title="Owner Action: Change photo for this specific step"
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Change Step {currentStep.step} Photo</span>
                </button>
              )}

              <button
                onClick={onStartRetubingInquiry}
                className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors"
              >
                Request Retubing Feasibility
              </button>
            </div>
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
                      ? 'bg-white text-black shadow-md font-semibold ring-2 ring-cyan-400/50'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">Step</div>
                  <div>{s.step}</div>
                </button>
              );
            })}
          </div>

          {/* Current Step Description Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 rounded-2xl p-6 sm:p-8 border border-white/5">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                  STANDARD: {currentStep.standard}
                </span>
                <span className="text-xs text-zinc-500">•</span>
                <span className="text-xs text-zinc-400 font-mono">
                  TIMELINE: {currentStep.duration}
                </span>
              </div>

              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                {currentStep.description}
              </p>

              <div className="text-xs text-zinc-400 pt-2 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified by certified Level II NDT inspectors with full traceability logs.</span>
              </div>
            </div>

            {/* Step Photo */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-black aspect-video border border-white/10 group shadow-lg">
              <EditableImage
                imageKey={`retubing_step_${currentStep.step}`}
                label={`Step ${currentStep.step}: ${currentStep.title}`}
                fallbackUrl={
                  currentStep.step <= 4
                    ? "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
                    : "/public/assets/aistudio/6_9096fd42.png"
                }
                alt={currentStep.title}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] text-zinc-300">
                <span className="truncate">Step {currentStep.step}: Workshop Protocol</span>
                {isOwner && <span className="text-cyan-400 shrink-0">Click photo to change</span>}
              </div>
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

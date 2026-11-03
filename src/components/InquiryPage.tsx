import React, { useState } from 'react';
import { Send, PhoneCall, Mail, MapPin, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/companyData';
import { InquiryFormData } from '../types';

interface InquiryPageProps {
  initialEquipment?: string;
  onOpenAiBot: () => void;
}

export const InquiryPage: React.FC<InquiryPageProps> = ({
  initialEquipment,
  onOpenAiBot,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    equipmentType: initialEquipment || 'Shell & Tube Heat Exchanger',
    serviceType: 'New Equipment Manufacturing',
    industry: 'Power Generation',
    tubeMetallurgy: 'Cupro-Nickel 90/10 (ASTM B111)',
    shellFluid: 'Cooling Water',
    tubeFluid: 'Turbine Lube Oil',
    operatingPressureBar: '16',
    operatingTempC: '120',
    tubeBundleLengthMeters: '3.5',
    urgency: 'priority',
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    additionalDetails: '',
    estimatedQuantity: '1 Unit',
  });

  const [submittedRfq, setSubmittedRfq] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rfqId = `RFQ-NHE-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRfq(rfqId);
  };

  const getWhatsAppLink = () => {
    const text = `*INQUIRY - NORTHERN HEATEX CORPORATION*\n` +
      `Ticket: ${submittedRfq || 'NEW'}\n` +
      `Equipment: ${formData.equipmentType}\n` +
      `Metallurgy: ${formData.tubeMetallurgy}\n` +
      `Pressure: ${formData.operatingPressureBar} bar\n` +
      `Temp: ${formData.operatingTempC} °C\n` +
      `Client: ${formData.clientName} (${formData.companyName})\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Notes: ${formData.additionalDetails || 'None'}`;
    return `https://wa.me/918532823883?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="inquiry" className="py-24 bg-black border-t border-white/10 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
            Engineering Proposals
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Let’s discuss your project.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal max-w-xl mx-auto leading-relaxed">
            Share your operating specifications or retubing scope. Our engineering team in Haridwar will provide a comprehensive technical and commercial proposal.
          </p>
        </div>

        {/* Form Card (Apple Clean Style) */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#0B0B0E]">
          
          {submittedRfq ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Reference Ticket: <strong className="text-white font-mono">{submittedRfq}</strong>
                </p>
                <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                  Thank you, {formData.clientName}. An engineer from our Haridwar facility will reach out to you shortly at {formData.phone || formData.email}.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
                >
                  Forward via WhatsApp (+91-8532823883)
                </a>

                <button
                  onClick={() => setSubmittedRfq(null)}
                  className="px-5 py-3 rounded-full bg-zinc-900 text-zinc-300 text-xs hover:text-white"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Equipment & Metallurgy */}
              <div className="space-y-4">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  01. Technical Requirements
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Equipment Type:</label>
                    <select
                      value={formData.equipmentType}
                      onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    >
                      <option value="Shell & Tube Heat Exchanger">Shell & Tube Heat Exchanger</option>
                      <option value="Stator Air Coolers">Stator Air Heat Exchanger (Generator Cooler)</option>
                      <option value="White Metal Bearing Re-Babbitting">White Metal Bearing Re-Babbitting</option>
                      <option value="Turnkey 10-Step Retubing">Turnkey 10-Step Retubing & Refurbishment</option>
                      <option value="Surface Condenser">Surface Condenser</option>
                      <option value="Bearing & Oil Coolers">Bearing & Oil Coolers</option>
                      <option value="CNC Machining up to 2500mm">Heavy CNC Machining (Up to 2,500mm)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Tube Metallurgy:</label>
                    <select
                      value={formData.tubeMetallurgy}
                      onChange={(e) => setFormData({ ...formData, tubeMetallurgy: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    >
                      <option value="Cupro-Nickel 90/10 (ASTM B111)">Cupro-Nickel 90/10</option>
                      <option value="Cupro-Nickel 70/30 (ASTM B111)">Cupro-Nickel 70/30</option>
                      <option value="Titanium Grade 2 (ASTM B338)">Titanium Grade 2 (Nuclear / Seawater)</option>
                      <option value="Stainless Steel 316L (ASTM A249)">Stainless Steel 316L</option>
                      <option value="Duplex 2205 (ASTM A789)">Duplex 2205</option>
                      <option value="Admiralty Brass">Admiralty Brass</option>
                      <option value="Tin-Based Babbitt ASTM B23 Gr 2">Tin-Based Babbitt (ASTM B23 Gr 2)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Design Pressure (Bar):</label>
                    <input
                      type="number"
                      value={formData.operatingPressureBar}
                      onChange={(e) => setFormData({ ...formData, operatingPressureBar: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Design Temp (°C):</label>
                    <input
                      type="number"
                      value={formData.operatingTempC}
                      onChange={(e) => setFormData({ ...formData, operatingTempC: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  02. Your Contact Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Full Name: *</label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Chief Engineer"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Organization / Utility: *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Hydro Power Utility / EPC"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Phone / WhatsApp: *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91-XXXXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Email Address: *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-medium block mb-1.5">Project Scope / Notes:</label>
                  <textarea
                    rows={3}
                    value={formData.additionalDetails}
                    onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                    placeholder="Provide details about existing equipment, tube count, dimensions, or shutdown dates..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Submit Button & Direct Contacts */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
                >
                  Send Engineering Inquiry
                </button>

                <div className="text-xs text-zinc-400 text-center sm:text-right">
                  Or call directly: <a href="tel:+918532823883" className="text-white underline font-medium">+91-8532823883</a>
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Corporate Works Info Box */}
        <div className="mt-12 text-center text-xs text-zinc-400 space-y-1">
          <div className="text-zinc-200 font-medium">Northern HeatEx Corporation</div>
          <div>Shastri Nagar, Jwalapur, Haridwar, Uttarakhand - 249407, India</div>
          <div>Direct: +91-8532823883 • Email: info@northernheatex.co.in • 24/7 Outage Support</div>
        </div>

      </div>
    </section>
  );
};

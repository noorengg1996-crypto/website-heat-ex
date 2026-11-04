import React, { useState } from 'react';
import { Send, PhoneCall, Mail, MapPin, CheckCircle2, Clock, MessageSquare, Upload, FileText, X } from 'lucide-react';
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
    tubeLength: '3,000 mm (3.0 m)',
    totalExchangerLength: '4,200 mm (4.2 m)',
    shellDiaType: 'ID',
    shellDiameter: '600 mm (24")',
    tubeDiameter: '19.05 mm (3/4") OD x 16 BWG',
    otherDimensions: '',
    urgency: 'priority',
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    additionalDetails: '',
    estimatedQuantity: '1 Unit',
    drawingFileName: '',
    drawingFileSize: '',
    drawingFileData: '',
  });

  const [submittedRfq, setSubmittedRfq] = useState<string | null>(null);

  const handleDrawingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          drawingFileName: file.name,
          drawingFileSize: `${(file.size / 1024).toFixed(1)} KB`,
          drawingFileData: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeDrawing = () => {
    setFormData(prev => ({
      ...prev,
      drawingFileName: '',
      drawingFileSize: '',
      drawingFileData: '',
    }));
  };

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
      `Tube Length: ${formData.tubeLength}\n` +
      `Total Exchanger Length: ${formData.totalExchangerLength}\n` +
      `Shell Diameter: ${formData.shellDiameter} (${formData.shellDiaType})\n` +
      `Tube Dia / Gauge: ${formData.tubeDiameter}\n` +
      `Other Dimensions: ${formData.otherDimensions || 'As per standard'}\n` +
      `Pressure: ${formData.operatingPressureBar} bar | Temp: ${formData.operatingTempC} °C\n` +
      `Drawing Attached: ${formData.drawingFileName ? 'YES (' + formData.drawingFileName + ')' : 'None'}\n` +
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

                {/* Tube Length & Total Exchanger Length */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Length of Tube:</label>
                    <input
                      type="text"
                      value={formData.tubeLength}
                      onChange={(e) => setFormData({ ...formData, tubeLength: e.target.value })}
                      placeholder="e.g. 3,000 mm (3.0 m)"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                    <span className="text-[10px] text-zinc-500 mt-1 block">Specify tube bundle / straight length in mm or meters</span>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Total Length of Heat Exchanger:</label>
                    <input
                      type="text"
                      value={formData.totalExchangerLength}
                      onChange={(e) => setFormData({ ...formData, totalExchangerLength: e.target.value })}
                      placeholder="e.g. 4,500 mm overall length"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                    <span className="text-[10px] text-zinc-500 mt-1 block">Overall vessel length including channels and covers</span>
                  </div>
                </div>

                {/* Shell Diameter (ID / OD) & Tube Diameter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-zinc-300 font-medium">Shell Diameter (Dia):</label>
                      <div className="flex items-center space-x-1 bg-zinc-800 p-0.5 rounded-lg text-[10px]">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, shellDiaType: 'ID' })}
                          className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                            formData.shellDiaType === 'ID'
                              ? 'bg-cyan-500 text-black font-semibold'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          ID (Inner)
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, shellDiaType: 'OD' })}
                          className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                            formData.shellDiaType === 'OD'
                              ? 'bg-cyan-500 text-black font-semibold'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          OD (Outer)
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={formData.shellDiameter}
                      onChange={(e) => setFormData({ ...formData, shellDiameter: e.target.value })}
                      placeholder={`e.g. 600 mm ${formData.shellDiaType} (24 inches)`}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-300 font-medium block mb-1.5">Tube OD / Wall Gauge (BWG):</label>
                    <input
                      type="text"
                      value={formData.tubeDiameter}
                      onChange={(e) => setFormData({ ...formData, tubeDiameter: e.target.value })}
                      placeholder="e.g. 19.05 mm (3/4 in) OD x 16 BWG (1.65 mm)"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                {/* Other Dimensions */}
                <div>
                  <label className="text-xs text-zinc-300 font-medium block mb-1.5">Other Dimensions / Sizing Specifications:</label>
                  <input
                    type="text"
                    value={formData.otherDimensions}
                    onChange={(e) => setFormData({ ...formData, otherDimensions: e.target.value })}
                    placeholder="e.g. Nozzle inlet/outlet sizes, baffle cut/spacing, pitch (triangular/square), number of tube passes..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                {/* Upload Drawing / Engineering File */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs text-zinc-300 font-medium block">Upload Drawing / Equipment Data Sheet (Optional):</label>
                  {formData.drawingFileName ? (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                      <div className="flex items-center space-x-3 truncate">
                        <FileText className="w-5 h-5 text-cyan-400 shrink-0" />
                        <div className="truncate">
                          <p className="text-xs text-white font-medium truncate">{formData.drawingFileName}</p>
                          <p className="text-[10px] text-zinc-400">{formData.drawingFileSize} • Ready for engineering review</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeDrawing}
                        className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0 ml-2 cursor-pointer"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-white/15 hover:border-cyan-400/50 rounded-2xl p-4 text-center cursor-pointer bg-zinc-900/40 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.step,.stp"
                        onChange={handleDrawingUpload}
                        className="hidden"
                        id="inquiry-drawing-file"
                      />
                      <label htmlFor="inquiry-drawing-file" className="cursor-pointer block">
                        <Upload className="w-5 h-5 text-zinc-400 mx-auto mb-1.5" />
                        <span className="text-xs text-white font-medium block">
                          Attach Drawing File (PDF, DWG, DXF, STEP, or Image)
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-0.5 block">
                          Upload existing vessel drawings, tube sheet layouts, or specification sheets
                        </span>
                      </label>
                    </div>
                  )}
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
        <div className="mt-12 text-center text-xs text-zinc-400 space-y-1.5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-zinc-200 font-semibold text-sm">Northern HeatEx Corporation</span>
            <span className="text-zinc-600">•</span>
            <span className="font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
              GSTIN: 05AABFN3036G1ZQ
            </span>
          </div>
          <div>Shastri Nagar, Jwalapur, Haridwar, Uttarakhand - 249407, India</div>
          <div>Direct: +91-8532823883 • Email: info@northernheatex.co.in • 24/7 Outage Support</div>
        </div>

      </div>
    </section>
  );
};

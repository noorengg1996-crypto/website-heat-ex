import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Upload, Plus, Trash2, Maximize2, Download, X, Check, FileCheck, ExternalLink } from 'lucide-react';
import { useSiteImages } from '../context/ImageContext';

export interface IsoCertificateItem {
  id: string;
  title: string;
  standard: string;
  certNumber?: string;
  issuingBody?: string;
  validity?: string;
  imageUrl: string;
  isCustom?: boolean;
}

const DEFAULT_ISO_CERTIFICATES: IsoCertificateItem[] = [
  {
    id: 'iso-9001',
    title: 'ISO 9001:2015 Quality Management System',
    standard: 'ISO 9001:2015 Certified',
    certNumber: 'QMS/NHE/2024-9001',
    issuingBody: 'International Standards Organization (QMS)',
    validity: 'Active & Verified',
    imageUrl: '/public/assets/aistudio/8_c4862b3d.png',
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001:2015 Environmental Management System',
    standard: 'ISO 14001:2015 Certified',
    certNumber: 'EMS/NHE/2024-14001',
    issuingBody: 'Environmental Quality Accreditation Body',
    validity: 'Active & Verified',
    imageUrl: '/public/assets/aistudio/4_f4ac98d1.png',
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001:2018 Occupational Health & Safety',
    standard: 'ISO 45001:2018 Certified',
    certNumber: 'OHSMS/NHE/2024-45001',
    issuingBody: 'Safety Management Accreditation Body',
    validity: 'Active & Verified',
    imageUrl: '/public/assets/aistudio/5_546d848b.png',
  },
  {
    id: 'iso-ndt-9712',
    title: 'ISO 9712 / NDT Level II Quality Inspection',
    standard: 'ISO 9712 NDT Level II',
    certNumber: 'NDT/UT/MPI/DPT-2024',
    issuingBody: 'Certified NDT Level II Quality Inspection Division',
    validity: 'Active & Verified',
    imageUrl: '/public/assets/aistudio/6_9096fd42.png',
  },
];

export const IsoCertificationSection: React.FC = () => {
  const { isOwner, setOwnerModalOpen } = useSiteImages();

  const [certificates, setCertificates] = useState<IsoCertificateItem[]>(() => {
    try {
      const saved = localStorage.getItem('nhe_iso_certificates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out legacy ASME and TEMA items from ISO accreditations
          const filtered = parsed.filter(item => 
            item.id !== 'asme-sec-viii' && 
            item.id !== 'tema-class-rcb' &&
            !item.title?.includes('ASME') &&
            !item.title?.includes('TEMA')
          );
          if (filtered.length > 0) {
            return filtered;
          }
        }
      }
    } catch (e) {
      console.warn("Could not load ISO certificates from localStorage", e);
    }
    return DEFAULT_ISO_CERTIFICATES;
  });

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<IsoCertificateItem | null>(null);

  // New certificate form state
  const [newTitle, setNewTitle] = useState('');
  const [newStandard, setNewStandard] = useState('ISO 9001:2015');
  const [newCertNumber, setNewCertNumber] = useState('');
  const [newIssuingBody, setNewIssuingBody] = useState('');
  const [newValidity, setNewValidity] = useState('Valid / Certified');
  const [newUrl, setNewUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('nhe_iso_certificates', JSON.stringify(certificates));
    } catch (e) {
      console.warn("Could not save ISO certificates to localStorage", e);
    }
  }, [certificates]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewSrc(result);
        setNewUrl(result);
        if (!newTitle) {
          setNewTitle(file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newCert: IsoCertificateItem = {
      id: `cert-${Date.now()}`,
      title: newTitle.trim() || 'ISO Quality Certificate',
      standard: newStandard.trim() || 'ISO 9001:2015',
      certNumber: newCertNumber.trim() || `CERT-${Date.now().toString().slice(-6)}`,
      issuingBody: newIssuingBody.trim() || 'Accredited Certification Body',
      validity: newValidity.trim() || 'Active',
      imageUrl: newUrl.trim(),
      isCustom: true,
    };

    setCertificates(prev => [newCert, ...prev]);
    setUploadModalOpen(false);

    // Reset form
    setNewTitle('');
    setNewStandard('ISO 9001:2015');
    setNewCertNumber('');
    setNewIssuingBody('');
    setNewUrl('');
    setPreviewSrc('');
  };

  const handleDeleteCertificate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOwner) return;
    if (confirm("Are you sure you want to delete this certificate?")) {
      setCertificates(prev => prev.filter(c => c.id !== id));
      if (selectedCert && selectedCert.id === id) {
        setSelectedCert(null);
      }
    }
  };

  const handleResetCertificates = () => {
    if (!isOwner) return;
    if (confirm("Reset ISO certificates to default documents?")) {
      setCertificates(DEFAULT_ISO_CERTIFICATES);
      localStorage.removeItem('nhe_iso_certificates');
    }
  };

  return (
    <section id="iso-certifications" className="py-24 bg-[#030305] border-t border-white/10 text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Quality Standards</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              ISO 9001:2015 & Accreditations.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal max-w-2xl leading-relaxed">
              Northern HeatEx Corporation operates with uncompromising commitment to global ISO quality management systems, rigorous traceability protocols, and international fabrication standards.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {isOwner ? (
              <>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload ISO Certificate</span>
                </button>
                <button
                  onClick={handleResetCertificates}
                  className="px-3.5 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white text-xs transition-colors cursor-pointer"
                  title="Reset to default certificates"
                >
                  Reset Defaults
                </button>
              </>
            ) : (
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 9001:2015 Accredited Quality System</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Feature Badges (ISO Accreditations) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="apple-card rounded-2xl p-5 border border-white/10">
            <div className="text-xs font-mono text-cyan-400 mb-1">QUALITY MANAGEMENT</div>
            <div className="text-base font-bold text-white">ISO 9001:2015</div>
            <div className="text-xs text-zinc-400 mt-1">Full design, manufacturing, and QA traceability.</div>
          </div>

          <div className="apple-card rounded-2xl p-5 border border-white/10">
            <div className="text-xs font-mono text-cyan-400 mb-1">ENVIRONMENTAL</div>
            <div className="text-base font-bold text-white">ISO 14001:2015</div>
            <div className="text-xs text-zinc-400 mt-1">Environmental management & sustainable operations.</div>
          </div>

          <div className="apple-card rounded-2xl p-5 border border-white/10">
            <div className="text-xs font-mono text-cyan-400 mb-1">HEALTH & SAFETY</div>
            <div className="text-base font-bold text-white">ISO 45001:2018</div>
            <div className="text-xs text-zinc-400 mt-1">Occupational health, safety, and workplace integrity.</div>
          </div>

          <div className="apple-card rounded-2xl p-5 border border-white/10">
            <div className="text-xs font-mono text-cyan-400 mb-1">TESTING INTEGRITY</div>
            <div className="text-base font-bold text-white">ISO 9712 NDT</div>
            <div className="text-xs text-zinc-400 mt-1">Ultrasonic, dye penetrant, and comprehensive inspection validation.</div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="apple-card rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer relative bg-[#09090D]"
            >
              <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden border-b border-white/10 flex items-center justify-center p-3">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-contain rounded-lg shadow-md group-hover:scale-102 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="p-2.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors shadow-lg"
                    title="Enlarge Certificate"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <a
                    href={cert.imageUrl}
                    download={`${cert.title.replace(/\s+/g, '_')}_Certificate.png`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-lg border border-white/20"
                    title="Download Certificate"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  {isOwner && (
                    <button
                      onClick={(e) => handleDeleteCertificate(cert.id, e)}
                      className="p-2.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition-colors shadow-lg"
                      title="Delete this certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 text-[10px] font-mono text-cyan-300">
                  {cert.standard}
                </div>

                {cert.isCustom && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-semibold">
                    Custom Upload
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {cert.title}
                </h3>
                {cert.issuingBody && (
                  <p className="text-[11px] text-zinc-400 line-clamp-1">
                    {cert.issuingBody}
                  </p>
                )}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{cert.certNumber || 'Accredited'}</span>
                  <span className="text-emerald-400">{cert.validity || 'Valid'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal (For Owner Only) */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <div className="bg-[#101014] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Upload ISO / Compliance Certificate</h3>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCertificate} className="space-y-4">
                
                {/* Live Preview */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium block">Certificate Preview:</label>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-white/10 flex items-center justify-center p-2">
                    {previewSrc ? (
                      <img src={previewSrc} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xs text-zinc-500">No certificate file selected</span>
                    )}
                  </div>
                </div>

                {/* Upload from Computer */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-300 font-medium block">
                    Choose Certificate Image File:
                  </label>
                  <div className="border border-dashed border-white/15 hover:border-white/30 rounded-2xl p-4 text-center cursor-pointer bg-zinc-900/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="iso-cert-file-picker"
                    />
                    <label htmlFor="iso-cert-file-picker" className="cursor-pointer block">
                      <Upload className="w-6 h-6 text-zinc-300 mx-auto mb-1.5" />
                      <span className="text-xs text-white font-medium block">
                        Select Certificate File (PNG, JPG, PDF-scan)
                      </span>
                      <span className="text-[11px] text-zinc-500 mt-0.5 block">
                        Supports high-resolution scans and verified seals
                      </span>
                    </label>
                  </div>
                </div>

                {/* Or URL */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium block">Or Certificate Image URL:</label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => {
                      setNewUrl(e.target.value);
                      setPreviewSrc(e.target.value);
                    }}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium block">Certificate Title:</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. ISO 9001:2015 Quality Management System"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                {/* Standard */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium block">Standard Code:</label>
                    <input
                      type="text"
                      value={newStandard}
                      onChange={(e) => setNewStandard(e.target.value)}
                      placeholder="e.g. ISO 9001:2015"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium block">Cert Number (Optional):</label>
                    <input
                      type="text"
                      value={newCertNumber}
                      onChange={(e) => setNewCertNumber(e.target.value)}
                      placeholder="e.g. NHE/QMS/2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                {/* Issuing Body */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium block">Issuing Authority / Body:</label>
                  <input
                    type="text"
                    value={newIssuingBody}
                    onChange={(e) => setNewIssuingBody(e.target.value)}
                    placeholder="e.g. TUV NORD / ASME Committee / Bureau Veritas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end space-x-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-md"
                  >
                    Add Certificate to Website
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* Certificate Fullscreen Viewer Lightbox */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <div className="relative bg-[#0F0F13] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
              
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-cyan-400 uppercase font-mono">
                    {selectedCert.standard}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {selectedCert.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={selectedCert.imageUrl}
                    download={`${selectedCert.title.replace(/\s+/g, '_')}_Certificate.png`}
                    className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Certificate</span>
                  </a>

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-full text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-black flex items-center justify-center p-4 min-h-[350px] max-h-[600px] overflow-auto">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="max-h-[560px] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
                <div>
                  <span>Authority: {selectedCert.issuingBody || 'Accredited Authority'}</span>
                  <span className="mx-2">•</span>
                  <span>Cert No: {selectedCert.certNumber || 'Active'}</span>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-200 text-xs hover:bg-zinc-700"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

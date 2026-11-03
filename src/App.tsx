import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EquipmentExplorer } from './components/EquipmentExplorer';
import { RefurbishmentProcess } from './components/RefurbishmentProcess';
import { BabbittBearingSection } from './components/BabbittBearingSection';
import { ManufacturingFacility } from './components/ManufacturingFacility';
import { ClientsShowcase } from './components/ClientsShowcase';
import { GallerySection } from './components/GallerySection';
import { InquiryPage } from './components/InquiryPage';
import { Footer } from './components/Footer';
import { AIBotModal } from './components/AIBotModal';
import { BrochureModal } from './components/BrochureModal';
import { Bot, PhoneCall } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [aiBotOpen, setAiBotOpen] = useState<boolean>(false);
  const [brochureOpen, setBrochureOpen] = useState<boolean>(false);
  const [selectedEquipmentForInquiry, setSelectedEquipmentForInquiry] = useState<string>('Shell & Tube Heat Exchanger');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEquipmentSelectedForInquiry = (equipmentName: string) => {
    setSelectedEquipmentForInquiry(equipmentName);
    scrollToSection('inquiry');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white/20 selection:text-white">
      
      {/* Apple-style Slim Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAiBot={() => setAiBotOpen(true)}
        openBrochure={() => setBrochureOpen(true)}
        openInquiry={() => scrollToSection('inquiry')}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          openInquiry={() => scrollToSection('inquiry')}
          openAiBot={() => setAiBotOpen(true)}
          openBrochure={() => setBrochureOpen(true)}
          scrollToSection={scrollToSection}
        />

        {/* Core Products Explorer */}
        <EquipmentExplorer
          onSelectForInquiry={handleEquipmentSelectedForInquiry}
          openBrochure={() => setBrochureOpen(true)}
        />

        {/* 10-Step Retubing & Refurbishment Protocol */}
        <RefurbishmentProcess
          onStartRetubingInquiry={() => handleEquipmentSelectedForInquiry('Turnkey 10-Step Retubing')}
          openBrochure={() => setBrochureOpen(true)}
        />

        {/* White Metal Bearing Re-Babbitting */}
        <BabbittBearingSection
          onStartBearingInquiry={() => handleEquipmentSelectedForInquiry('White Metal Bearing Re-Babbitting')}
          openBrochure={() => setBrochureOpen(true)}
        />

        {/* Manufacturing Facility (15,000 sq ft, 2500mm CNC, 100 bar hydro) */}
        <ManufacturingFacility
          openBrochure={() => setBrochureOpen(true)}
          openInquiry={() => scrollToSection('inquiry')}
        />

        {/* Valued Clients: NHPC, NPCIL, BBMB, UJVNL */}
        <ClientsShowcase
          openBrochure={() => setBrochureOpen(true)}
          openInquiry={() => scrollToSection('inquiry')}
        />

        {/* Media Gallery (Natural Photos, Shopfloor Records & User Upload) */}
        <GallerySection openBrochure={() => setBrochureOpen(true)} />

        {/* Formal RFQ & Engineering Proposal Portal */}
        <InquiryPage
          initialEquipment={selectedEquipmentForInquiry}
          onOpenAiBot={() => setAiBotOpen(true)}
        />
      </main>

      {/* Clean Apple Footer */}
      <Footer
        scrollToSection={scrollToSection}
        openAiBot={() => setAiBotOpen(true)}
        openBrochure={() => setBrochureOpen(true)}
        openInquiry={() => scrollToSection('inquiry')}
      />

      {/* AI Bot Conversational Sheet */}
      <AIBotModal
        isOpen={aiBotOpen}
        onClose={() => setAiBotOpen(false)}
        onOpenInquiry={() => scrollToSection('inquiry')}
      />

      {/* 12-Page Official Brochure Modal */}
      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />

      {/* Floating Action Pill (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2.5">
        <button
          onClick={() => setAiBotOpen(true)}
          className="px-4 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white text-xs font-medium border border-white/15 backdrop-blur-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
        >
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>AI Assistant</span>
        </button>

        <a
          href="https://wa.me/919760362826?text=Hello%20Northern%20HeatEx%20Corporation"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105 flex items-center justify-center cursor-pointer"
          title="Direct WhatsApp (+91-9760362826)"
        >
          <PhoneCall className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}

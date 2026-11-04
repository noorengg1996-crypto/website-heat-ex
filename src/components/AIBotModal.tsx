import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, RefreshCw, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (equipmentName?: string) => void;
}

export const AIBotModal: React.FC<AIBotModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      content: `Hello! I am the Northern HeatEx Technical Intelligence Assistant.\n\nI can assist you with:\n• Tube metallurgy recommendations (Titanium, Cupro-Nickel, SS 316L, Duplex)\n• Shell & tube dimensions (tube length, exchanger length, ID/OD, BWG gauge)\n• Submitting engineering drawings / CAD files for quotation\n• 10-step retubing process with 40–60% cost savings\n• Bearing re-babbitting (ASTM B23 Grade 2 white metal)\n• Official GSTIN & billing verification: 05AABFN3036G1ZQ\n\nHow can I help with your project today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What is the company GST Number?",
    "Calculate tube length & shell diameter (ID/OD)",
    "How to submit engineering drawing / CAD?",
    "Explain 10-step retubing procedure & savings",
    "Bearing re-babbitting clearances (ASTM B23)",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
          query: query.trim(),
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply || data.error || "Please contact our engineering team in Haridwar at +91-8532823883 for technical sizing.";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn("AI chat notice:", err?.message || err);
      
      // Smart instant fallback response
      let fallbackText = "Northern HeatEx Engineering Desk: Reach our engineering team directly at +91-8532823883 or info@northernheatex.co.in.";
      const q = query.toLowerCase();
      if (q.includes('gst')) {
        fallbackText = "Northern HeatEx Corporation Registered GST Number is: 05AABFN3036G1ZQ (Registered in Uttarakhand, India). Invoices and purchase orders are processed under this verified GSTIN.";
      } else if (q.includes('draw') || q.includes('cad') || q.includes('file')) {
        fallbackText = "You can upload your CAD (.dwg, .dxf), 3D model, or PDF technical drawing directly in our RFQ form below! You can also email files to info@northernheatex.co.in or WhatsApp them to +91-8532823883.";
      } else if (q.includes('length') || q.includes('dia') || q.includes('dimension') || q.includes('size')) {
        fallbackText = "For accurate thermal & mechanical sizing, provide:\n• Tube Length (mm or feet)\n• Total Exchanger Length (mm or feet)\n• Shell Diameter (specifying whether Inside Diameter ID or Outside Diameter OD)\n• Tube OD & Wall Gauge (BWG)\nYou can enter all of these directly in our Online Inquiry form!";
      } else if (q.includes('retub')) {
        fallbackText = "Our 10-step retubing program provides 40% to 60% cost savings compared to fabricating a new shell, with identical 100% hydro-testing and full material test certificates (MTC 3.1).";
      }

      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
      <div className="relative bg-[#111116] border border-white/10 rounded-3xl w-full max-w-xl h-[80vh] max-h-[640px] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Northern HeatEx Assistant</h3>
              <p className="text-[11px] text-zinc-400">Technical & Sizing Intelligence</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMessages([{
                id: 'reset',
                sender: 'bot',
                content: "How can I assist you with your heat exchanger or bearing inquiry today?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }])}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-medium'
                    : 'bg-zinc-900 border border-white/10 text-zinc-200'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-xs text-zinc-400 p-3 bg-zinc-900/60 rounded-xl border border-white/5 inline-flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="px-4 py-2 border-t border-white/5 bg-zinc-950/40 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-zinc-300 whitespace-nowrap cursor-pointer transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about equipment, metallurgy, or retubing..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30 placeholder:text-zinc-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-full bg-white text-black disabled:opacity-40 hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

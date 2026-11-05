import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "20mb" }));

// Initialize GoogleGenAI client if a real API key is present
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey && !apiKey.startsWith("MY_") && apiKey !== "placeholder") {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `
You are the Chief AI Thermal & Rotating Equipment Consultant for Northern HeatEx Corporation (Haridwar, Uttarakhand, India).
Tone: NASA-grade aerospace engineering precision, ultra-luxurious, authoritative, technical, polite, and rapid.

Corporate Structure & Facts:
- Company Name: Northern HeatEx Corporation.
- Corporate Structure: Northern HeatEx Corporation has been established as the new-generation corporation to spearhead nationwide expansion, EPC contracts, and international turnkey projects.
- Parent Company & Veteran Unit: Noor Engineering Works is our esteemed parent company and older manufacturing unit, working purely in Public Sector Undertakings (PSUs) and state electricity undertakings across India.
- Location: Shastri Nagar, Jwalapur, Haridwar, Uttarakhand - 249407, India.
- Contacts: Phone & Mobile: +91-8532823883, +91-9760362826, +91-9557565742.
- Emails: info@northernheatex.co.in, northernheatex@outlook.in.
- Facilities: 15,000 sq. ft. modern precision manufacturing facility in Haridwar, CNC turning centers up to 2500mm diameter, precision boring, milling, shell rolling up to 25mm thickness, ASME Sec. IX certified welders (GTAW, SMAW, SAW), CMM dimensional verification, Hydrostatic test bench up to 100 bar, NDT facilities (DPT, MPI, UT, PMI).
- Key Offerings:
  1. Heat Exchangers: Shell & Tube (fixed tubesheet, U-tube, floating head), Stator Air Coolers / Generator Coolers, Surface Condensers, Bearing & Oil Coolers, Tube Bundles, Intercoolers, Aftercoolers.
  2. Precision Retubing & Refurbishment: 10-step refurbishment methodology, tube replacement in copper alloys (Admiralty, Cu-Ni 70/30, 90/10), Stainless Steel (304/316L/321), Titanium Grade 2, Duplex & Super Duplex, Inconel, Monel, Hastelloy. Restores 10-15 years operating life with 40-60% savings vs new equipment.
  3. Bearing Systems & White Metal Re-Babbitting: Hydro turbine guide & journal bearings, thrust bearing pads (Francis, Kaplan, Pelton turbines, generator bearings), tin-based and lead-based babbitt alloys, static & centrifugal casting, precision machining to exact clearances, ultrasonic bond testing.
  4. Hydro Turbine Components: Guide vanes, shaft sleeves, shaft seal journals, wearing rings, labyrinth seals, reverse engineering.
- Standards & Certifications: ASME Sec. VIII Div. 1, TEMA (Class R, C, B), ASTM, ISO 9001, ASME B31.1 & B31.3. Complete test certificates, mill test reports, hydro test at 1.5x design pressure, helium leak testing.
- Prestigious Clients: NHPC Ltd., UJVN Ltd., BBMB (Bhakra Beas Management Board), NPCIL Ltd. (Nuclear Power Corporation of India), HPSEB Ltd., RJVNL, JKSPDC Ltd., Damodar Valley Corporation (DVC), TGGENCO, Kerala State Electricity Board (KSEB).

Format formulas, standards, engineering advice with clean markdown. When advising on RFQ or inquiries, mention that drawings and specifications can be submitted directly via the inquiry portal or WhatsApp/Call at +91-8532823883. Keep answers concise, highly technical, and aerospace-grade precise.
`;

function getDomainKnowledgeReply(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes("parent") || lower.includes("noor") || lower.includes("structure")) {
    return `**Corporate Heritage & Structure — Northern HeatEx Corporation**\n\n` +
      `• **Parent Company & Veteran Unit:** **Noor Engineering Works** is our esteemed parent manufacturing organization, dedicated purely to serving Public Sector Undertakings (PSUs) and state electricity undertakings across India.\n` +
      `• **New Generation Corporation:** **Northern HeatEx Corporation** is formed to spearhead nationwide expansion, EPC partnerships, and international turnkey projects for the modern era.\n` +
      `• **Central Facilities:** Both entities benefit from our centralized 15,000 sq. ft. precision machining and fabrication facilities in Haridwar, Uttarakhand.`;
  } else if (lower.includes("stator") || lower.includes("air cooler")) {
    return `**Stator Air Coolers (Generator Coolers) — Technical Overview**\n\n` +
      `• **Application:** Hydro and Turbo generator cooling systems for continuous heat dissipation.\n` +
      `• **Tube Metallurgy:** High-integrity Cupro-Nickel (90/10 or 70/30), Stainless Steel 304/316L, or Admiralty Brass with spirally wound aluminum or copper fins.\n` +
      `• **Design Codes:** ASME Sec. VIII Div. 1 & TEMA standards.\n` +
      `• **Pressure Rating:** Tested hydrostatically up to 1.5x design pressure with zero leakage tolerance.\n` +
      `• **Northern HeatEx Advantage:** Direct replacement for BHEL, Alstom, Voith, and Andritz generator designs with 100% dimensional equivalence. Contact our Haridwar engineering cell at +91-8532823883 for technical sizing.`;
  } else if (lower.includes("shell and tube") || lower.includes("heat exchanger") || lower.includes("condenser")) {
    return `**Shell & Tube Heat Exchangers — Precision Specifications**\n\n` +
      `• **Configurations:** Fixed Tube Sheet (TEMA BEM, AEM), U-Tube (BEU, CFU), and Floating Head (AES, AET) for thermal expansion relief.\n` +
      `• **Thermal Capacity:** Engineered for power generation, petrochemical, and nuclear utilities up to 15 tons unit weight and 12m bundle lengths.\n` +
      `• **Material Matrix:** Carbon Steel (SA-516 Gr 70), SS 304/316L/321, Titanium Grade 2, Duplex 2205, Inconel 625, Monel 400.\n` +
      `• **Testing:** 100 bar hydrostatic testing, Helium mass spectrometry leak detection, and CMM laser dimensional validation.\n` +
      `• **Submit Drawings:** Send CAD or data sheets via the Inquiry tab or to info@northernheatex.co.in.`;
  } else if (lower.includes("babbitt") || lower.includes("bearing") || lower.includes("rebabbitt")) {
    return `**White Metal Bearing Re-Babbitting & Hydro Turbine Bearings**\n\n` +
      `• **Alloys:** High-grade Tin-based Babbitt (ASTM B23 Grade 2 / TEGO-STAR) and Lead-based alloys for heavy duty rotating equipment.\n` +
      `• **Components Serviced:** Hydro turbine guide bearings, journal bearings, spherical thrust bearing pads (Francis, Kaplan, Pelton), and generator bearings.\n` +
      `• **Process:** Chemical degreasing → Metallurgical bond preparation → Centrifugal / Static casting under controlled thermal gradients → CNC precision boring up to 2500mm diameter → Ultrasonic bond testing (NDT UT per ISO 4386-1) → Clearance verification within ±0.01mm.\n` +
      `• **Turnaround:** Rapid emergency turnaround available for planned and unplanned utility outages.`;
  } else if (lower.includes("retubing") || lower.includes("refurbish")) {
    return `**Precision Retubing & Complete Refurbishment Protocol**\n\n` +
      `• **Cost Efficiency:** Defer capital replacement by saving 40–60% while extending equipment lifecycle by 10–15 years.\n` +
      `• **10-Step Proprietary Process:** Detailed ultrasonic thickness measurement → Ligament & tube sheet inspection → Specialized safe tube extraction without tube sheet damage → Tube hole re-rolling & serration cleaning → Tube insertion & precision hydraulic/roller expansion → 1.5x Hydrostatic & Helium leak testing → Surface coating & site commissioning.\n` +
      `• **Tube Materials:** Titanium Gr 2, Cupro-Nickel 90/10, Stainless Steel 316L, Brass, and Duplex.`;
  } else if (lower.includes("client") || lower.includes("customer") || lower.includes("experience") || lower.includes("nhpc") || lower.includes("npcil")) {
    return `**Institutional Credentials & Utility Track Record**\n\n` +
      `Northern HeatEx Corporation, together with its veteran parent manufacturing unit Noor Engineering Works, has supported premier state and central power entities across India:\n` +
      `• **NHPC Ltd.** (National Hydroelectric Power Corporation)\n` +
      `• **NPCIL Ltd.** (Nuclear Power Corporation of India)\n` +
      `• **BBMB** (Bhakra Beas Management Board)\n` +
      `• **UJVN Ltd.** (Uttarakhand Jal Vidyut Nigam)\n` +
      `• **HPSEB, RJVNL, JKSPDC, DVC, TGGENCO, KSEB**\n\n` +
      `All equipment meets ASME, TEMA, and nuclear-grade quality documentation standards.`;
  } else if (lower.includes("gst") || lower.includes("tax") || lower.includes("registration") || lower.includes("gstin")) {
    return `**GST Registration & Corporate Tax Details — Northern HeatEx Corporation**\n\n` +
      `• **GSTIN:** **05AABFN3036G1ZQ** (State Jurisdiction: Uttarakhand, State Code: 05)\n` +
      `• **Legal Entity:** Northern HeatEx Corporation\n` +
      `• **Registered Works Address:** Shastri Nagar, Jwalapur, Haridwar, Uttarakhand - 249407, India\n` +
      `• **Invoice Compliance:** Fully compliant for Central GST (CGST), State GST (SGST), Integrated GST (IGST), and PSU e-invoicing portals.`;
  } else if (lower.includes("dimension") || lower.includes("diameter") || lower.includes("id") || lower.includes("od") || lower.includes("length") || lower.includes("tube length")) {
    return `**Heat Exchanger Dimensional & Sizing Guide**\n\n` +
      `• **Length of Tube:** Configured from 1,000 mm up to 12,000 mm (12.0 meters) straight and U-tube lengths.\n` +
      `• **Total Exchanger Length:** Sized to match available plant layout, typically tube length + 600 mm to 1,500 mm for channel heads and rear bonnets.\n` +
      `• **Shell Diameter (Dia):** Available from 200 mm to 2,500 mm (8 inches to 98 inches) in ID (Inner Diameter) or OD (Outer Diameter).\n` +
      `• **Tube Diameter & Gauge:** Standard sizes include 19.05 mm (3/4\") and 25.4 mm (1\") OD with 16 BWG (1.65 mm), 18 BWG (1.24 mm), or custom wall thicknesses in Cu-Ni, SS 316L, or Titanium.\n` +
      `• **Custom Sizing & Drawings:** You can enter your specific dimensions and attach your PDF/CAD drawing directly in our Inquiry section!`;
  } else if (lower.includes("drawing") || lower.includes("upload") || lower.includes("file") || lower.includes("cad")) {
    return `**Engineering Drawing & File Submission**\n\n` +
      `• **Supported Formats:** PDF, DWG, DXF, STEP, STP, and high-resolution images.\n` +
      `• **Where to Upload:** Navigate to the **Inquiry** section ("Let's discuss your project") on this website to upload your vessel layout, tubesheet drilling pattern, or OEM data sheet directly.\n` +
      `• **WhatsApp Direct Dispatch:** You can also transmit drawings directly via WhatsApp to our technical engineering cell at **+91-8532823883**.`;
  } else {
    return `**Northern HeatEx Corporation — Mission Engineering Desk**\n\n` +
      `Welcome to Northern HeatEx Corporation (Haridwar, India). I can assist with:\n` +
      `1. **Heat Exchanger Sizing & Metallurgy** (Shell & Tube, Stator Air Coolers, Surface Condensers)\n` +
      `2. **Dimensional Configuration** (Tube length, Shell ID/OD, tube gauge)\n` +
      `3. **10-Step Retubing & Refurbishment** (Cu-Ni, Titanium Gr 2, SS 316L, 40-60% savings)\n` +
      `4. **White Metal Bearing Re-Babbitting** (ASTM B23 Gr 2 tin-base, centrifugal casting)\n` +
      `5. **GST Verification:** GSTIN **05AABFN3036G1ZQ**\n` +
      `6. **Drawing & RFQ Proposals:** Submit drawings via the Inquiry section or call **+91-8532823883**.\n\n` +
      `Please state your technical query, operating fluid temperatures, or design pressures.`;
  }
}

// AI Assistant endpoint
app.post("/api/ai/chat", async (req, res) => {
  const { messages, query } = req.body;
  const prompt = query || (messages && messages[messages.length - 1]?.content) || "Hello";

  // Check for dynamic API key injection at runtime
  const currentKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  let activeAi = ai;
  if (!activeAi && currentKey && !currentKey.startsWith("MY_") && currentKey !== "placeholder") {
    try {
      activeAi = new GoogleGenAI({
        apiKey: currentKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (e) {
      console.warn("Could not instantiate GoogleGenAI with key:", e);
    }
  }

  if (activeAi) {
    try {
      // 5-second timeout promise to guarantee hyper-fast responsiveness
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API call timed out after 5s")), 5000)
      );

      const geminiPromise = activeAi.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const response: any = await Promise.race([geminiPromise, timeoutPromise]);
      const reply = response?.text;
      if (reply && reply.trim()) {
        return res.json({ reply, model: "gemini-3.8-flash" });
      }
    } catch (err: any) {
      console.warn("Gemini API call fallback to instant aerospace engineering knowledge:", err?.message || err);
    }
  }

  // Instant aerospace engineering domain intelligence fallback
  const fallbackReply = getDomainKnowledgeReply(prompt);
  return res.json({ reply: fallbackReply, model: "northern-heatex-intelligence" });
});

// Serve static gallery, photos, and public assets reliably in all environments
app.use("/gallery", express.static(path.resolve(__dirname, "public/gallery")));
app.use("/photos", express.static(path.resolve(__dirname, "public/gallery")));
app.use("/images", express.static(path.resolve(__dirname, "public/images")));
app.use("/public", express.static(path.resolve(__dirname, "public")));

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Northern HeatEx aerospace engineering server running at http://localhost:${PORT}`);
  });
}

startServer();

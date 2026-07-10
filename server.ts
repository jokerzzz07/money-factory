import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with system telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Mock signal feed data with professional SMC rationales
const mockSignals = [
  {
    id: "sig-1",
    pair: "BTC/USD",
    type: "BUY",
    entry: "62,450.00",
    tp1: "63,200.00",
    tp2: "64,000.00",
    tp3: "65,500.00",
    sl: "61,850.00",
    time: "10 mins ago",
    status: "Active",
    confidence: "94.2%",
    rationale: "Price tapped into a 4H Bullish Order Block with clean Fair Value Gap (FVG) confluence. Market structure shift (MSS) confirmed on the 15m chart with liquidity sweep at 61,900.",
  },
  {
    id: "sig-2",
    pair: "XAU/USD (Gold)",
    type: "BUY",
    entry: "2,348.50",
    tp1: "2,360.00",
    tp2: "2,372.00",
    tp3: "2,390.00",
    sl: "2,339.00",
    time: "1 hour ago",
    status: "Active",
    confidence: "91.8%",
    rationale: "Daily premium discount array alignment. Cleared buy-side liquidity pools, tapping into a weekly demand zone with clean displacement upwards.",
  },
  {
    id: "sig-3",
    pair: "EUR/USD",
    type: "SELL",
    entry: "1.08450",
    tp1: "1.08150",
    tp2: "1.07800",
    tp3: "1.07300",
    sl: "1.08720",
    time: "3 hours ago",
    status: "Target 1 Hit",
    confidence: "92.5%",
    rationale: "Reversal from premium bearish breaker block. Cleared Asia session highs before high volume NY session open displacement downwards.",
  },
  {
    id: "sig-4",
    pair: "GBP/USD",
    type: "BUY",
    entry: "1.26800",
    tp1: "1.27300",
    tp2: "1.27800",
    tp3: "1.28500",
    sl: "1.26350",
    time: "5 hours ago",
    status: "Completed",
    confidence: "95.1%",
    rationale: "Tapped key discount institutional buying level. Cleared sell-side liquidity with a clean change of character (CHoCH) on high volume.",
  },
];

// Mock course curriculum
const mockCourses = [
  {
    id: "course-1",
    title: "Institutional Order Blocks & Liquidity",
    description: "Learn how central banks and commercial institutions accumulate and distribute volume. Master the mechanics of supply, demand, and liquidity engineering.",
    lessonsCount: 12,
    duration: "4.5 hours",
    difficulty: "Intermediate",
    progress: 75,
    modules: [
      "Defining institutional orders vs. retail patterns",
      "Identifying valid order blocks (OB) vs. fake zones",
      "Mitigation cycles and premium/discount pricing",
      "Liquidity sweeps: Engineering fake breakouts",
    ],
  },
  {
    id: "course-2",
    title: "Inefficiencies: Fair Value Gaps (FVG)",
    description: "Understand market imbalances and the delivery of price. Spot and trade price displacement, liquidity voids, and institutional delivery cycles.",
    lessonsCount: 8,
    duration: "3.2 hours",
    difficulty: "Beginner to Intermediate",
    progress: 40,
    modules: [
      "Introduction to one-sided market delivery",
      "Drawing and measuring Fair Value Gaps (FVG)",
      "Consequent encroachment: Key 50% equilibrium levels",
      "Combining FVGs with Order Blocks for high-probability setups",
    ],
  },
  {
    id: "course-3",
    title: "The SMC Masterclass & Execution Models",
    description: "Synthesize all Smart Money Concepts into a mechanical, high-probability execution model. Learn top-down analysis, market structure shifts, and risk parameters.",
    lessonsCount: 16,
    duration: "6.8 hours",
    difficulty: "Advanced",
    progress: 10,
    modules: [
      "Top-down analysis: Monthly down to 1-minute execution",
      "Confirming Market Structure Shifts (MSS) vs. sweeps",
      "Execution templates: Silver Bullet and OTE (Optimal Trade Entry)",
      "Institutional risk metrics: Maximizing R:R with 1% risk rules",
    ],
  },
];

// API: Signals endpoint
app.get("/api/signals", (req, res) => {
  res.json({ signals: mockSignals });
});

// API: Courses endpoint
app.get("/api/courses", (req, res) => {
  res.json({ courses: mockCourses });
});

// API: Institutional AI Coach Chat
app.post("/api/ai/coach", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Format chat history for Gemini
    const lastUserMessage = messages[messages.length - 1]?.content;
    if (!lastUserMessage) {
      return res.status(400).json({ error: "Last user message cannot be empty" });
    }

    // Construct the context containing the full history
    const systemInstruction = 
      "You are the Money Factory Institutional Trading Advisor, a world-class financial expert specializing in Smart Money Concepts (SMC), Order Blocks, Fair Value Gaps (FVG), Market Structure Shifts (MSS), Liquidity Pools, and high-probability risk management. You help retail traders learn institutional-grade strategies with extreme precision, clarity, and professionalism. Answer in elegant markdown formatting, using bullet points, bold key terms, and keep your explanations actionable and concise. Always emphasize risk management (e.g., maximum 1% risk per trade) and never promise guaranteed profits.";

    // Convert messages to history format
    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Start a chat session or perform generateContent with contents array
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...chatHistory.map(h => ({ role: h.role, parts: h.parts })),
        { role: "user", parts: [{ text: lastUserMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, I could not formulate a response. Please refine your trading concept query.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini AI Coach Error:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Money Factory Server running on http://localhost:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start Money Factory server:", err);
});

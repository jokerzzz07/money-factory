import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, BookOpen, User, HelpCircle, CheckCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AICoach() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Hello! I am your **Money Factory Institutional Trading Coach**.\n\nI specialize in **Smart Money Concepts (SMC)**, **Order Blocks (OB)**, **Fair Value Gaps (FVG)**, and algorithmic liquidity sweeps.\n\nHow can I help you master institutional price action or configure your risk parameters today?",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt chips for users
  const suggestedPrompts = [
    { text: "What is an Order Block (OB)? 🛡️", value: "What is an institutional Order Block (OB) and how do I spot a valid one?" },
    { text: "Explain Fair Value Gaps (FVG) 📈", value: "What is a Fair Value Gap (FVG) and what is the 'consequent encroachment' 50% level?" },
    { text: "Market Structure Shifts (MSS) 🔄", value: "How do I distinguish between a simple liquidity sweep and a true Market Structure Shift (MSS)?" },
    { text: "Create a 1% Risk Plan ⚖️", value: "Explain the institutional rule of risking exactly 1% per trade and how to calculate position size." },
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      // Package up historical context
      const payload = {
        messages: [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API responded with an error");
      const data = await res.json();

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "model",
        content: "🚨 **System Note:** I'm having difficulty reaching the algorithmic analytics servers right now. Please ensure your Gemini API secrets are correctly configured, or try asking your trading question again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  // Convert custom bold/bullet markdown into simple HTML elements safely
  const renderMessageContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Process simple bold headers **text**
      let processed = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      // Simple parse bullets
      const isBullet = line.startsWith("- ") || line.startsWith("* ");
      if (isBullet) {
        processed = processed.replace(/^[-*]\s+/, "");
      }

      // Format bold characters
      const parts = [];
      let lastIndex = 0;
      let match;
      while ((match = boldRegex.exec(processed)) !== null) {
        if (match.index > lastIndex) {
          parts.push(processed.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-white font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < processed.length) {
        parts.push(processed.substring(lastIndex));
      }

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-gray-300 leading-relaxed mb-1.5">
            {parts.length > 0 ? parts : processed}
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs leading-relaxed mb-2 last:mb-0">
          {parts.length > 0 ? parts : processed}
        </p>
      );
    });
  };

  return (
    <div id="ai-coach-section-wrapper" className="max-w-4xl mx-auto space-y-8 px-4">
      {/* Tab Header Description */}
      <div id="ai-coach-header" className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-none bg-navy-lighter px-4 py-1.5 text-[10px] font-bold text-primary-brand uppercase tracking-[0.2em] border border-primary-brand/10">
          <Sparkles className="h-3.5 w-3.5 text-primary-brand" /> Smart Assistant
        </span>
        <h2 className="text-3xl font-serif font-bold italic tracking-tight text-primary-brand">
          24/7 Algorithmic Trading Mentor
        </h2>
        <p className="text-xs text-primary-brand/60 uppercase tracking-wider leading-relaxed">
          Ask questions about liquidity sweep cycles, Premium vs. Discount pricing arrays, or order block validation criteria. Powered by fine-tuned financial models.
        </p>
      </div>

      {/* Main chat window container - styled with ambient twilight dark context */}
      <div id="chat-widget-box" className="rounded-none border border-primary-brand/15 bg-white shadow-none overflow-hidden flex flex-col h-[600px]">
        {/* Chat top header */}
        <div className="bg-[#1A1A1A] px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-none bg-white text-primary-brand shadow-none border border-white/10">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">SMC Institutional AI Mentor</h3>
              <p className="text-[9px] uppercase tracking-widest text-success-bright flex items-center gap-1 font-bold">
                <span className="h-1 w-1 rounded-none bg-success-bright animate-pulse" /> Online & Grounded
              </p>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-white/50 bg-white/5 px-2.5 py-1 rounded-none border border-white/5">
            Model: 3.5-Flash
          </span>
        </div>

        {/* Message feed stream */}
        <div className="flex-1 bg-navy-lighter/95 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isModel = msg.role === "model";
            return (
              <div
                key={msg.id}
                id={`chat-msg-${msg.id}`}
                className={`flex gap-3 max-w-[85%] ${isModel ? "mr-auto" : "ml-auto flex-row-reverse"}`}
              >
                {/* Avatar Icon */}
                <div className={`h-8 w-8 rounded-none flex items-center justify-center shrink-0 text-white ${
                  isModel ? "bg-[#1A1A1A] border border-white/10" : "bg-primary-brand"
                }`}>
                  {isModel ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-none text-xs leading-relaxed ${
                  isModel
                    ? "bg-[#1A1A1A] text-gray-200 border border-white/5 font-serif italic"
                    : "bg-[#EBE9E4] text-primary-brand border border-primary-brand/15 font-serif font-semibold"
                }`}>
                  {renderMessageContent(msg.content)}
                  <span className={`text-[9px] block text-right mt-1.5 ${
                    isModel ? "text-gray-500" : "text-primary-brand/40"
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing feedback */}
          {loading && (
            <div className="flex gap-3 max-w-[50%] mr-auto items-center">
              <div className="h-8 w-8 rounded-none bg-[#1A1A1A] text-white flex items-center justify-center">
                <Sparkles className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-[#1A1A1A] text-gray-400 p-4 rounded-none border border-white/5 text-[10px] uppercase tracking-wider flex items-center gap-1 font-mono">
                <span>Analyzing orderflow imbalances</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.2s]">.</span>
                <span className="animate-bounce [animation-delay:0.4s]">.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts array */}
        <div className="p-3 bg-white border-t border-b border-primary-brand/10 overflow-x-auto flex gap-2 whitespace-nowrap scrollbar-none">
          {suggestedPrompts.map((chip, cIdx) => (
            <button
              key={cIdx}
              id={`chat-chip-${cIdx}`}
              disabled={loading}
              onClick={() => handleSendMessage(chip.value)}
              className="px-3.5 py-2 text-[9px] font-bold uppercase tracking-wider bg-white border border-primary-brand/15 text-primary-brand rounded-none hover:bg-[#EBE9E4] transition shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {chip.text}
            </button>
          ))}
        </div>

        {/* Input box form */}
        <form onSubmit={handleFormSubmit} className="p-4 bg-white flex items-center gap-2 border-t border-primary-brand/10">
          <input
            id="chat-input-text-field"
            type="text"
            required
            disabled={loading}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask about Market Structure Shifts, Fair Value Gaps, or risk parameters..."
            className="flex-1 bg-navy-lighter rounded-none border border-primary-brand/15 px-4 py-3.5 text-xs text-primary-brand placeholder-primary-brand/30 focus:outline-none focus:border-primary-brand focus:bg-white transition"
          />
          <button
            id="chat-submit-message"
            type="submit"
            disabled={!userInput.trim() || loading}
            className="h-11 w-11 rounded-none bg-primary-brand text-white flex items-center justify-center transition hover:bg-[#1A1A1A] active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

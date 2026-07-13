import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Video, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  Activity, 
  TrendingUp, 
  Sparkles, 
  Smartphone, 
  Award, 
  Check, 
  ChevronRight, 
  TrendingDown, 
  DollarSign
} from "lucide-react";
import Header from "./components/Header";
import CoursesList from "./components/CoursesList";
import TradingChart from "./components/TradingChart";
import AICoach from "./components/AICoach";
import mentorPortrait from "../pic/vi.jpg";

function AnimatedStat({ value, suffix = "", prefix = "", decimals = 0 }: { value: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    let animationFrameId: number;

    const run = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(progress * value);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(run);
      }
    };
    animationFrameId = requestAnimationFrame(run);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return (
    <span>
      {prefix}
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hero image path generated from image_generator tool
  const heroImagePath = "/src/assets/images/professional_trader_1783620398111.jpg";

  // Navigation callbacks
  const handleStartLearning = () => setActiveTab("courses");
  const handleExploreCourses = () => setActiveTab("courses");

  return (
    <div id="app-root-container" className="flex flex-col min-h-screen overflow-x-hidden bg-white text-charcoal font-sans antialiased selection:bg-primary-blue/10 selection:text-primary-blue">
      {/* Header section */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content viewport */}
      <main id="app-main-content" className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 pb-8 sm:space-y-24 sm:pb-24"
            >
              {/* Hero Section - Premium Two-Column Layout */}
              <section
                id="hero-section"
                className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-3 sm:py-8 lg:pt-3 lg:pb-20 xl:pt-3 xl:pb-20"
              >
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563EB_1px,transparent_1px),linear-gradient(to_bottom,#2563EB_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]" />
                  <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="absolute right-8 top-20 h-48 w-48 rounded-full bg-emerald-500/8 blur-3xl" />
                  <div className="absolute bottom-10 left-10 h-44 w-44 rounded-full bg-indigo-500/8 blur-3xl" />
                  <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 600 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 320C110 290 150 240 210 220C270 200 320 180 380 140C430 110 470 70 560 60" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M40 340C110 315 150 270 220 250C290 230 330 210 390 190C455 168 500 140 560 90" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 6" />
                    <path d="M50 120H250" stroke="#0F172A" strokeOpacity="0.2" strokeWidth="1" />
                    <path d="M350 90H520" stroke="#0F172A" strokeOpacity="0.16" strokeWidth="1" />
                  </svg>

                  <motion.div
                    animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-[6%] top-[10%] rounded-2xl border border-slate-200/50 bg-white/70 p-3 shadow-[0_10px_30px_rgba(11,19,43,0.05)] backdrop-blur-md"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500">NIFTY 50</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-500">+2.45%</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[8%] top-[14%] rounded-2xl border border-slate-200/50 bg-white/70 p-3 shadow-[0_10px_30px_rgba(11,19,43,0.05)] backdrop-blur-md"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500">Profit Today</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">+₹12,540</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[18%] left-[12%] rounded-2xl border border-slate-200/50 bg-white/70 p-3 shadow-[0_10px_30px_rgba(11,19,43,0.05)] backdrop-blur-md"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500">Win Rate</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">87%</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 7, 0], x: [0, -5, 0] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[10%] right-[10%] rounded-2xl border border-slate-200/50 bg-white/70 p-3 shadow-[0_10px_30px_rgba(11,19,43,0.05)] backdrop-blur-md"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500">Buy Signal</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">Money Factory Indicator</p>
                  </motion.div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="hero-mobile-stack grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-[45%_55%] lg:gap-16">
                    
                    {/* Left Column - Elite FinTech Typography & CTA */}
                    <div id="hero-left-col" className="hero-mobile-content space-y-4 text-center sm:space-y-8 sm:text-left">
                      
                      {/* Large Premium Headline */}
                      <h1 className="mx-auto mb-2 max-w-[300px] text-[2.1rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-[#0B132B] sm:mx-0 sm:max-w-[430px] sm:text-[clamp(2.4rem,5vw,4.7rem)] lg:max-w-[560px] lg:text-[clamp(3rem,5.2vw,5.6rem)] xl:max-w-[620px] xl:text-[clamp(3.2rem,5.6vw,6.2rem)]">
                        <span className="block">Trade Smarter</span>
                        <span className="mt-1 block">With Premium</span>
                        <span className="mt-1 block bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">
                          Buy & Sell Signals
                        </span>
                      </h1>
 
                      {/* Description Subheadline with increased line-spacing */}
                      <p className="mx-auto mb-4 max-w-[90%] text-[15px] leading-5 font-medium text-slate-500 sm:mx-0 sm:max-w-xl sm:text-base sm:text-lg sm:leading-relaxed">
                        Master Forex trading with professional strategies, premium indicators, and real-time Buy & Sell Signals.
                      </p>


 
                      {/* Redesigned Minimal & Premium Feature Cards */}
                      <div id="hero-features-list" className="mx-auto mt-0 grid max-w-[94%] grid-cols-1 gap-2 pt-0 sm:mx-0 sm:max-w-xl sm:grid-cols-2 sm:gap-4 sm:pt-4">
                        {[
                          { title: "Forex Full Course", desc: "Basic to Advanced • 4 Entry Setups", icon: BookOpen },
                          { title: "Money Factory Indicator", desc: "Advanced Buy & Sell Signals", icon: Activity },
                          { title: "Daily Live Trades", desc: "Live Market Sessions on Telegram", icon: Video },
                          { title: "Trading Mentorship", desc: "1-on-1 Guidance & Strategy Support", icon: Users },
                          { title: "Mobile Learning App", desc: "Learn Anywhere • Real-Time Signals", icon: Smartphone }
                        ].map((feat, index) => {
                          const IconComponent = feat.icon;
                          return (
                            <motion.div 
                              key={index}
                              whileHover={{ y: -4, scale: 1.01 }}
                              className="flex items-start gap-2.5 rounded-[16px] border border-slate-100/80 bg-white/60 p-2.5 shadow-[0_6px_22px_-4px_rgba(11,19,43,0.08)] backdrop-blur-md transition-all duration-300 hover:border-slate-200/80 hover:shadow-[0_12px_24px_-4px_rgba(11,19,43,0.08)] cursor-default sm:gap-4 sm:rounded-2xl sm:p-4"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100/30 bg-gradient-to-br from-blue-50 to-indigo-50/50 text-primary-blue shrink-0 sm:h-10 sm:w-10">
                                <IconComponent className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <h4 className="text-[16px] font-bold leading-[1.2] tracking-tight text-[#0B132B] sm:text-xs sm:font-bold">{feat.title}</h4>
                                <p className="mt-1 text-[13px] font-medium leading-[1.4] text-slate-500/80 sm:text-[10px] sm:font-semibold">{feat.desc}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
 
                      {/* Download App badges row */}
                      <div id="hero-download-app-panel" className="mx-auto mt-4 max-w-lg space-y-3 border-t border-slate-100 pt-4 sm:mx-0 sm:mt-6 sm:space-y-4 sm:pt-6">
                        <h4 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                          Download the Money Factory App
                        </h4>
                        <div className="mobile-download-badges flex items-center gap-3 sm:gap-5">
                          <a
                            id="hero-app-store-badge"
                            href="https://apps.apple.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-download-badge flex min-h-[72px] w-full max-w-[230px] items-center gap-3 rounded-xl border border-white/5 bg-slate-900 px-5 py-3.5 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-md sm:min-h-[76px] sm:max-w-[240px]"
                          >
                            <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" fill="currentColor" aria-hidden="true">
                              <path d="M17.05 12.31c-.02-2.2 1.8-3.25 1.88-3.3-1.02-1.49-2.61-1.7-3.17-1.72-1.35-.14-2.64.79-3.33.79-.69 0-1.76-.77-2.89-.75-1.49.02-2.86.87-3.63 2.2-1.55 2.69-.4 6.67 1.11 8.86.74 1.07 1.62 2.28 2.77 2.24 1.11-.05 1.53-.72 2.87-.72 1.34 0 1.72.72 2.9.7 1.2-.02 1.96-1.08 2.69-2.16.84-1.24 1.19-2.44 1.21-2.5-.03-.01-2.32-.89-2.34-3.57ZM15.33 4.43c.57-.69.96-1.65.85-2.61-.82.03-1.81.55-2.4 1.24-.53.61-.99 1.58-.87 2.51.92.07 1.86-.46 2.42-1.14Z"/>
                            </svg>
                            <div className="text-left leading-tight">
                              <span className="badge-label block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">Download on the</span>
                              <span className="badge-text text-[18px] font-bold font-sans sm:text-[19px]">App Store</span>
                            </div>
                          </a>
                          <a
                            id="hero-google-play-badge"
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-download-badge flex min-h-[72px] w-full max-w-[230px] items-center gap-3 rounded-xl border border-white/5 bg-slate-900 px-5 py-3.5 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-md sm:min-h-[76px] sm:max-w-[240px]"
                          >
                            <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" aria-hidden="true">
                              <path fill="#FFC107" d="M3.6 2.2A1 1 0 0 0 3 3.1v17.8a1 1 0 0 0 1.6.9l9.6-8.9-9.6-8.9Z"/>
                              <path fill="#FF3D00" d="M15.2 12.5 13.4 10.7l-9.6 8.9a1 1 0 0 0 1.4.1l10.4-8.2Z"/>
                              <path fill="#4CAF50" d="m15.2 11.5 1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4-10.4 8.2 10.4 8.2 1.4-1.4a1 1 0 0 0 0-1.4Z"/>
                              <path fill="#1976D2" d="m15.2 12.5 10.4-8.2a1 1 0 0 0 0-1.4l-1.4-1.4-10.4 8.2 1.4 1.4Z"/>
                              <path fill="#FF3D00" d="m15.2 11.5 10.4 8.2a1 1 0 0 0 1.4-.1L21 18.2 15.2 11.5Z"/>
                            </svg>
                            <div className="text-left leading-tight">
                              <span className="badge-label block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">Get it on</span>
                              <span className="badge-text text-[18px] font-bold font-sans sm:text-[19px]">Google Play</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
 
                    {/* Right Column: Redesigned Premium Hero Composition */}
                    <div id="hero-right-col" className="hero-mobile-image relative mt-4 flex w-full min-h-[300px] items-center justify-center px-2 select-none sm:mt-6 sm:min-h-[520px] sm:px-0 lg:mt-0 lg:min-h-[720px]">
                      
                      {/* Soft Blue Ambient Lighting & Glows */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-blue-500/8 blur-[120px] -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
                      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-indigo-500/5 blur-[100px] -z-10 pointer-events-none" />
                      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-emerald-500/4 blur-[80px] -z-10 pointer-events-none" />

                      {/* Precise Fine-line Trading Grid Backdrop */}
                      <svg className="absolute inset-0 w-full h-full opacity-[0.06] -z-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="premium-fintech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0B132B" strokeWidth="0.75" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#premium-fintech-grid)" />
                      </svg>

                      {/* Dynamic Background Candlestick Graph & Trend Lines (Behind Mentor) */}
                      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
                        <svg className="w-full h-full max-w-[550px] max-h-[500px]" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Dotted target lines */}
                          <line x1="50" y1="120" x2="450" y2="120" stroke="#2563EB" strokeWidth="0.75" strokeDasharray="3 6" className="opacity-20" />
                          <line x1="50" y1="260" x2="450" y2="260" stroke="#10B981" strokeWidth="0.75" strokeDasharray="3 6" className="opacity-20" />
                          
                          {/* Smooth stock chart curve 1 (Emerald Trend) */}
                          <path
                            d="M 20 320 C 120 280, 160 380, 260 210 C 320 110, 380 180, 480 80"
                            stroke="url(#emerald-gradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-40"
                          />
                          {/* Smooth stock chart curve 2 (Royal Blue Trend) */}
                          <path
                            d="M 20 340 C 100 240, 180 320, 280 150 C 350 50, 410 120, 480 40"
                            stroke="url(#royal-blue-gradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="1 1"
                            className="opacity-30"
                          />

                          <defs>
                            <linearGradient id="emerald-gradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                            <linearGradient id="royal-blue-gradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#2563EB" />
                              <stop offset="100%" stopColor="#1D4ED8" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      {/* BACKDROP CARD 1: Portfolio Widget (Behind Mentor, slightly offset left) */}
                      <div className="absolute top-[8%] left-[2%] w-[140px] -rotate-2 rounded-2xl border border-slate-200/30 bg-white/40 p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-md select-none pointer-events-none sm:top-24 sm:left-[2%] sm:w-[200px] sm:p-3.5 max-[767px]:z-20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-bold text-slate-700 tracking-tight font-sans">PORTFOLIO INDEX</span>
                          <span className="text-[9px] font-bold text-emerald-500 font-mono">+28.4%</span>
                        </div>
                        <div className="h-[40px] flex items-end gap-1 px-1">
                          {[35, 45, 28, 60, 52, 70, 85, 95].map((val, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/30 to-blue-600/80 rounded-t-xs" style={{ height: `${val}%` }} />
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-100/40">
                          <span className="text-[7px] text-slate-400 font-mono">D_ANALYSIS // L_RECON</span>
                          <span className="text-[7px] font-bold text-slate-500 font-mono">$184,290</span>
                        </div>
                      </div>

                      {/* BACKDROP CARD 2: Buy / Sell Signal Matrix (Behind Mentor, offset right) */}
                      <div className="absolute bottom-[22%] right-[2%] w-[126px] rotate-3 rounded-2xl border border-white/5 bg-slate-950/80 p-2.5 shadow-2xl backdrop-blur-lg select-none pointer-events-none sm:bottom-28 sm:right-[4%] sm:w-[180px] sm:p-3.5 max-[767px]:z-20">
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5">
                          <span className="text-[8px] font-mono text-slate-400">LIQUIDITY MATRIX</span>
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[8px] font-mono">
                            <span className="text-white">EUR/USD BUY</span>
                            <span className="text-emerald-400 font-bold">+42 pips</span>
                          </div>
                          <div className="flex items-center justify-between text-[8px] font-mono">
                            <span className="text-slate-400">XAU/USD SELL</span>
                            <span className="text-rose-400 font-bold">Swept</span>
                          </div>
                          <div className="flex items-center justify-between text-[8px] font-mono">
                            <span className="text-white">GBP/JPY BUY</span>
                            <span className="text-emerald-400 font-bold">+108 pips</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Professional Portrait of the Founder / Trading Mentor (Up-scaled by ~25-30%) */}
                      <motion.div 
                        className="relative z-10 flex h-[340px] w-[260px] items-end justify-center overflow-hidden rounded-[28px] border border-slate-200/50 select-none shadow-[0_24px_50px_rgba(11,19,43,0.14)] sm:h-[430px] sm:w-[320px] lg:h-[630px] lg:w-[470px] lg:translate-y-14 lg:-mb-14 lg:rounded-[32px] xl:h-[670px] xl:w-[500px]"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {/* Cutout Photo styled with premium double shadow */}
                        <img
                          src={mentorPortrait}
                          alt="Alex Vance - Money Factory Founder & Chief Mentor"
                          className="h-full w-full rounded-[28px] border border-slate-200/50 object-contain object-center shadow-[0_24px_50px_rgba(11,19,43,0.14)] lg:rounded-[32px]"
                          referrerPolicy="no-referrer"
                        />
                        {/* Soft premium fade-out at the bottom to merge seamlessly with the page */}
                        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10 rounded-b-3xl" />
                        
                        {/* Absolute Overlay Team Badge inside the mentor frame */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-slate-200/40 shadow-xl flex items-center gap-3 z-20">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <div className="min-w-0">
                            <h4 className="text-xs font-black text-slate-800 leading-none">Alex Vance</h4>
                            <p className="text-[10px] text-slate-400 mt-1.5 font-bold leading-none tracking-wide">Founder & Chief Trading Officer</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* 5 Glassmorphism Floating Cards Around the Mentor with Premium visual parameters */}
                      
                      {/* Card 1: 📈 Live Market */}
                      <motion.div
                        className="hero-mobile-floating-card absolute top-[3%] left-[2%] z-30 flex items-center gap-2 rounded-2xl border border-slate-200/40 bg-white/85 p-2.5 shadow-[0_12px_30px_rgba(11,19,43,0.06)] backdrop-blur-md select-none cursor-default sm:top-[8%] sm:-left-[4%] sm:gap-3.5 sm:p-4 max-[767px]:w-[112px] max-[767px]:rounded-xl"
                        animate={{ y: isMobile ? [0, -4, 0] : [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: isMobile ? 8 : 6, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 sm:h-10 sm:w-10">
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <h4 className="text-[9px] font-black leading-none text-[#0B132B] sm:text-xs">Live Trade on Telegram</h4>
                          <p className="mt-1 text-[8px] font-bold text-slate-500 sm:text-[10px]">Daily Live Trading Signals</p>
                        </div>
                      </motion.div>

                      {/* Card 2: 📊 Premium Indicators */}
                      <motion.div
                        className="hero-mobile-floating-card absolute top-[16%] right-[2%] z-30 flex items-center gap-2 rounded-2xl border border-slate-200/40 bg-white/85 p-2.5 shadow-[0_12px_30px_rgba(11,19,43,0.06)] backdrop-blur-md select-none cursor-default sm:top-[22%] sm:-right-[4%] sm:gap-3.5 sm:p-4 max-[767px]:w-[120px] max-[767px]:rounded-xl"
                        animate={{ y: isMobile ? [0, -5, 0] : [0, -12, 0] }}
                        transition={{ repeat: Infinity, duration: isMobile ? 8.5 : 6.6, ease: "easeInOut", delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-primary-blue/10 text-primary-blue sm:h-10 sm:w-10">
                          <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <h4 className="text-[9px] font-black leading-none text-[#0B132B] sm:text-xs">Money Factory Indicator</h4>
                          <p className="mt-1 text-[8px] font-bold text-slate-500 sm:text-[10px]">Accurate Buy & Sell Signals</p>
                        </div>
                      </motion.div>

                      {/* Card 3: 🎓 Expert Mentorship */}
                      <motion.div
                        className="hero-mobile-floating-card absolute bottom-[24%] left-[2%] z-30 flex items-center gap-2 rounded-2xl border border-slate-200/40 bg-white/85 p-2.5 shadow-[0_12px_30px_rgba(11,19,43,0.06)] backdrop-blur-md select-none cursor-default sm:bottom-[30%] sm:-left-[8%] sm:gap-3.5 sm:p-4 max-[767px]:w-[128px] max-[767px]:rounded-xl"
                        animate={{ y: isMobile ? [0, -4, 0] : [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: isMobile ? 7.5 : 5.6, ease: "easeInOut", delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-600 sm:h-10 sm:w-10">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <h4 className="text-[9px] font-black leading-none text-[#0B132B] sm:text-xs">1200+ Profitable Students</h4>
                          <p className="mt-1 text-[8px] font-bold text-slate-500 sm:text-[10px]">Trusted by Successful Traders</p>
                        </div>
                      </motion.div>

                      {/* Card 4: 📱 Mobile Learning */}
                      <motion.div
                        className="hero-mobile-floating-card absolute bottom-[13%] right-[2%] z-30 flex items-center gap-2 rounded-2xl border border-slate-200/40 bg-white/85 p-2.5 shadow-[0_12px_30px_rgba(11,19,43,0.06)] backdrop-blur-md select-none cursor-default sm:bottom-[18%] sm:-right-[6%] sm:gap-3.5 sm:p-4 max-[767px]:w-[124px] max-[767px]:rounded-xl"
                        animate={{ y: isMobile ? [0, -4, 0] : [0, -11, 0] }}
                        transition={{ repeat: Infinity, duration: isMobile ? 8.2 : 7.2, ease: "easeInOut", delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 sm:h-10 sm:w-10">
                          <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <h4 className="text-[9px] font-black leading-none text-[#0B132B] sm:text-xs">Mobile Learning & Live Sessions</h4>
                          <p className="mt-1 text-[8px] font-bold text-slate-500 sm:text-[10px]">Learn Anywhere with Real-Time Updates</p>
                        </div>
                      </motion.div>

                      {/* Card 5: 💹 Trade Analytics */}
                      <motion.div
                        className="hero-mobile-floating-card absolute bottom-[1%] left-1/2 z-30 flex w-[138px] -translate-x-1/2 items-center gap-2 rounded-2xl border border-slate-200/40 bg-white/85 p-2.5 shadow-[0_12px_30px_rgba(11,19,43,0.06)] backdrop-blur-md select-none cursor-default sm:-bottom-[2%] sm:left-[10%] sm:w-auto sm:translate-x-0 sm:gap-3.5 sm:p-4 max-[767px]:rounded-xl"
                        animate={{ y: isMobile ? [0, -3, 0] : [0, -7, 0] }}
                        transition={{ repeat: Infinity, duration: isMobile ? 7.2 : 6.2, ease: "easeInOut", delay: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 sm:h-10 sm:w-10">
                          <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <h4 className="text-[9px] font-black leading-none text-[#0B132B] sm:text-xs">Vishal Abhang</h4>
                          <p className="mt-1 text-[8px] font-bold text-slate-500 sm:text-[10px]">Founder of Money Factory Indicator</p>
                        </div>
                      </motion.div>

                    </div>
 
                  </div>
 
                </div>
              </section>
 
              {/* Trust Section - Floating Statistics Cards with Soft Shadows & Live Counters */}
              <section id="trust-stats-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
                  
                  {/* Stat Card 1 */}
                  <motion.div 
                    id="stat-card-students"
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(11,19,43,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(11,19,43,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/5 text-primary-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                      <AnimatedStat value={3000} suffix="+" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                      ACTIVE STUDENTS
                    </span>
                  </motion.div>
 
                  {/* Stat Card 2 */}
                  <motion.div 
                    id="stat-card-profit"
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(11,19,43,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(11,19,43,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue/5 text-primary-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                      <AnimatedStat value={1200} suffix="+" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                      PROFITABLE TRADERS
                    </span>
                  </motion.div>
 
                  {/* Stat Card 3 */}
                  <motion.div 
                    id="stat-card-satisfaction"
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(11,19,43,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(11,19,43,0.08)] transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/5 text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-6 w-6 fill-amber-500 text-amber-500" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                      <AnimatedStat value={4.9} decimals={1} suffix="★" />
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                      STUDENT RATING
                    </span>
                  </motion.div>
 
                </div>
              </section>

              {/* Testimonials Section */}
              <section id="testimonials-section" className="w-full space-y-12">
                <div className="text-center space-y-3 px-4 sm:px-6 lg:px-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-blue/5 px-3.5 py-1.5 text-xs font-semibold text-primary-blue uppercase tracking-wider">
                    <Award className="h-3.5 w-3.5" /> Track Record
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-primary-brand">
                    What Our Funded Traders Say
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xl mx-auto">
                    Real retail traders who transitioned to institutional capital and automated mechanical strategies.
                  </p>
                </div>

                {/* Seamless Scrolling Marquee (Right to Left) */}
                <div className="relative w-full overflow-hidden">
                  {/* Left and Right Fade Gradients */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                  <div className="animate-marquee flex gap-6 py-6 px-4">
                    {[
                      {
                        id: "om",
                        name: "Om Raut",
                        role: "Student",
                        quote: "The course is very easy to understand. The live sessions and indicator helped me improve my trading.",
                        avatar: "https://picsum.photos/seed/james_wilson/150/150",
                        rating: 5,
                      },
                      {
                        id: "vishal",
                        name: "Vishal Phatangare",
                        role: "Student",
                        quote: "I learned Forex from basic to advanced. The mentors explain everything in a simple way.",
                        avatar: "https://picsum.photos/seed/sarah_jenkins/150/150",
                        rating: 5,
                      },
                      {
                        id: "prayag",
                        name: "Prayag Pawbake",
                        role: "Student",
                        quote: "The Money Factory Indicator gives clear buy and sell signals. It has helped me trade with more confidence.",
                        avatar: "https://picsum.photos/seed/marcus_thorne/150/150",
                        rating: 5,
                      },
                      {
                        id: "prajwal",
                        name: "Prajwal Rahane",
                        role: "Student",
                        quote: "The daily Telegram live trades are very helpful. I learn something new every day.",
                        avatar: "https://picsum.photos/seed/david_k/150/150",
                        rating: 5,
                      },
                      {
                        id: "ayush",
                        name: "Ayush Sangale",
                        role: "Student",
                        quote: "The mobile app makes learning easy. I can watch lessons, practice anytime, and review topics whenever I want.",
                        avatar: "https://picsum.photos/seed/elena_r/150/150",
                        rating: 5,
                      },
                      {
                        id: "sarthak",
                        name: "Sarthak Gadekar",
                        role: "Student",
                        quote: "I recommend Money Factory to anyone who wants to learn trading. The course is simple and very useful.",
                        avatar: "https://picsum.photos/seed/brandon_v/150/150",
                        rating: 5,
                      }
                    ].concat([
                      {
                        id: "om",
                        name: "Om Raut",
                        role: "Student",
                        quote: "The course is very easy to understand. The live sessions and indicator helped me improve my trading.",
                        avatar: "https://picsum.photos/seed/james_wilson/150/150",
                        rating: 5,
                      },
                      {
                        id: "vishal",
                        name: "Vishal Phatangare",
                        role: "Student",
                        quote: "I learned Forex from basic to advanced. The mentors explain everything in a simple way.",
                        avatar: "https://picsum.photos/seed/sarah_jenkins/150/150",
                        rating: 5,
                      },
                      {
                        id: "prayag",
                        name: "Prayag Pawbake",
                        role: "Student",
                        quote: "The Money Factory Indicator gives clear buy and sell signals. It has helped me trade with more confidence.",
                        avatar: "https://picsum.photos/seed/marcus_thorne/150/150",
                        rating: 5,
                      },
                      {
                        id: "prajwal",
                        name: "Prajwal Rahane",
                        role: "Student",
                        quote: "The daily Telegram live trades are very helpful. I learn something new every day.",
                        avatar: "https://picsum.photos/seed/david_k/150/150",
                        rating: 5,
                      },
                      {
                        id: "ayush",
                        name: "Ayush Sangale",
                        role: "Student",
                        quote: "The mobile app makes learning easy. I can watch lessons and practice anytime.",
                        avatar: "https://picsum.photos/seed/elena_r/150/150",
                        rating: 5,
                      },
                      {
                        id: "sarthak",
                        name: "Sarthak Gadekar",
                        role: "Student",
                        quote: "I recommend Money Factory to anyone who wants to learn trading. The course is simple and very useful.",
                        avatar: "https://picsum.photos/seed/brandon_v/150/150",
                        rating: 5,
                      }
                    ]).map((testimonial, index) => (
                      <div
                        key={`${testimonial.id}-${index}`}
                        id={`testimonial-card-${testimonial.id}-${index}`}
                        className="w-[300px] sm:w-[380px] shrink-0 rounded-2xl bg-white border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200 transition-all duration-300"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed font-normal">
                            "{testimonial.quote}"
                          </p>
                        </div>

                        <div className="mt-6 flex items-center gap-3 pt-6 border-t border-slate-100">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-blue/10"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800">{testimonial.name}</h4>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                              {testimonial.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div
              key="courses-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <CoursesList />
            </motion.div>
          )}

          {activeTab === "indicators" && (
            <motion.div
              key="indicators-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <TradingChart />
            </motion.div>
          )}

          {activeTab === "coach" && (
            <motion.div
              key="coach-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="py-12 sm:py-16"
            >
              <AICoach />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
